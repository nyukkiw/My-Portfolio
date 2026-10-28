import { ArrowUpRightIcon } from "./icons";
import { RevealGroup, RevealItem } from "./Reveal";
import { Section } from "./Section";

// Placeholder: ganti dengan data proyek asli.
const projects = [1, 2, 3].map((n) => ({
  id: n,
  name: "[Nama proyek]",
  description: "[Deskripsi proyek]",
  tags: ["[Teknologi]", "[Teknologi]"],
  href: "#", // [URL proyek]
}));

export function Projects() {
  return (
    <Section id="proyek" index="01" title="Proyek">
      <RevealGroup className="grid list-none gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <RevealItem key={project.id}>
            <a
              href={project.href}
              className="corners group block h-full border border-border bg-card p-6 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent"
            >
              {/* Placeholder gambar: abu-abu, berwarna saat hover/fokus. Ganti dengan next/image. */}
              <div className="relative aspect-[16/10] w-full bg-linear-to-br from-muted via-muted to-accent/40 grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0">
                <span className="absolute bottom-3 left-3 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  [Gambar proyek]
                </span>
              </div>
              <h3 className="mt-6 flex items-center justify-between gap-4 font-mono text-lg font-semibold">
                {project.name}
                <ArrowUpRightIcon className="shrink-0 text-accent" />
              </h3>
              <p className="mt-2 text-muted-foreground">{project.description}</p>
              <ul className="mt-4 flex list-none flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <li
                    key={i}
                    className="border border-border px-2 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </a>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
