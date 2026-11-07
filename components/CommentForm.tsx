"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@/content/id";
import { MESSAGE_MAX, NAME_MAX } from "@/lib/comments";

type Status = "idle" | "sending" | "sent" | "invalid" | "rate" | "server";

const labelClass =
  "font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground";
const fieldClass =
  "mt-3 w-full border border-border-control bg-muted px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-accent";

export function CommentForm({
  lang,
  form,
  onSent,
}: {
  lang: string;
  form: Content["comments"]["form"];
  onSent: () => void | Promise<void>;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState(""); // honeypot: manusia tidak melihatnya
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || message.trim() === "") return;
    clearTimeout(timer.current);
    setStatus("sending");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, lang, website: trap }),
      });
      if (res.ok) {
        setName("");
        setMessage("");
        setStatus("sent");
        // Pesan sukses hilang sendiri setelah 3 detik.
        timer.current = setTimeout(() => setStatus("idle"), 3000);
        void onSent(); // muat ulang daftar komentar agar komentar baru langsung terlihat
        return;
      }
      const data: { error?: string } = await res.json().catch(() => ({}));
      setStatus(
        data.error === "invalid" || data.error === "rate"
          ? data.error
          : "server",
      );
    } catch {
      setStatus("server");
    }
  }

  const feedback =
    status === "sent"
      ? form.success
      : status === "invalid" || status === "rate" || status === "server"
        ? form.errors[status]
        : "";

  return (
    <form onSubmit={submit} className="mt-8 space-y-6">
      <div>
        <label htmlFor="comment-name" className={labelClass}>
          {form.nameLabel}
        </label>
        <input
          id="comment-name"
          type="text"
          maxLength={NAME_MAX}
          autoComplete="nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={form.namePlaceholder}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="comment-message" className={labelClass}>
          {form.messageLabel}
        </label>
        <textarea
          id="comment-message"
          rows={4}
          required
          maxLength={MESSAGE_MAX}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={form.messagePlaceholder}
          className={fieldClass}
        />
        <p className="mt-2 text-right font-mono text-xs text-muted-foreground">
          {MESSAGE_MAX - message.length} {form.remaining}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={trap}
            onChange={(e) => setTrap(e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending" || message.trim() === ""}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center bg-accent px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-on-accent transition-[background-color] duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? form.sending : form.submit}
        </button>
        <p
          role="status"
          className={`font-mono text-xs ${
            status === "sent" ? "text-accent" : "text-destructive"
          }`}
        >
          {feedback}
        </p>
      </div>
    </form>
  );
}
