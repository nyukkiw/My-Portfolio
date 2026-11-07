import { neon } from "@neondatabase/serverless";

// Dibuat di dalam fungsi (bukan global) dan hanya dipakai di server.
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL belum diatur");
  return neon(url);
}

// Neon gratis "tidur" saat sepi; permintaan pertama sesudahnya kadang gagal. Ulangi sebentar.
// Hanya untuk query yang aman diulang (membaca/menghitung), bukan untuk insert.
export async function withRetry<T>(
  run: (sql: ReturnType<typeof getSql>) => Promise<T>,
  attempts = 3,
): Promise<T> {
  let last: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await run(getSql());
    } catch (error) {
      last = error;
      if (i < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500 * (i + 1)));
      }
    }
  }
  throw last;
}
