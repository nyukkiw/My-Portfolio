// Teks situs (Bahasa Indonesia). Untuk menambah bahasa lain nanti: salin file ini
// (mis. en.ts), terjemahkan, lalu pilih di content/index.ts.
const tagline =
  "Freelance web & app developer. Dari landing page sampai sistem monitoring.";

export const id = {
  lang: "id",
  locale: "id_ID",
  skipLink: "Lewati ke konten",
  site: {
    name: "Nyu",
    wordmark: "nyu",
    title: "Nyu | Freelance Web & App Developer",
    description: tagline,
  },
  nav: {
    label: "Navigasi utama",
    links: [
      { href: "#proyek", label: "Proyek" },
      { href: "#skill", label: "Skill" },
      { href: "#kontak", label: "Kontak" },
    ],
  },
  hero: {
    title: "Nyu",
    lead: tagline,
    ctaProjects: "Lihat proyek",
    ctaContact: "Hubungi",
  },
  skills: {
    workLabel: "Bisa dikerjakan",
    work: [
      "Website profil & landing page",
      "Aplikasi web",
      "Sistem monitoring & dashboard",
    ],
  },
  footer: {
    brand: "NYU//DEV",
    year: "[Tahun]",
    handles: [
      { label: "@nyukkiw", href: "#" }, // placeholder: URL profil belum ada
      { label: "@appbuilder.nyu", href: "#" }, // placeholder: URL profil belum ada
    ],
  },
};
