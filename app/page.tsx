import { Certificates } from "@/components/Certificates";
import { About } from "@/components/About";
import { Brief } from "@/components/Brief";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Header />
      <main id="konten" className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Certificates />
        <Brief />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
