import { content } from "@/content";
import { RevealGroup, RevealItem } from "./Reveal";
import { Section } from "./Section";
import { TechIcon } from "./TechIcon";

export function Skills() {
  const { skills } = content;

  return (
    <Section id="skill" index="02" title={skills.title}>
      <RevealGroup className="grid list-none gap-10 md:grid-cols-2 xl:grid-cols-3">
        {skills.groups.map((group) => (
          <RevealItem
            key={group.name}
            className="group/skill border-t border-border pt-6"
          >
            <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.08em]">
              {group.name}
            </h3>
            {group.items.length > 0 && (
              <ul className="mt-4 flex list-none flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-sm"
                  >
                    {item.icon && (
                      <TechIcon
                        name={item.icon}
                        className="shrink-0 text-muted-foreground transition-colors duration-200 group-hover/skill:text-accent"
                      />
                    )}
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
            {group.note && (
              <p className="mt-4 max-w-[48ch] text-muted-foreground">
                {group.note}
              </p>
            )}
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-16">
        <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
          {skills.workLabel}
        </h3>
        <ul className="mt-4 flex list-none flex-wrap gap-3">
          {skills.work.map((work) => (
            <li
              key={work}
              className="border border-border px-4 py-2 font-mono text-sm"
            >
              {work}
            </li>
          ))}
          <li>
            <a
              href={skills.workOpen.href}
              className="inline-flex min-h-11 items-center border border-accent px-4 py-2 font-mono text-sm text-accent transition-colors duration-200 hover:bg-accent/10"
            >
              {skills.workOpen.label} &rarr;
            </a>
          </li>
        </ul>
      </div>
    </Section>
  );
}
