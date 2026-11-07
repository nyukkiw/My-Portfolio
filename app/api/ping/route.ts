import { connection } from "next/server";

// Tes sementara: memastikan server di EdgeOne bisa menjalankan kode saat ada permintaan.
// Dengan cacheComponents aktif, GET biasa akan di-prerender jadi file statis,
// jadi connection() dipakai agar route ini baru dijalankan saat diminta.
// Hapus file ini setelah tes selesai.
export async function GET() {
  await connection();
  return Response.json({ ok: true, time: new Date().toISOString() });
}
