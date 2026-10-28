import { content } from "@/content";
import { RevealGroup, RevealItem } from "./Reveal";
import { Section } from "./Section";

// Placeholder: ganti dengan kelompok skill asli.
const groups = [1, 2, 3].map((n) => ({
  id: n,
  name: "[Kelompok skill]",
  items: ["[Skill]", "[Skill]", "[Skill]"],
}));

export function Skills() {
  return (
    <Section id="skill" index="02" title="Skill">
      <RevealGroup className="grid list-none gap-10 md:grid-cols-3">
        {groups.map((group) => (
          <RevealItem key={group.id} className="border-t border-border pt-6">
            <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.08em]">
              {group.name}
            </h3>
            <ul className="mt-4 list-none space-y-2 text-muted-foreground">
              {group.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden="true" className="font-mono text-accent">
                    &mdash;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-16">
        <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
          {content.skills.workLabel}
        </h3>
        <ul className="mt-4 flex list-none flex-wrap gap-3">
          {content.skills.work.map((work) => (
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
