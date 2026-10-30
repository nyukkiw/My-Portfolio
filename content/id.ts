// Teks situs (Bahasa Indonesia). Untuk menambah bahasa lain nanti: salin file ini
// (mis. en.ts), terjemahkan, lalu pilih di content/index.ts.
// icon = kunci di components/techIcons.ts (opsional; tanpa icon = teks saja).
type SkillItem = { name: string; icon?: string };

type SkillGroup = {
  name: string;
  items: SkillItem[];
  note?: string;
};

const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    items: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Tailwind", icon: "tailwindcss" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "PHP (Laravel)", icon: "laravel" },
      { name: "JavaScript (Express)", icon: "express" },
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
    ],
    note: "Nyaman dengan database relasional (MySQL, PostgreSQL), NoSQL (MongoDB), dan membangun aplikasi mobile offline-first.",
  },
  {
    name: "Mobile Development",
    items: [{ name: "Kotlin", icon: "kotlin" }],
  },
  {
    name: "Fullstack",
    items: [],
    note: "Pengembangan aplikasi end-to-end, dari arsitektur client-server sampai desain database, dengan fokus pada performa dan optimasi alur komunikasi.",
  },
  {
    name: "AI assistant favorit",
    items: [
      { name: "Claude Code", icon: "claude" },
      { name: "ChatGPT" }, // logo OpenAI tidak ada di Simple Icons
      { name: "GitHub Copilot", icon: "githubcopilot" },
      { name: "DeepSeek", icon: "deepseek" },
      { name: "Gemini", icon: "googlegemini" },
      { name: "Cursor", icon: "cursor" },
      { name: "AntiGravity" },
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
    menuOpen: "Menu",
    menuClose: "Tutup",
    links: [
      { href: "#tentang", label: "Tentang" },
      { href: "#skill", label: "Skill" },
      { href: "#sertifikat", label: "Sertifikat" },
      { href: "#mulai", label: "Mulai" },
      { href: "#faq", label: "FAQ" },
      { href: "#kontak", label: "Kontak" },
    ],
  },
  hero: {
    title: "Nyu",
    lead: tagline,
    ctaCertificates: "Lihat sertifikat",
    ctaContact: "Hubungi",
    terminal: {
      title: "nyu@dev:~",
      ariaLabel: "Terminal interaktif",
      hint: "Pilih perintah:",
      // Perintah pertama (tampil awal). Satu elemen = satu baris di terminal.
      story: [
        "Halo, aku Nyu.",
        "Developer di Yogyakarta dengan latar belakang Informatika, membuat website dan aplikasi secara freelance sejak Oktober 2025.",
        "Dari landing page, sistem monitoring berbasis web, sampai aplikasi Android yang tetap jalan tanpa internet.",
        "Punya ide atau masalah yang ingin dibantu? Ceritakan dulu lewat email, nanti kita cari bentuk yang paling pas.",
      ],
      commands: {
        cerita: "cerita",
        layanan: "layanan",
        skill: "skill",
        sertifikat: "sertifikat",
        kontak: "kontak",
      },
      moreCertificates: "Lihat semua sertifikat",
      emailNote: "lihat bagian Kontak",
    },
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
  about: {
    title: "Tentang",
    paragraphs: [
      "Aku Nyu, developer di Yogyakarta berlatar belakang Informatika dari Universitas Sanata Dharma. Sejak Oktober 2025 aku mengerjakan proyek website dan aplikasi secara freelance, dari halaman profil sampai sistem monitoring berbasis web dengan PHP dan MySQL. Aku juga pernah membuat aplikasi Android yang berjalan sepenuhnya tanpa internet untuk pendataan komunitas di daerah dengan sinyal terbatas, jadi aku terbiasa merancang solusi yang menyesuaikan kondisi pemakainya. Di sela itu aku mengajar dasar Python untuk anak SMP, jadi aku terbiasa menjelaskan hal teknis dengan bahasa sederhana. Aku juga tertarik pada keamanan aplikasi dan kecerdasan buatan. Di luar layar, aku suka basket dan gym, sesekali main game, dan senang memotret.",
      "Kalau kamu punya kebutuhan website atau aplikasi, ceritakan masalahnya dulu lewat email. Kita bahas bersama bentuk yang paling masuk akal sebelum mulai membangun.",
    ],
    // Foto ada di public/nyu.webp (900x1125, rasio 4:5).
    photo: {
      src: "/nyu.webp",
      width: 900,
      height: 1125,
      alt: "Foto Nyu mengenakan kaus biru dan medali",
    },
    // Diambil langsung dari teks di atas.
    facts: [
      { label: "Lokasi", value: "Yogyakarta" },
      { label: "Pendidikan", value: "Informatika, Universitas Sanata Dharma" },
      { label: "Freelance", value: "sejak Oktober 2025" },
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
    // Ajakan untuk kebutuhan di luar daftar di atas.
    workOpen: { label: "Punya ide lain? Ayo diskusi", href: "#kontak" },
  },
  brief: {
    title: "Mulai proyek",
    lead: "Pilih beberapa hal di bawah, lalu salin ringkasannya dan tempel ke email. Tekan lagi pilihan yang aktif untuk membatalkannya. Tidak ada yang dikirim dari halaman ini.",
    type: {
      legend: "Jenis proyek",
      options: [
        {
          label: "Website profil & landing page",
          sentence: "Halo Nyu, saya ingin membuat website profil atau landing page.",
        },
        {
          label: "Aplikasi web",
          sentence: "Halo Nyu, saya ingin membuat aplikasi web.",
        },
        {
          label: "Sistem monitoring & dashboard",
          sentence: "Halo Nyu, saya ingin membuat sistem monitoring dan dashboard.",
        },
        {
          label: "Aplikasi Android",
          sentence: "Halo Nyu, saya ingin membuat aplikasi Android.",
        },
        {
          label: "Belum tahu, ingin diskusi dulu",
          sentence: "Halo Nyu, saya punya ide dan ingin berdiskusi dulu.",
        },
      ],
    },
    features: {
      legend: "Fitur yang dibutuhkan (boleh lebih dari satu)",
      prefix: "Fitur yang dibutuhkan",
      options: [
        "Halaman informasi/profil",
        "Form kontak atau pemesanan",
        "Login pengguna",
        "Dashboard atau laporan",
        "Bisa dipakai tanpa internet",
        "Terhubung dengan sistem lain",
        "Belum tahu",
      ],
    },
    time: {
      legend: "Target waktu",
      prefix: "Target waktu",
      options: ["Secepatnya", "Dalam 1 bulan", "2-3 bulan", "Fleksibel"],
    },
    notes: {
      label: "Catatan (opsional)",
      placeholder: "Ceritakan singkat masalah atau idemu",
      prefix: "Catatan",
    },
    result: {
      label: "Ringkasan brief",
      empty: "Pilih jenis proyek untuk melihat ringkasannya.",
      copy: "Salin brief",
      copied: "Disalin",
      error: "Gagal menyalin",
      reset: "Kosongkan",
      next: "Tempel ke email. Alamat email ada di bagian Kontak",
      nextHref: "#kontak",
    },
  },
  faq: {
    title: "Pertanyaan umum",
    items: [
      {
        question: "Bagaimana cara memulai proyek?",
        answer:
          "Kirim email berisi masalah atau kebutuhanmu, tidak perlu rapi. Aku balas dengan beberapa pertanyaan, lalu kita sepakati ruang lingkup, estimasi waktu, dan biaya secara tertulis sebelum aku mulai mengerjakan.",
      },
      {
        question: "Berapa lama pengerjaannya?",
        answer:
          "Tergantung ukuran dan kebutuhan. Website biasanya 3–14 hari, aplikasi 1–4 minggu. Waktu dihitung sejak kebutuhan jelas, DP diterima, dan bahan yang diperlukan sudah kamu kirim. Estimasi pastinya kusampaikan setelah kita membahas kebutuhanmu.",
      },
      {
        question: "Apakah ada revisi?",
        answer:
          "Ada 5 putaran revisi gratis. Satu putaran adalah satu kumpulan masukan yang dikirim sekaligus. Revisi berikutnya dikenakan Rp85.000 per putaran. Permintaan fitur baru di luar kesepakatan dibahas terpisah.",
      },
      {
        question: "Bagaimana pembayarannya?",
        answer:
          "Untuk website, DP 50% di awal dan pelunasan 50% sebelum serah terima. Untuk aplikasi, DP 40%, 30% saat versi pertama bisa dicoba, dan 30% sebelum serah terima. DP tidak dikembalikan bila pekerjaan sudah berjalan. Biaya domain dan hosting dirinci terpisah sesuai harga provider.",
      },
      {
        question: "Setelah selesai, apakah ada perawatan atau dukungan?",
        answer:
          "Ada. Perbaikan bug dari pekerjaanku gratis selama 1 bulan sejak serah terima. Setelah itu, kalau hosting dikelola olehku, perawatan bulanan (berbayar) berlaku sebagai bagian dari layanan, mencakup perbaikan bug, backup, pembaruan sistem dan keamanan, serta pemantauan berkala. Kalau hosting dan domain kamu kelola sendiri, perawatan bulanan bersifat pilihan. Besarnya biaya dibahas sesuai kebutuhan proyek. Biaya domain dan hosting terpisah, sesuai harga provider.",
      },
      {
        question: "Apa yang perlu saya siapkan (logo, teks, foto)?",
        answer:
          "Idealnya logo, teks, dan foto yang sudah kamu punya. Kalau belum ada, kita bahas dulu: aku bantu menyusun kerangka teks tanpa biaya tambahan, dan untuk logo atau foto kamu bisa pakai milikmu sendiri atau dibuatkan pihak lain. Konten yang belum siap tidak menghalangi kita memulai, tapi memengaruhi jadwal.",
      },
      {
        question: "Apakah bisa untuk bisnis kecil / UMKM / klinik?",
        answer:
          "Bisa untuk bisnis kecil dan UMKM, dari halaman profil usaha sampai sistem pencatatan sederhana. Untuk klinik atau layanan yang menyimpan data pribadi pasien, kebutuhannya lebih ketat (keamanan dan kerahasiaan data), jadi kita bahas dulu apa yang dibutuhkan sebelum aku memberi kepastian.",
      },
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
