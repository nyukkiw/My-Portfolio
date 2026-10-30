"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";

type Props = {
  label: string;
  openLabel: string;
  closeLabel: string;
  links: { href: string; label: string }[];
};

// Menu untuk layar < 640px. Panel muncul tepat di bawah header (header bersifat sticky,
// jadi menjadi acuan posisi absolute). Tutup dengan Esc, klik di luar, atau memilih tautan.
export function MobileNav({ label, openLabel, closeLabel, links }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
        !panelRef.current?.contains(target) &&
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
    <div className="sm:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-11 cursor-pointer items-center gap-2 px-1 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-200 hover:text-accent"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
        {open ? closeLabel : openLabel}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            ref={panelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-0 top-full border-b border-border bg-background"
          >
            <nav aria-label={label}>
              <ul className="list-none px-4 py-2">
                {links.map((link) => (
                  <li
                    key={link.href}
                    className="border-b border-border last:border-b-0"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center font-mono text-sm uppercase tracking-[0.08em] transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
