import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { content } from "@/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO(domain): saat domain sudah ada, tambahkan `metadataBase: new URL("https://<domain>")`
// di sini agar URL Open Graph/gambar preview menjadi absolut. Belum ada domain, jadi dikosongkan.
export const metadata: Metadata = {
  title: content.site.title,
  description: content.site.description,
  openGraph: {
    title: content.site.title,
    description: content.site.description,
    siteName: content.site.name,
    type: "website",
    locale: content.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: content.site.title,
    description: content.site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1224",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={content.lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#konten" className="skip-link">
          {content.skipLink}
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}


