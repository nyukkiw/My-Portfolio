"use client";

import { useEffect, useMemo, useState } from "react";
import type { Content } from "@/content/id";
import type { PublicComment } from "@/lib/comments";
import { CommentForm } from "./CommentForm";

type Board =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; items: PublicComment[] };

// Mengembalikan daftar komentar, atau null bila gagal dimuat.
async function fetchComments(): Promise<PublicComment[] | null> {
  try {
    const res = await fetch("/api/comments", { cache: "no-store" });
    if (!res.ok) return null;
    const data: { items?: PublicComment[] } = await res.json();
    return data.items ?? [];
  } catch {
    return null;
  }
}

// Daftar diambil dari browser lewat GET /api/comments agar halaman tetap statis penuh.
export function CommentBoard({
  lang,
  comments,
}: {
  lang: string;
  comments: Content["comments"];
}) {
  const [board, setBoard] = useState<Board>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    void fetchComments().then((items) => {
      if (cancelled) return;
      setBoard(items ? { status: "ready", items } : { status: "error" });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Dipanggil setelah komentar terkirim. Bila gagal, daftar yang sudah tampil dibiarkan.
  async function reload() {
    const items = await fetchComments();
    if (items) setBoard({ status: "ready", items });
  }

  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(lang, {
        dateStyle: "medium",
        timeZone: "Asia/Jakarta",
      }),
    [lang],
  );

  const noteClass = "mt-4 text-muted-foreground";

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="max-w-prose text-muted-foreground">{comments.intro}</p>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          {comments.privacy}
        </p>
        <CommentForm lang={lang} form={comments.form} onSent={reload} />
      </div>

      <div>
        <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
          {comments.list.label}
          {board.status === "ready" ? ` (${board.items.length})` : ""}
        </h3>
        {board.status === "loading" ? (
          <p
            role="status"
            className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground"
          >
            {comments.list.loading}
          </p>
        ) : board.status === "error" ? (
          <p className={noteClass}>{comments.list.error}</p>
        ) : board.items.length === 0 ? (
          <p className={noteClass}>{comments.list.empty}</p>
        ) : (
          // Kotak scroll: tinggi dibatasi agar halaman tidak memanjang saat komentar banyak.
          // tabIndex agar bisa di-scroll dengan keyboard; indikator fokus dari gaya global.
          <div
            role="region"
            aria-label={comments.list.label}
            tabIndex={0}
            className="mt-4 max-h-[32rem] overflow-y-auto border-t border-border pr-2 [scrollbar-color:var(--color-border-control)_transparent] [scrollbar-width:thin]"
          >
            <ul>
              {board.items.map((item) => (
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
          </div>
        )}
      </div>
    </div>
  );
}
