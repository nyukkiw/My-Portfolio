import { content } from "@/content";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { Section } from "./Section";

export function Experience() {
  const { experience } = content;

  return (
    <Section id="pengalaman" index="02" title={experience.title}>
      <p className="max-w-[52ch] text-lg text-muted-foreground">
        {experience.lead}
      </p>
      <div className="mt-12">
        <ExperienceTimeline
          items={experience.items}
          openLabel={experience.openLabel}
          closeLabel={experience.closeLabel}
        />
      </div>
    </Section>
  );
}
