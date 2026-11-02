"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { CloseIcon, ExpandIcon } from "./icons";

export type LightboxImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type Props = {
  images: LightboxImage[];
  title: string;
  openLabel: string;
  closeLabel: string;
  className?: string;
};

// Pola yang sama dengan pop-up sertifikat: gambar kecil membesar ke tengah (layoutId, hanya
// transform), latar blur, tombol Close, Esc, fokus terkunci, dan kembali ke pemicu saat ditutup.
const layoutTransition = { layout: { duration: 0.3, ease: "easeOut" } } as const;
const fade = { duration: 0.25, ease: "easeOut" } as const;
const noopSubscribe = () => () => {};

export function ImageLightbox({
  images,
  title,
  openLabel,
  closeLabel,
  className = "",
}: Props) {
  const base = useId();
  const titleId = `${base}-judul`;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // false di server dan saat hidrasi; portal hanya dipakai di klien.
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const active = activeIndex === null ? null : images[activeIndex];
  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;

    // Kunci scroll halaman, jaga lebar agar tidak bergeser saat scrollbar hilang.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      // Satu-satunya elemen fokus di pop-up adalah tombol Close: fokus tidak boleh keluar.
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [activeIndex, close]);

  return (
    <>
      <ul
        className={`grid list-none gap-3 ${
          images.length > 1 ? "grid-cols-2" : "grid-cols-1"
        } ${className}`}
      >
        {images.map((image, index) => (
          <li key={image.src}>
            <motion.button
              type="button"
              layoutId={`${base}-${image.src}`}
              transition={layoutTransition}
              aria-haspopup="dialog"
              aria-label={`${openLabel}: ${image.alt}`}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setActiveIndex(index);
              }}
              // Satu gambar: rasio aslinya. Beberapa gambar: bingkai 4:3 agar berdampingan rapi.
              style={
                images.length > 1
                  ? undefined
                  : { aspectRatio: `${image.width} / ${image.height}` }
              }
              className={`group relative block w-full cursor-pointer overflow-hidden border border-border bg-muted transition-[border-color] duration-200 hover:border-accent ${
                images.length > 1 ? "aspect-[4/3]" : ""
              }`}
            >
              {/* Disajikan apa adanya: file sudah dioptimalkan, jadi tidak diperkecil dan tidak
                  dikompres ulang oleh server (itu yang membuat gambar blur dan menyimpan versi lama). */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                unoptimized
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center bg-background/90 text-accent"
              >
                <ExpandIcon />
              </span>
            </motion.button>
          </li>
        ))}
      </ul>

      {isClient &&
        createPortal(
          <AnimatePresence onExitComplete={() => triggerRef.current?.focus()}>
            {active && (
              <motion.div
                key={`${base}-dialog`}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={fade}
              >
                {/* Latar blur: klik untuk menutup */}
                <div
                  aria-hidden="true"
                  onClick={close}
                  className="absolute inset-0 bg-background/70 backdrop-blur-md"
                />
                <motion.div
                  layoutId={`${base}-${active.src}`}
                  transition={layoutTransition}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  className="corners relative w-full max-w-[960px] border border-border bg-card"
                >
                  <div className="max-h-[calc(92svh-2px)] overflow-y-auto p-4 md:p-6">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <h3
                        id={titleId}
                        className="font-mono text-sm font-semibold leading-snug"
                      >
                        {title}
                      </h3>
                      <button
                        ref={closeRef}
                        type="button"
                        onClick={close}
                        className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 border border-border-control px-4 font-mono text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-200 hover:border-accent hover:text-accent"
                      >
                        <CloseIcon />
                        {closeLabel}
                      </button>
                    </div>
                    <Image
                      src={active.src}
                      alt={active.alt}
                      width={active.width}
                      height={active.height}
                      sizes="(min-width: 1024px) 900px, 92vw"
                      // Disajikan apa adanya: file sudah dioptimalkan, jadi tidak dikompres ulang
                      // (kualitas lain selain 75 butuh images.qualities di next.config.ts).
                      unoptimized
                      className="mx-auto h-auto max-h-[70svh] w-auto max-w-full"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
