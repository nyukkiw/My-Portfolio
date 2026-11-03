"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "./icons";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null; // penyimpanan tidak tersedia (mode privat, dan seterusnya)
  }
}

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

// Tema aktif = atribut data-theme pada <html> (diatur skrip di <head> sebelum halaman tergambar).
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";
const getServerSnapshot = (): Theme => "dark";

type Props = { toLightLabel: string; toDarkLabel: string };

export function ThemeToggle({ toLightLabel, toDarkLabel }: Props) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Di mode dev, Strict Mode me-reset atribut <html> saat komponen dipasang ulang.
  // Terapkan lagi tema yang benar sebelum tergambar (tidak berpengaruh di produksi).
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = storedTheme() ?? systemTheme();
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* pilihan tidak bisa disimpan, tema tetap berganti untuk sesi ini */
    }
  }

  // Ikon menunjukkan tema tujuan: matahari saat gelap (ke terang), bulan saat terang (ke gelap).
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? toDarkLabel : toLightLabel}
      className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-accent"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
