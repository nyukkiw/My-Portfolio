import { content } from "@/content";
import { RevealGroup, RevealItem } from "./Reveal";
import { Section } from "./Section";

export function Skills() {
  const { skills } = content;

  return (
    <Section id="skill" index="01" title={skills.title}>
      <RevealGroup className="grid list-none gap-10 md:grid-cols-2 xl:grid-cols-3">
        {skills.groups.map((group) => (
          <RevealItem key={group.name} className="border-t border-border pt-6">
            <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.08em]">
              {group.name}
            </h3>
            {group.items.length > 0 && (
              <ul className="mt-4 flex list-none flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-border px-3 py-1.5 font-mono text-sm"
                  >
                    {item}
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
        </ul>
      </div>
    </Section>
  );
}
