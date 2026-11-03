import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { getContent } from "@/content";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// "/" = Indonesia (lang kosong), "/en" = Inggris. Tambah bahasa lain di sini dan di content/index.ts.
export async function generateStaticParams() {
  return [{ lang: [] }, { lang: ["en"] }];
}

// Alamat produksi (EdgeOne Pages). Ubah di sini jika domain berganti; dipakai agar
// URL Open Graph/gambar preview menjadi absolut.
export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const canonical = content.lang === "en" ? "/en" : "/";

  return {
    metadataBase: new URL("https://portfolio-website-trfupfoq.edgeone.dev"),
    title: content.site.title,
    description: content.site.description,
    alternates: {
      canonical,
      languages: { id: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title: content.site.title,
      description: content.site.description,
      siteName: content.site.name,
      type: "website",
      locale: content.locale,
      url: canonical,
      // Gambar statis berekstensi .png agar hosting menyajikannya sebagai image/png.
      images: [
        {
          url: content.site.ogImage,
          width: 1200,
          height: 630,
          alt: content.site.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.site.title,
      description: content.site.description,
      images: [content.site.ogImage],
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a1224" },
    { media: "(prefers-color-scheme: light)", color: "#f5f8fd" },
  ],
  colorScheme: "dark light",
};

// Berjalan sinkron saat HTML di-parse (sebelum halaman tergambar) agar tidak ada kedip tema:
// pakai pilihan tersimpan, kalau tidak ada ikuti pengaturan perangkat. Nilai bawaan "dark".
const themeScript = `(function(){var t=null;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)})()`;

export default async function RootLayout({
  children,
}: LayoutProps<"/[[...lang]]">) {
  const content = await getContent();

  return (
    <html
      lang={content.lang}
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#konten" className="skip-link">
          {content.skipLink}
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
