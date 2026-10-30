"use client";

import { useEffect, useRef, useState } from "react";

export type BriefContent = {
  type: { legend: string; options: { label: string; sentence: string }[] };
  features: { legend: string; prefix: string; options: string[] };
  time: { legend: string; prefix: string; options: string[] };
  notes: { label: string; placeholder: string; prefix: string };
  result: {
    label: string;
    empty: string;
    copy: string;
    copied: string;
    error: string;
    reset: string;
    next: string;
    nextHref: string;
  };
};

type CopyStatus = "idle" | "copied" | "error";

const legendClass =
  "font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground";

// Pilihan berbentuk chip, tetapi memakai input radio/checkbox asli agar
// bisa dipakai keyboard (panah, spasi) dan dibaca pembaca layar.
// onClear: radio standar tidak bisa dibatalkan, jadi menekan lagi pilihan yang aktif memanggil ini.
function Choice({
  kind,
  name,
  label,
  checked,
  onChange,
  onClear,
}: {
  kind: "radio" | "checkbox";
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  onClear?: () => void;
}) {
  return (
    <label className="relative inline-flex cursor-pointer">
      <input
        type={kind}
        name={name}
        checked={checked}
        onChange={onChange}
        onClick={() => {
          if (checked) onClear?.();
        }}
        className="peer sr-only"
      />
      <span className="inline-flex min-h-11 items-center border border-border-control px-4 py-2 font-mono text-sm text-muted-foreground transition-colors duration-200 hover:border-accent hover:text-accent peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-accent peer-checked:before:mr-2 peer-checked:before:content-['✓'] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ring">
        {label}
      </span>
    </label>
  );
}

export function BriefBuilder({ brief }: { brief: BriefContent }) {
  const [typeIndex, setTypeIndex] = useState<number | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [timeIndex, setTimeIndex] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Ringkasan disusun dari pilihan pengunjung; hanya disalin, tidak dikirim ke mana pun.
  const text =
    typeIndex === null
      ? ""
      : [
          brief.type.options[typeIndex].sentence,
          features.length > 0
            ? `${brief.features.prefix}: ${brief.features.options
                .filter((option) => features.includes(option))
                .join(", ")}.`
            : null,
          timeIndex !== null
            ? `${brief.time.prefix}: ${brief.time.options[timeIndex]}.`
            : null,
          notes.trim() ? `${brief.notes.prefix}: ${notes.trim()}` : null,
        ]
          .filter(Boolean)
          .join("\n");

  function toggleFeature(option: string) {
    setFeatures((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  }

  const isEmpty =
    typeIndex === null &&
    features.length === 0 &&
    timeIndex === null &&
    notes === "";

  function reset() {
    setTypeIndex(null);
    setFeatures([]);
    setTimeIndex(null);
    setNotes("");
    setStatus("idle");
  }

  async function copy() {
    let next: CopyStatus = "copied";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      next = "error";
    }
    setStatus(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  }

  const statusLabel =
    status === "copied"
      ? brief.result.copied
      : status === "error"
        ? brief.result.error
        : "";

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="space-y-8">
        <fieldset className="min-w-0">
          <legend className={legendClass}>{brief.type.legend}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {brief.type.options.map((option, index) => (
              <Choice
                key={option.label}
                kind="radio"
                name="brief-type"
                label={option.label}
                checked={typeIndex === index}
                onChange={() => setTypeIndex(index)}
                onClear={() => setTypeIndex(null)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className={legendClass}>{brief.features.legend}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {brief.features.options.map((option) => (
              <Choice
                key={option}
                kind="checkbox"
                name="brief-features"
                label={option}
                checked={features.includes(option)}
                onChange={() => toggleFeature(option)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className={legendClass}>{brief.time.legend}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {brief.time.options.map((option, index) => (
              <Choice
                key={option}
                kind="radio"
                name="brief-time"
                label={option}
                checked={timeIndex === index}
                onChange={() => setTimeIndex(index)}
                onClear={() => setTimeIndex(null)}
              />
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="brief-notes" className={legendClass}>
            {brief.notes.label}
          </label>
          <textarea
            id="brief-notes"
            rows={4}
            maxLength={500}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder={brief.notes.placeholder}
            className="mt-3 w-full border border-border-control bg-muted px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-accent"
          />
        </div>
      </div>

      <div className="corners h-fit border border-border bg-card p-6 md:p-8">
        <h3 className={legendClass}>{brief.result.label}</h3>
        <p
          className={`mt-4 min-h-32 whitespace-pre-wrap font-mono text-sm leading-relaxed ${
            text ? "" : "text-muted-foreground"
          }`}
        >
          {text || brief.result.empty}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={copy}
            disabled={!text}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center bg-accent px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-on-accent transition-[background-color] duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {brief.result.copy}
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={isEmpty}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center border border-border-control px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            {brief.result.reset}
          </button>
          <span
            role="status"
            className={`font-mono text-xs uppercase tracking-[0.08em] ${
              status === "error" ? "text-destructive" : "text-accent"
            }`}
          >
            {statusLabel}
          </span>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          <a
            href={brief.result.nextHref}
            className="text-accent underline-offset-4 hover:underline"
          >
            {brief.result.next} &rarr;
          </a>
        </p>
      </div>
    </div>
  );
}
