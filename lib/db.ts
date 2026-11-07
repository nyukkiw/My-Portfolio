import { neon } from "@neondatabase/serverless";

// Dibuat di dalam fungsi (bukan global) dan hanya dipakai di server.
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL belum diatur");
  return neon(url);
}
