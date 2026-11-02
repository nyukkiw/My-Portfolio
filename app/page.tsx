import { Certificates } from "@/components/Certificates";
import { About } from "@/components/About";
import { Brief } from "@/components/Brief";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Skills } from "@/components/Skills";
import { content } from "@/content";

export default function Home() {
  return (
    <>
      <Header />
      <main id="konten" className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Certificates />
        <Brief />
        <Faq />
        <Contact />
      </main>
      <Footer />
      {content.music.track && (
        <MusicPlayer
          track={content.music.track}
          label={content.music.label}
          error={content.music.error}
        />
      )}
    </>
  );
}

