"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { revealItem } from "./Reveal";

export type TerminalLine = {
  key?: string;
  value: string;
  href?: string;
  external?: boolean;
};

export type TerminalCommand = {
  name: string;
  lines: TerminalLine[];
};

type Props = {
  title: string;
  ariaLabel: string;
  hint: string;
  commands: TerminalCommand[];
};

// Baris output muncul bergantian dengan pola masuk yang sama seperti bagian lain.
const list = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };

const chip =
  "inline-flex min-h-11 cursor-pointer items-center border px-4 font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-200";

export function HeroTerminal({ title, ariaLabel, hint, commands }: Props) {
  const [active, setActive] = useState(0);
  const current = commands[active];

  return (
    <div className="corners border border-border bg-card">
      <p className="border-b border-border px-4 py-3 font-mono text-xs text-muted-foreground">
        {title}
      </p>

      {/* Tinggi tetap agar halaman tidak bergeser saat output berganti */}
      <div
        tabIndex={0}
        role="region"
        aria-label={ariaLabel}
        aria-live="polite"
        className="h-72 overflow-y-auto px-4 py-4 font-mono text-sm sm:h-80"
      >
        <p className="text-accent">
          <span aria-hidden="true">&gt; </span>
          {current.name}
        </p>
        <motion.ul
          key={current.name}
          variants={list}
          initial="hidden"
          animate="show"
          className="mt-3 list-none space-y-2"
        >
          {current.lines.map((line, index) => (
            <motion.li
              key={index}
              variants={revealItem}
              className="flex flex-wrap gap-x-3"
            >
              {line.key && (
                <span className="text-muted-foreground">{line.key}</span>
              )}
              {line.href ? (
                <a
                  href={line.href}
                  {...(line.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {line.value}
                </a>
              ) : (
                <span>{line.value}</span>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="border-t border-border p-4">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
          {hint}
        </p>
        <div className="flex flex-wrap gap-2">
          {commands.map((command, index) => (
            <button
              key={command.name}
              type="button"
              aria-pressed={index === active}
              onClick={() => setActive(index)}
              className={`${chip} ${
                index === active
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border-control text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {command.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
