import Image from "next/image";
import { content } from "@/content";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function About() {
  const { about } = content;

  return (
    <Section id="tentang" index="01" title={about.title}>
      <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
        <div className="space-y-6 text-lg">
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`max-w-[65ch] ${index === 0 ? "" : "text-muted-foreground"}`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="h-fit space-y-6">
          {/* Foto berwarna; untuk gaya abu-abu seperti kartu sertifikat, tambah `grayscale hover:grayscale-0` */}
          <div className="corners max-w-sm border border-border bg-card p-3">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
              <Image
                src={about.photo.src}
                alt={about.photo.alt}
                width={about.photo.width}
                height={about.photo.height}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 384px, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <dl className="divide-y divide-border border border-border">
            {about.facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="font-mono text-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}
