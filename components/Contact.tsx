import { content } from "@/content";
import { CopyEmail } from "./CopyEmail";
import { CodeIcon, InstagramIcon } from "./icons";
import { RevealGroup, RevealItem } from "./Reveal";
import { Section } from "./Section";

const icons = {
  github: CodeIcon,
  instagram: InstagramIcon,
};

export function Contact() {
  const { contact } = content;

  return (
    <Section id="kontak" index="03" title={contact.title}>
      <p className="max-w-[52ch] text-lg text-muted-foreground">
        {contact.lead}
      </p>
      <RevealGroup className="mt-10 grid max-w-xl list-none gap-3">
        <RevealItem>
          <CopyEmail email={contact.email} />
        </RevealItem>
        {contact.channels.map(({ icon, label, value, href }) => {
          const Icon = icons[icon];
          return (
            <RevealItem key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-11 flex-wrap items-center gap-x-4 gap-y-1 border border-border-control px-4 py-3 transition-colors duration-200 hover:border-accent"
              >
                <Icon className="shrink-0 text-accent" />
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  {label}
                </span>
                <span className="min-w-0 break-all font-mono text-sm sm:ml-auto">
                  {value}
                </span>
              </a>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
