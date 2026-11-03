// English text. Same shape as id.ts (type `Content`): a missing or extra key is a TypeScript error.
// Certificate titles stay as written on the certificates (official Codepolitan course names).
import type { Content } from "./id";
import {
  emailDomain,
  emailUser,
  githubUrl,
  instagramUrl,
  musicTrack,
} from "./shared";

const tagline =
  "Freelance web & app developer. From landing pages to monitoring systems.";

export const en: Content = {
  lang: "en",
  locale: "en_US",
  skipLink: "Skip to content",
  site: {
    name: "Nyu",
    wordmark: "nyu",
    title: "Nyu | Freelance Web & App Developer",
    description: tagline,
    ogImage: "/og-en.png",
  },
  language: {
    label: "Choose language",
    options: [
      { code: "id", short: "ID", name: "Bahasa Indonesia", href: "/" },
      { code: "en", short: "EN", name: "English", href: "/en" },
    ],
  },
  nav: {
    label: "Main navigation",
    homeLabel: "Nyu, back to top",
    menuOpen: "Menu",
    menuClose: "Close",
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    links: [
      { href: "#tentang", label: "About" },
      { href: "#pengalaman", label: "Experience" },
      { href: "#skill", label: "Skills" },
      { href: "#sertifikat", label: "Certificates" },
      { href: "#mulai", label: "Start" },
      { href: "#faq", label: "FAQ" },
      { href: "#kontak", label: "Contact" },
    ],
  },
  hero: {
    title: "Nyu",
    lead: tagline,
    ctaCertificates: "View certificates",
    ctaContact: "Get in touch",
    terminal: {
      title: "nyu@dev:~",
      ariaLabel: "Interactive terminal",
      hint: "Pick a command:",
      story: [
        "Hi, I'm Nyu.",
        "A developer in Yogyakarta with a background in Informatics, building websites and apps as a freelancer since 2025.",
        "From landing pages and web-based monitoring systems to Android apps that keep working without internet.",
        "Got an idea or a problem you want help with? Tell me about it by email first, and we'll find the shape that fits best.",
      ],
      commands: {
        cerita: "story",
        layanan: "services",
        skill: "skills",
        sertifikat: "certificates",
        kontak: "contact",
      },
      moreCertificates: "See all certificates",
      emailNote: "see the Contact section",
    },
  },
  certificates: {
    title: "Certificates",
    imageAltPrefix: "Certificate",
    openLabel: "Enlarge",
    closeLabel: "Close",
    items: [
      {
        name: "Mengembangkan Sistem HRIS Seperti Talenta Menggunakan Laravel 12",
        issuer: "Codepolitan",
        date: "8 January 2026",
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
        date: "12 August 2025",
        image: "/certificates/laravel-netflix.webp",
      },
      {
        name: "Belajar Menggunakan MongoDB di JavaScript",
        issuer: "Codepolitan",
        date: "11 July 2025",
        image: "/certificates/mongodb-javascript.webp",
      },
      {
        name: "Belajar Dasar Express.js",
        issuer: "Codepolitan",
        date: "5 July 2025",
        image: "/certificates/express.webp",
      },
      {
        name: "Belajar Pemrograman PHP",
        issuer: "Codepolitan",
        date: "6 May 2025",
        image: "/certificates/php.webp",
      },
    ],
  },
  about: {
    title: "About",
    paragraphs: [
      "I'm Nyu, a developer in Yogyakarta with a background in Informatics from Sanata Dharma University. Since 2025 I've been working on website and app projects as a freelancer, from profile pages to web-based monitoring systems built with PHP and MySQL. I've also built an Android app that runs entirely without internet for community data collection in areas with limited signal, so I'm used to designing solutions that fit the conditions of the people using them. On the side, I teach Python basics to junior high school students, so I'm used to explaining technical things in simple language. I'm also interested in application security and artificial intelligence. Outside the screen, I like basketball and the gym, play games now and then, and enjoy taking photos.",
      "If you have a website or app need, tell me about the problem by email first. We'll work out the most sensible shape together before I start building.",
    ],
    photo: {
      src: "/nyu.webp",
      width: 900,
      height: 1125,
      alt: "Photo of Nyu wearing a blue shirt and a medal",
    },
    facts: [
      { label: "Location", value: "Yogyakarta" },
      { label: "Education", value: "Informatics, Sanata Dharma University" },
      { label: "Freelance", value: "since 2025" },
    ],
  },
  experience: {
    title: "Experience",
    lead: "Experiences that shaped how I build web and apps.",
    openLabel: "Enlarge",
    closeLabel: "Close",
    items: [
      {
        title: "First client: a monitoring system, end to end",
        description:
          "My first client project. I worked on a monitoring system end to end, from start to finish.",
        tags: [
          { name: "PHP", icon: "php" },
          { name: "MySQL", icon: "mysql" },
        ],
        images: [
          {
            src: "/experience/sistem-monitoring-ui-ux.webp",
            width: 1160,
            height: 395,
            alt: "UI/UX design of a monitoring system in Figma",
          },
        ],
      },
      {
        title: "1st Place, Web Development, IT Days 2026",
        description:
          "Won 1st place in the Web Development category at IT Days 2026.",
        tags: [{ name: "Web Development" }],
        images: [
          {
            src: "/experience/it-days-2026.webp",
            width: 1600,
            height: 900,
            alt: "Three people holding the 1st Place Web Development board at IT Days 2026",
          },
        ],
      },
      {
        title: "KKN community service: an offline Android app and a seminar paper",
        description:
          "My KKN (community service program) project was building an offline Android app to record congregation members' data in an area with limited internet. At the end of the program, I wrote a paper on using Claude as a coding assistant to build apps like this, then took it to the USDB 2026 National Seminar.",
        tags: [
          { name: "Kotlin", icon: "kotlin" },
          { name: "Android Studio" },
          { name: "Claude", icon: "claude" },
        ],
        images: [
          {
            src: "/experience/android-data-umat.webp",
            width: 1200,
            height: 970,
            alt: "Layout code of the Android app Data Umat in Android Studio, with its design preview",
          },
          {
            src: "/experience/seminar-usdb-2026.webp",
            width: 848,
            height: 476,
            alt: "Seminar slide: background and context of research on using Claude AI in offline Android app development",
          },
        ],
      },
    ],
  },
  skills: {
    title: "Skills",
    groups: [
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
        note: "Comfortable with relational databases (MySQL, PostgreSQL), NoSQL (MongoDB), and building offline-first mobile apps.",
      },
      {
        name: "Mobile Development",
        items: [{ name: "Kotlin", icon: "kotlin" }],
      },
      {
        name: "Fullstack",
        items: [],
        note: "End-to-end app development, from client-server architecture to database design, with a focus on performance and communication flow optimization.",
      },
      {
        name: "Favorite AI assistants",
        items: [
          { name: "Claude Code", icon: "claude" },
          { name: "ChatGPT" },
          { name: "GitHub Copilot", icon: "githubcopilot" },
          { name: "DeepSeek", icon: "deepseek" },
          { name: "Gemini", icon: "googlegemini" },
          { name: "Cursor", icon: "cursor" },
          { name: "AntiGravity" },
        ],
      },
    ],
    workLabel: "What I can build",
    work: [
      "Profile websites & landing pages",
      "Web apps",
      "Monitoring systems & dashboards",
    ],
    workOpen: { label: "Have another idea? Let's talk", href: "#kontak" },
  },
  brief: {
    title: "Start a project",
    lead: "Pick a few things below, then copy the summary and paste it into an email. Press an active choice again to unselect it. Nothing is sent from this page.",
    type: {
      legend: "Project type",
      options: [
        {
          label: "Profile website & landing page",
          sentence: "Hi Nyu, I'd like to build a profile website or landing page.",
        },
        {
          label: "Web app",
          sentence: "Hi Nyu, I'd like to build a web app.",
        },
        {
          label: "Monitoring system & dashboard",
          sentence: "Hi Nyu, I'd like to build a monitoring system and dashboard.",
        },
        {
          label: "Android app",
          sentence: "Hi Nyu, I'd like to build an Android app.",
        },
        {
          label: "Not sure yet, let's talk first",
          sentence: "Hi Nyu, I have an idea and would like to talk first.",
        },
      ],
    },
    features: {
      legend: "Features needed (pick any)",
      prefix: "Features needed",
      options: [
        "Info/profile pages",
        "Contact or order form",
        "User login",
        "Dashboard or reports",
        "Works without internet",
        "Integration with other systems",
        "Not sure yet",
      ],
    },
    time: {
      legend: "Target timeline",
      prefix: "Target timeline",
      options: ["As soon as possible", "Within 1 month", "2-3 months", "Flexible"],
    },
    notes: {
      label: "Notes (optional)",
      placeholder: "Briefly describe the problem or idea",
      prefix: "Notes",
    },
    result: {
      label: "Brief summary",
      empty: "Pick a project type to see the summary.",
      copy: "Copy brief",
      copied: "Copied",
      error: "Copy failed",
      reset: "Clear",
      next: "Paste it into an email. The email address is in the Contact section",
      nextHref: "#kontak",
    },
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "How do I start a project?",
        answer:
          "Email me your problem or need, it doesn't have to be tidy. I'll reply with a few questions, then we agree in writing on the scope, time estimate, and cost before I start working.",
      },
      {
        question: "How long does it take?",
        answer:
          "It depends on size and requirements. Websites usually take 3–14 days, apps 1–4 weeks. The clock starts once the requirements are clear, the down payment is received, and you've sent the materials needed. I'll give you an exact estimate after we discuss your needs.",
      },
      {
        question: "Are revisions included?",
        answer:
          "There are 5 free revision rounds. One round is one batch of feedback sent at once. Additional revisions are charged at Rp85,000 per round. Requests for new features beyond the agreement are discussed separately.",
      },
      {
        question: "How does payment work?",
        answer:
          "For websites, a 50% down payment up front and 50% before handover. For apps, a 40% down payment, 30% when the first version can be tried, and 30% before handover. The down payment is non-refundable once work has started. Domain and hosting costs are itemized separately at the provider's price.",
      },
      {
        question: "Is there maintenance or support after delivery?",
        answer:
          "Yes. Bug fixes for my own work are free for 1 month after handover. After that, if I manage the hosting, paid monthly maintenance applies as part of the service, covering bug fixes, backups, system and security updates, and regular monitoring. If you manage the hosting and domain yourself, monthly maintenance is optional. The fee is discussed based on the project's needs. Domain and hosting costs are separate, at the provider's price.",
      },
      {
        question: "What do I need to prepare (logo, text, photos)?",
        answer:
          "Ideally the logo, text, and photos you already have. If you don't have them yet, we'll talk it through first: I'll help draft a text outline at no extra cost, and for the logo or photos you can use your own or have someone else make them. Content that isn't ready doesn't stop us from starting, but it affects the schedule.",
      },
      {
        question: "Can you work with small businesses / SMEs / clinics?",
        answer:
          "Yes for small businesses and SMEs, from a business profile page to a simple record-keeping system. For clinics or services that store patients' personal data, the requirements are stricter (data security and confidentiality), so we'll first discuss what is needed before I give you a firm answer.",
      },
    ],
  },
  contact: {
    title: "Contact",
    lead: "Have an idea for a website, app, or monitoring system? Tell me what you need by email or on social media below.",
    email: {
      label: "Email",
      user: emailUser,
      domain: emailDomain,
      copyLabel: "Copy",
      copiedLabel: "Copied",
      errorLabel: "Copy failed",
      ariaLabel: "Copy email address",
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
  music: {
    label: "Background music",
    error: "Playback failed",
    track: musicTrack,
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
