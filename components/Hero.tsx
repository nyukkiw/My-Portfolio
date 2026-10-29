import { content } from "@/content";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

export function Hero() {
  const { hero } = content;

  return (
    <section
      id="beranda"
      aria-labelledby="beranda-judul"
      className="py-(--space-section) md:flex md:min-h-[80svh] md:items-center"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
        <Reveal>
          <h1
            id="beranda-judul"
            className="glow text-[clamp(3rem,8vw,6rem)] font-semibold leading-none"
          >
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[40ch] text-xl text-muted-foreground md:text-2xl">
            {hero.lead}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#sertifikat">{hero.ctaCertificates}</Button>
            <Button href="#kontak" variant="secondary">
              {hero.ctaContact}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
