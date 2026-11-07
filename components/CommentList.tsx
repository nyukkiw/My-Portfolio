import { connection } from "next/server";
import { getContent } from "@/content";
import type { PublicComment } from "@/lib/comments";
import { getSql } from "@/lib/db";

async function loadApproved(): Promise<PublicComment[] | null> {
  try {
    const rows = await getSql()`
      select id, name, message, created_at
      from comments
      where approved = true
      order by created_at desc
      limit 50`;
    return rows.map((row) => ({
      id: String(row.id),
      name: String(row.name),
      message: String(row.message),
      createdAt: new Date(row.created_at).toISOString(),
    }));
  } catch {
    // Database belum diatur atau sedang bermasalah: situs tetap berjalan.
    return null;
  }
}

export async function CommentList() {
  // Di luar try/catch: sesuai dokumen Next, jangan menangkap penanda request-time.
  await connection();
  const { comments, lang } = await getContent();
  const items = await loadApproved();
  const date = new Intl.DateTimeFormat(lang, {
    dateStyle: "medium",
    timeZone: "Asia/Jakarta",
  });

  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
        {comments.list.label}
        {items ? ` (${items.length})` : ""}
      </h3>
      {items === null ? (
        <p className="mt-4 text-muted-foreground">{comments.list.error}</p>
      ) : items.length === 0 ? (
        <p className="mt-4 text-muted-foreground">{comments.list.empty}</p>
      ) : (
        <ul className="mt-4 border-t border-border">
          {items.map((item) => (
            <li key={item.id} className="border-b border-border py-4">
              <div className="flex items-baseline justify-between gap-4">
                <span className="break-words font-semibold">
                  {item.name || comments.list.anonymous}
                </span>
                <time
                  dateTime={item.createdAt}
                  className="shrink-0 font-mono text-xs text-muted-foreground"
                >
                  {date.format(new Date(item.createdAt))}
                </time>
              </div>
              <p className="mt-1 whitespace-pre-line break-words text-muted-foreground">
                {item.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
