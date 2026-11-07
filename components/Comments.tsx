import { getContent } from "@/content";
import { CommentBoard } from "./CommentBoard";
import { Section } from "./Section";

export async function Comments() {
  const { comments, lang } = await getContent();

  return (
    <Section id="komentar" index="07" title={comments.title}>
      <CommentBoard lang={lang} comments={comments} />
    </Section>
  );
}
