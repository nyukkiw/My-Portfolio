"use client";

import { useEffect, useRef, useState } from "react";
import { MailIcon } from "./icons";

type Props = {
  email: {
    label: string;
    user: string;
    domain: string;
    copyLabel: string;
    copiedLabel: string;
    errorLabel: string;
    ariaLabel: string;
  };
};

type Status = "idle" | "copied" | "error";

export function CopyEmail({ email }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Tampilan disamarkan; alamat utuh hanya dirangkai saat disalin.
  const masked = `${email.user[0]}••••••@${email.domain}`;

  async function copy() {
    let next: Status = "copied";
    try {
      await navigator.clipboard.writeText(`${email.user}@${email.domain}`);
    } catch {
      next = "error";
    }
    setStatus(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  }

  const statusLabel =
    status === "copied"
      ? email.copiedLabel
      : status === "error"
        ? email.errorLabel
        : email.copyLabel;

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={email.ariaLabel}
      className="group flex min-h-11 w-full cursor-pointer flex-wrap items-center gap-x-4 gap-y-1 border border-border-control px-4 py-3 text-left transition-colors duration-200 hover:border-accent"
    >
      <MailIcon className="shrink-0 text-accent" />
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
        {email.label}
      </span>
      <span className="min-w-0 break-all font-mono text-sm sm:ml-auto">
        {masked}
      </span>
      <span
        role="status"
        className={`font-mono text-xs uppercase tracking-[0.08em] ${
          status === "error" ? "text-destructive" : "text-accent"
        }`}
      >
        {statusLabel}
      </span>
    </button>
  );
}
