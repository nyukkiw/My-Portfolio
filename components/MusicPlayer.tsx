"use client";

import { useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "./icons";

type Props = {
  track: { src: string; title: string; artist?: string };
  label: string;
  error: string;
};

// Pemutar musik latar. Tidak pernah memutar otomatis: hanya mulai saat tombol ditekan.
// preload="none": file baru diunduh saat pertama kali diputar.
export function MusicPlayer({ track, label, error }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        audio.volume = 0.5;
        await audio.play();
        setFailed(false);
      } catch {
        setFailed(true);
      }
    } else {
      audio.pause();
    }
  }

  const text = failed
    ? error
    : track.artist
      ? `${track.title} · ${track.artist}`
      : track.title;

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <audio
        ref={audioRef}
        src={track.src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={`${label}: ${track.title}`}
        className={`flex min-h-11 max-w-[calc(100vw-9.5rem)] cursor-pointer sm:max-w-[calc(100vw-2rem)] items-center gap-3 border bg-background/95 px-4 py-2 font-mono text-xs transition-colors duration-200 hover:border-accent ${
          playing ? "eq-playing border-accent" : "border-border-control"
        }`}
      >
        {playing ? (
          <PauseIcon className="shrink-0 text-accent" />
        ) : (
          <PlayIcon className="shrink-0 text-accent" />
        )}
        <span
          className={`min-w-0 max-w-48 truncate ${failed ? "text-destructive" : "text-muted-foreground"}`}
        >
          {text}
        </span>
        <span aria-hidden="true" className="flex h-4 shrink-0 items-end gap-0.5">
          <span className="eq-bar h-full w-0.5 bg-accent" />
          <span className="eq-bar h-full w-0.5 bg-accent" />
          <span className="eq-bar h-full w-0.5 bg-accent" />
        </span>
      </button>
      <p role="status" className="sr-only">
        {failed ? error : ""}
      </p>
    </div>
  );
}
