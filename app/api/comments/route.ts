import { connection } from "next/server";
import type { NextRequest } from "next/server";
import { MESSAGE_MAX, NAME_MAX, type PublicComment } from "@/lib/comments";
import { getSql, withRetry } from "@/lib/db";

const MAX_BODY = 4096;
const MAX_PER_IP = 3; // per 10 menit
const MAX_TOTAL = 20; // semua pengirim, per 10 menit

// Dibuang: karakter kontrol (kecuali baris baru dan tab), zero-width, penanda arah
// teks (bidi, dipakai untuk memalsukan tampilan), dan BOM.
const HIDDEN =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁠-⁤⁦-⁩﻿]/g;

// Untuk log server: nama, kode, dan pesan error (tanpa isi query).
function describe(error: unknown) {
  if (!(error instanceof Error)) return "unknown";
  const code = (error as { code?: string }).code;
  return `${error.name}${code ? ` ${code}` : ""}: ${error.message}`;
}

function fail(status: number, error: "invalid" | "rate" | "server") {
  return Response.json({ ok: false, error }, { status });
}

function clean(value: unknown) {
  if (typeof value !== "string") return "";
  return value
    .replace(HIDDEN, "")
    .replace(/\r\n?/g, "\n")
    .replace(/\n{3,}/g, "\n\n") // ringkas baris kosong beruntun
    .trim();
}

async function hashIp(ip: string, salt: string) {
  const data = new TextEncoder().encode(`${ip}:${salt}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}

// Daftar komentar diambil dari browser (bukan dari server saat render halaman),
// agar halaman tetap statis penuh. Hosting tidak melanjutkan bagian dinamis halaman.
export async function GET() {
  await connection();
  const headers = { "Cache-Control": "no-store" };
  try {
    const rows = await withRetry(
      (sql) => sql`
        select id, name, message, created_at
        from comments
        where approved = true
        order by created_at desc
        limit 50`,
    );
    const items: PublicComment[] = rows.map((row) => ({
      id: String(row.id),
      name: String(row.name),
      message: String(row.message),
      createdAt: new Date(row.created_at).toISOString(),
    }));
    return Response.json({ ok: true, items }, { headers });
  } catch (error) {
    console.error("comments GET gagal:", describe(error));
    return Response.json({ ok: false, error: "server" }, { status: 500, headers });
  }
}

export async function POST(request: NextRequest) {
  await connection();

  // Wajib JSON: kiriman lintas-situs dengan tipe lain tidak lolos.
  const type = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!type.startsWith("application/json")) return fail(415, "invalid");

  // Batas ukuran dihitung dari isi sebenarnya, bukan dari header yang bisa dipalsukan.
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return fail(400, "invalid");
  }
  if (raw.length > MAX_BODY) return fail(413, "invalid");

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      return fail(400, "invalid");
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return fail(400, "invalid");
  }

  // Jebakan bot: kolom ini tersembunyi untuk manusia. Bila terisi, pura-pura sukses.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = clean(body.name).replace(/\s+/g, " "); // nama satu baris
  const message = clean(body.message);
  const lang = body.lang === "en" ? "en" : body.lang === "id" ? "id" : null;

  if (
    !lang ||
    name.length > NAME_MAX ||
    message.length < 1 ||
    message.length > MESSAGE_MAX
  ) {
    return fail(400, "invalid");
  }

  try {
    const salt = process.env.COMMENT_SALT;
    if (!salt) throw new Error("COMMENT_SALT belum diatur");

    // IP asli tidak disimpan; hanya hash-nya, untuk membatasi kiriman berulang.
    const forwarded = request.headers
      .get("x-forwarded-for")
      ?.split(",")[0]
      ?.trim();
    const ip = forwarded || request.headers.get("x-real-ip") || "";
    const ipHash = ip ? await hashIp(ip, salt) : null;

    // Query hitung ini juga membangunkan database yang "tidur", jadi dibungkus retry.
    const [counts] = await withRetry(
      (sql) => sql`
        select
          count(*) filter (where ip_hash = ${ipHash}) as ip_count,
          count(*) filter (
            where ip_hash = ${ipHash} and created_at > now() - interval '30 seconds'
          ) as recent_count,
          count(*) filter (where message = ${message}) as dup_count,
          count(*) as total_count
        from comments
        where created_at > now() - interval '10 minutes'`,
    );

    if (
      Number(counts.ip_count) >= MAX_PER_IP || // terlalu banyak dari satu pengirim
      Number(counts.recent_count) >= 1 || // jeda minimum 30 detik
      Number(counts.dup_count) >= 1 || // pesan persis sama
      Number(counts.total_count) >= MAX_TOTAL
    ) {
      return fail(429, "rate");
    }

    // Insert tidak diulang otomatis, agar komentar tidak tersimpan ganda.
    await getSql()`
      insert into comments (name, message, lang, approved, ip_hash)
      values (${name}, ${message}, ${lang}, true, ${ipHash})`;

    return Response.json({ ok: true });
  } catch (error) {
    console.error("comments POST gagal:", describe(error));
    return fail(500, "server");
  }
}
