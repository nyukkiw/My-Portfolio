import { getContent } from "@/content";
import { FaqAccordion } from "./FaqAccordion";
import { Section } from "./Section";

export async function Faq() {
  const { faq } = await getContent();

  return (
    <Section id="faq" index="06" title={faq.title}>
      <FaqAccordion items={faq.items} />
    </Section>
  );
}
