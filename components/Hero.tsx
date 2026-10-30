import { content } from "@/content";
import { Button } from "./Button";
import { HeroTerminal, type TerminalCommand } from "./HeroTerminal";
import { Reveal } from "./Reveal";

export function Hero() {
  const { hero, skills, certificates, contact } = content;
  const t = hero.terminal;

  // Semua isi terminal berasal dari data situs yang sudah ada.
  const commands: TerminalCommand[] = [
    {
      name: t.commands.cerita,
      lines: t.story.map((value) => ({ value })),
    },
    {
      name: t.commands.layanan,
      lines: [
        ...skills.work.map((value) => ({ value })),
        {
          value: `${skills.workOpen.label} →`,
          href: skills.workOpen.href,
        },
      ],
    },
    {
      name: t.commands.skill,
      lines: skills.groups
        .filter((group) => group.items.length > 0)
        .map((group) => ({
          key: group.name,
          value: group.items.map((item) => item.name).join(", "),
        })),
    },
    {
      name: t.commands.sertifikat,
      lines: [
        ...certificates.items.map((cert) => ({
          key: cert.date,
          value: cert.name,
        })),
        { value: `${t.moreCertificates} →`, href: "#sertifikat" },
      ],
    },
    {
      name: t.commands.kontak,
      lines: [
        ...contact.channels.map((channel) => ({
          key: channel.label,
          value: channel.value,
          href: channel.href,
          external: true,
        })),
        {
          key: contact.email.label,
          value: `${t.emailNote} →`,
          href: "#kontak",
        },
      ],
    },
  ];

  return (
    <section
      id="beranda"
      aria-labelledby="beranda-judul"
      className="py-(--space-section) md:flex md:min-h-[80svh] md:items-center"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
        <Reveal className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
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
          </div>
          <HeroTerminal
            title={t.title}
            ariaLabel={t.ariaLabel}
            hint={t.hint}
            commands={commands}
          />
        </Reveal>
      </div>
    </section>
  );
}
