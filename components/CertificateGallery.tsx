"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, ExpandIcon } from "./icons";
import { RevealGroup, RevealItem } from "./Reveal";

type Certificate = {
  name: string;
  issuer: string;
  date: string;
  image: string;
};

type Props = {
  certificates: {
    items: Certificate[];
    imageAltPrefix: string;
    openLabel: string;
    closeLabel: string;
  };
};

const DIALOG_TITLE_ID = "sertifikat-dialog-judul";

// Kartu yang sama berpindah dari grid ke pop-up (layoutId), hanya transform dan opacity.
const layoutTransition = { layout: { duration: 0.3, ease: "easeOut" } } as const;
const fade = { duration: 0.25, ease: "easeOut" } as const;

const noopSubscribe = () => () => {};

function CardBody({
  cert,
  labels,
  expanded,
}: {
  cert: Certificate;
  labels: Props["certificates"];
  expanded: boolean;
}) {
  return (
    <>
      <motion.div
        layoutId={`cert-img-${cert.image}`}
        transition={layoutTransition}
        className={`relative aspect-[1200/839] w-full overflow-hidden bg-muted transition-[filter] duration-300 ${
          expanded
            ? ""
            : "grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0"
        }`}
      >
        <Image
          src={cert.image}
          alt={`${labels.imageAltPrefix} ${cert.name}`}
          fill
          sizes={
            expanded
              ? "(min-width: 1024px) 900px, 92vw"
              : "(min-width: 1280px) 360px, (min-width: 768px) 45vw, 100vw"
          }
          className="object-cover"
        />
      </motion.div>
      <motion.div layout="position" transition={layoutTransition}>
        <h3
          id={expanded ? DIALOG_TITLE_ID : undefined}
          className="mt-6 flex items-start justify-between gap-4 font-mono text-base font-semibold leading-snug"
        >
          {cert.name}
          {!expanded && (
            <ExpandIcon className="mt-0.5 shrink-0 text-accent" />
          )}
        </h3>
        <p className="mt-2 text-muted-foreground">{cert.issuer}</p>
        <p className="mt-4 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
          <span>{cert.date}</span>
          {!expanded && <span className="text-accent">{labels.openLabel}</span>}
        </p>
      </motion.div>
    </>
  );
}

export function CertificateGallery({ certificates }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // false di server dan saat hidrasi, true setelah itu: portal hanya dipakai di klien.
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const active = activeIndex === null ? null : certificates.items[activeIndex];
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
      <RevealGroup className="grid list-none gap-6 md:grid-cols-2 xl:grid-cols-3">
        {certificates.items.map((cert, index) => (
          <RevealItem key={cert.image}>
            <motion.button
              type="button"
              layoutId={`cert-${cert.image}`}
              transition={layoutTransition}
              aria-haspopup="dialog"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setActiveIndex(index);
              }}
              className="corners group block h-full w-full cursor-pointer border border-border bg-card p-6 text-left transition-[translate,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent"
            >
              <CardBody cert={cert} labels={certificates} expanded={false} />
            </motion.button>
          </RevealItem>
        ))}
      </RevealGroup>

      {isClient &&
        createPortal(
          <AnimatePresence onExitComplete={() => triggerRef.current?.focus()}>
            {active && (
              <motion.div
                key="sertifikat-dialog"
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
                  layoutId={`cert-${active.image}`}
                  transition={layoutTransition}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={DIALOG_TITLE_ID}
                  className="corners relative w-full max-w-[960px] border border-border bg-card"
                >
                  <div className="max-h-[calc(92svh-2px)] overflow-y-auto p-6 md:p-8">
                    <div className="mb-4 flex justify-end">
                      <button
                        ref={closeRef}
                        type="button"
                        onClick={close}
                        className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-border-control px-4 font-mono text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-200 hover:border-accent hover:text-accent"
                      >
                        <CloseIcon />
                        {certificates.closeLabel}
                      </button>
                    </div>
                    <CardBody cert={active} labels={certificates} expanded />
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
