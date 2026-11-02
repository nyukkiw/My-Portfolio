import { content } from "@/content";
import { FaqAccordion } from "./FaqAccordion";
import { Section } from "./Section";

export function Faq() {
  const { faq } = content;

  return (
    <Section id="faq" index="06" title={faq.title}>
      <FaqAccordion items={faq.items} />
    </Section>
  );
}
