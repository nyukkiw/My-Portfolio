import { Button } from "./Button";
import { ChatIcon, CodeIcon, MailIcon } from "./icons";
import { RevealGroup, RevealItem } from "./Reveal";
import { Section } from "./Section";

// Placeholder: ganti href dan nilai dengan kontak asli.
const channels = [
  { label: "Email", value: "[Email]", href: "#", Icon: MailIcon },
  { label: "WhatsApp", value: "[WhatsApp]", href: "#", Icon: ChatIcon },
  { label: "GitHub", value: "[GitHub]", href: "#", Icon: CodeIcon },
];

export function Contact() {
  return (
    <Section id="kontak" index="03" title="Kontak">
      <p className="max-w-[52ch] text-lg text-muted-foreground">
        [Ajakan singkat]
      </p>
      <RevealGroup className="mt-10 grid max-w-xl list-none gap-3">
        {channels.map(({ label, value, href, Icon }) => (
          <RevealItem key={label}>
            <a
              href={href}
              className="group flex min-h-11 items-center gap-4 border border-border-control px-4 py-3 transition-colors duration-200 hover:border-accent"
            >
              <Icon className="shrink-0 text-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                {label}
              </span>
              <span className="ml-auto font-mono text-sm">{value}</span>
            </a>
          </RevealItem>
        ))}
      </RevealGroup>
      <div className="mt-10">
        <Button href="#">Kirim email</Button>
      </div>
    </Section>
  );
}
