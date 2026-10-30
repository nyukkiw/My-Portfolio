"use client";

import { motion } from "motion/react";
import { useId, useState } from "react";
import { PlusIcon } from "./icons";

type Item = { question: string; answer: string };

// Pola accordion standar: judul (h3) berisi tombol dengan aria-expanded/aria-controls,
// panel berupa region yang berlabel pertanyaannya. Beberapa panel boleh terbuka bersamaan.
export function FaqAccordion({ items }: { items: Item[] }) {
  const base = useId();
  const [open, setOpen] = useState<number[]>([]);

  function toggle(index: number) {
    setOpen((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  return (
    <ul className="max-w-3xl list-none divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const buttonId = `${base}-q${index}`;
        const panelId = `${base}-a${index}`;

        return (
          <li key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex min-h-11 w-full cursor-pointer items-start justify-between gap-6 py-5 text-left font-mono text-base font-semibold transition-colors duration-200 hover:text-accent"
              >
                <span>{item.question}</span>
                <PlusIcon
                  className={`mt-0.5 shrink-0 text-accent transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              {/* Hanya opacity dan transform; tinggi tidak dianimasikan. */}
              <motion.p
                initial={false}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="max-w-[65ch] pb-6 pr-10 text-muted-foreground"
              >
                {item.answer}
              </motion.p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
