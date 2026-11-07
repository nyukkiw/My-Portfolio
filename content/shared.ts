// Data yang sama di semua bahasa (alamat, tautan, lagu). Teks yang diterjemahkan ada di id.ts dan en.ts.

// Alamat email dipecah agar tidak muncul utuh di HTML (lebih sulit dipanen bot).
export const emailUser = "valentinobanyu0";
export const emailDomain = "gmail.com";
export const githubUrl = "https://github.com/nyukkiw";
export const instagramUrl = "https://www.instagram.com/appbuilder.nyu/";
export const linkedinUrl = "https://www.linkedin.com/in/valentino-banyu-756752311/";

// Musik latar (satu lagu). File ada di public/audio/. Set ke `null` untuk menyembunyikan pemutar.
// Tambahkan `artist` kalau lisensinya mewajibkan atribusi. Pastikan hak pakai di situs publik.
export type MusicTrack = { src: string; title: string; artist?: string };
export const musicTrack = {
  src: "/audio/A%20Business%20Day.mp3",
  title: "A Business Day",
} as MusicTrack | null;
