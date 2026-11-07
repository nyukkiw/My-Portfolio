import { Suspense } from "react";
import { getContent } from "@/content";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { Section } from "./Section";

export async function Comments() {
  const { comments, lang } = await getContent();

  return (
    <Section id="komentar" index="07" title={comments.title}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="max-w-prose text-muted-foreground">{comments.intro}</p>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground">
            {comments.privacy}
          </p>
          <CommentForm lang={lang} form={comments.form} />
        </div>
        <Suspense
          fallback={
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
              {comments.list.loading}
            </p>
          }
        >
          <CommentList />
        </Suspense>
      </div>
    </Section>
  );
}
