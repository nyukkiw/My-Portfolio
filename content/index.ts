import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { en } from "./en";
import type { Content } from "./id";
import { id } from "./id";

// Bahasa ditentukan dari alamat: "/" = Indonesia, "/en" = Inggris (segmen [[...lang]] di app/).
// `lang()` dari next/root-params bisa dipanggil di Server Component mana pun tanpa oper props.
// Menambah bahasa: buat <kode>.ts berbentuk `Content`, daftarkan di sini, dan tambah di
// generateStaticParams (app/[[...lang]]/layout.tsx) serta `language.options` di id.ts/en.ts.
const dictionaries: Record<string, Content> = { en };

export async function getLocale(): Promise<string> {
  const segments = await lang();
  if (!segments || segments.length === 0) return "id";
  if (segments.length === 1 && segments[0] in dictionaries) return segments[0];
  notFound();
}

export async function getContent(): Promise<Content> {
  const locale = await getLocale();
  return locale === "id" ? id : dictionaries[locale];
}
