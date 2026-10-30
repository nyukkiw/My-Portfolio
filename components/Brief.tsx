import { content } from "@/content";
import { BriefBuilder } from "./BriefBuilder";
import { Section } from "./Section";

export function Brief() {
  const { brief } = content;

  return (
    <Section id="mulai" index="04" title={brief.title}>
      <p className="max-w-[52ch] text-lg text-muted-foreground">{brief.lead}</p>
      <div className="mt-10">
        <BriefBuilder brief={brief} />
      </div>
    </Section>
  );
}
