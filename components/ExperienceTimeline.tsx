"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef } from "react";
import { ImageLightbox, type LightboxImage } from "./ImageLightbox";
import { revealItem } from "./Reveal";
import { TechIcon } from "./TechIcon";

type Item = {
  period?: string;
  title: string;
  description: string;
  tags: { name: string; icon?: string }[];
  images: LightboxImage[];
};

type Props = {
  items: Item[];
  openLabel: string;
  closeLabel: string;
};

// Garis vertikal terisi mengikuti scroll (scaleY = transform). Di layar >= 1024px garis berada
// di tengah dan kartu bergantian kanan-kiri (zigzag); di layar lebih kecil garis di kiri.
export function ExperienceTimeline({ items, openLabel, closeLabel }: Props) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });

  return (
    <ol ref={listRef} className="relative list-none space-y-16">
      {/* Rel garis (statis) dan garis progres (terisi saat scroll) */}
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-[7px] top-2 w-px bg-border lg:left-1/2"
      />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent lg:left-1/2"
        style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
      />

      {items.map((item, index) => {
        const isLeft = index % 2 === 1;

        return (
          <motion.li
            key={item.title}
            variants={revealItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="relative pl-10 lg:grid lg:grid-cols-2 lg:pl-0"
          >
            {/* Titik di garis: menyala saat dicapai */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center border border-border-control bg-background lg:left-1/2 lg:-ml-2"
            >
              <motion.span
                className="h-2 w-2 bg-accent"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "0px 0px -45% 0px" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </span>

            <div
              className={`min-w-0 ${
                isLeft
                  ? "lg:col-start-1 lg:pr-14 lg:text-right"
                  : "lg:col-start-2 lg:pl-14"
              }`}
            >
              {item.period && (
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
                  {item.period}
                </p>
              )}
              <h3
                className={`font-mono text-lg font-semibold leading-snug ${
                  item.period ? "mt-2" : ""
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`mt-2 max-w-[60ch] text-muted-foreground ${
                  isLeft ? "lg:ml-auto" : ""
                }`}
              >
                {item.description}
              </p>

              {item.tags.length > 0 && (
                <ul
                  className={`mt-4 flex list-none flex-wrap gap-2 ${
                    isLeft ? "lg:justify-end" : ""
                  }`}
                >
                  {item.tags.map((tag) => (
                    <li
                      key={tag.name}
                      className="inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-xs"
                    >
                      {tag.icon && (
                        <TechIcon
                          name={tag.icon}
                          className="shrink-0 text-muted-foreground"
                        />
                      )}
                      {tag.name}
                    </li>
                  ))}
                </ul>
              )}

              {item.images.length > 0 && (
                <ImageLightbox
                  images={item.images}
                  title={item.title}
                  openLabel={openLabel}
                  closeLabel={closeLabel}
                  className={`mt-6 max-w-lg ${isLeft ? "lg:ml-auto" : ""}`}
                />
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
