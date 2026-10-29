// Teks situs (Bahasa Indonesia). Untuk menambah bahasa lain nanti: salin file ini
// (mis. en.ts), terjemahkan, lalu pilih di content/index.ts.
type SkillGroup = {
  name: string;
  items: string[];
  note?: string;
};

const skillGroups: SkillGroup[] = [
  { name: "Frontend", items: ["Next.js", "Tailwind"] },
  {
    name: "Backend",
    items: ["PHP (Laravel)", "JavaScript (Express)"],
    note: "Nyaman dengan database relasional (MySQL, PostgreSQL), NoSQL (MongoDB), dan membangun aplikasi mobile offline-first.",
  },
  { name: "Mobile Development", items: ["Kotlin"] },
  {
    name: "Fullstack",
    items: [],
    note: "Pengembangan aplikasi end-to-end, dari arsitektur client-server sampai desain database, dengan fokus pada performa dan optimasi alur komunikasi.",
  },
  {
    name: "AI assistant favorit",
    items: [
      "Claude Code",
      "ChatGPT",
      "GitHub Copilot",
      "DeepSeek",
      "Gemini",
      "Cursor",
      "AntiGravity",
    ],
  },
];

// Alamat email dipecah agar tidak muncul utuh di HTML (lebih sulit dipanen bot).
const emailUser = "valentinobanyu0";
const emailDomain = "gmail.com";
const githubUrl = "https://github.com/nyukkiw";
const instagramUrl = "https://www.instagram.com/appbuilder.nyu/";

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
      { href: "#skill", label: "Skill" },
      { href: "#sertifikat", label: "Sertifikat" },
      { href: "#kontak", label: "Kontak" },
    ],
  },
  hero: {
    title: "Nyu",
    lead: tagline,
    ctaCertificates: "Lihat sertifikat",
    ctaContact: "Hubungi",
  },
  certificates: {
    title: "Sertifikat",
    imageAltPrefix: "Sertifikat",
    openLabel: "Perbesar",
    closeLabel: "Close",
    // Gambar ada di public/certificates/. Urut dari terbaru.
    items: [
      {
        name: "Mengembangkan Sistem HRIS Seperti Talenta Menggunakan Laravel 12",
        issuer: "Codepolitan",
        date: "8 Januari 2026",
        image: "/certificates/laravel-hris.webp",
      },
      {
        name: "Belajar Next.js dengan Headless CMS",
        issuer: "Codepolitan",
        date: "9 September 2025",
        image: "/certificates/nextjs-headless-cms.webp",
      },
      {
        name: "Mengembangkan Sistem Streaming Seperti Netflix Menggunakan Laravel 11",
        issuer: "Codepolitan",
        date: "12 Agustus 2025",
        image: "/certificates/laravel-netflix.webp",
      },
      {
        name: "Belajar Menggunakan MongoDB di JavaScript",
        issuer: "Codepolitan",
        date: "11 Juli 2025",
        image: "/certificates/mongodb-javascript.webp",
      },
      {
        name: "Belajar Dasar Express.js",
        issuer: "Codepolitan",
        date: "5 Juli 2025",
        image: "/certificates/express.webp",
      },
      {
        name: "Belajar Pemrograman PHP",
        issuer: "Codepolitan",
        date: "6 Mei 2025",
        image: "/certificates/php.webp",
      },
    ],
  },
  skills: {
    title: "Skill",
    groups: skillGroups,
    workLabel: "Bisa dikerjakan",
    work: [
      "Website profil & landing page",
      "Aplikasi web",
      "Sistem monitoring & dashboard",
    ],
  },
  contact: {
    title: "Kontak",
    lead: "Punya ide website, aplikasi, atau sistem monitoring? Ceritakan kebutuhanmu lewat email atau media sosial di bawah ini.",
    email: {
      label: "Email",
      user: emailUser,
      domain: emailDomain,
      copyLabel: "Salin",
      copiedLabel: "Disalin",
      errorLabel: "Gagal menyalin",
      ariaLabel: "Salin alamat email",
    },
    channels: [
      { icon: "github", label: "GitHub", value: "@nyukkiw", href: githubUrl },
      {
        icon: "instagram",
        label: "Instagram",
        value: "@appbuilder.nyu",
        href: instagramUrl,
      },
    ] as const,
  },
  footer: {
    brand: "NYU//DEV",
    year: "2025",
    handles: [
      { label: "@nyukkiw", href: githubUrl },
      { label: "@appbuilder.nyu", href: instagramUrl },
    ],
  },
};
