"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronUpIcon, GlobeIcon } from "./icons";

type Option = { code: string; short: string; name: string; href: string };

type Props = {
  current: string;
  label: string;
  options: Option[];
};

// Dropdown bahasa di pojok kanan bawah (pasangan tombol musik di pojok kiri bawah). Menu terbuka ke atas.
// Pilihan berupa tautan ke alamat tiap bahasa ("/" = Indonesia, "/en" = Inggris), jadi pindah bahasa
// memuat halaman baru. Tutup dengan Esc, klik di luar, atau tekan tombolnya lagi.
export function LanguageSwitch({ current, label, options }: Props) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const active = options.find((option) => option.code === current) ?? options[0];

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !menuRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            ref={menuRef}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full right-0 mb-2 min-w-48 border border-border bg-background"
          >
            <ul aria-label={label} className="list-none">
              {options.map((option) => (
                <li
                  key={option.code}
                  className="border-b border-border last:border-b-0"
                >
                  {option.code === current ? (
                    <span
                      aria-current="true"
                      className="flex min-h-11 items-center justify-between gap-4 px-4 font-mono text-xs uppercase tracking-[0.08em] text-accent"
                    >
                      <span>{option.name}</span>
                      <span aria-hidden="true">&#10003;</span>
                    </span>
                  ) : (
                    <a
                      href={option.href}
                      lang={option.code}
                      hrefLang={option.code}
                      className="flex min-h-11 items-center justify-between gap-4 px-4 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-200 hover:text-accent"
                    >
                      <span>{option.name}</span>
                      <span aria-hidden="true">{option.short}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${label}: ${active.name}`}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 cursor-pointer items-center gap-2 border border-border-control bg-background/95 px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-200 hover:border-accent hover:text-accent"
      >
        <GlobeIcon className="shrink-0 text-accent" />
        {active.short}
        <ChevronUpIcon
          className={`shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
}
