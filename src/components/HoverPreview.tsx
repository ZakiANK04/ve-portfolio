"use client";

import { useRef, useState } from "react";
import {
  hasLocalMedia,
  hasPoster,
  posterSrc,
  previewSrc,
  type Work,
} from "@/data/works";
import { useLang } from "@/lib/i18n";

/**
 * Poster that comes alive on hover/focus. Prints stay still until touched —
 * then the page goes cinema: dark frame, REC dot, moving picture.
 * Works without local media too (static slate, no playback).
 */
export default function HoverPreview({
  work,
  onOpen,
  className = "",
}: {
  work: Work;
  onOpen: (work: Work) => void;
  className?: string;
}) {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const local = hasLocalMedia(work.id);

  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };
  const stop = () => videoRef.current?.pause();

  return (
    <button
      type="button"
      onClick={() => onOpen(work)}
      onMouseEnter={local ? start : undefined}
      onMouseLeave={local ? stop : undefined}
      onFocus={local ? start : undefined}
      onBlur={local ? stop : undefined}
      className={`group relative block w-full overflow-hidden bg-screen text-left ${className}`}
      aria-label={t(work.title)}
    >
      {local ? (
        <>
          <img
            src={posterSrc(work.id)}
            alt={t(work.title)}
            loading="lazy"
            className={`block h-full w-full object-cover transition-opacity duration-150 ${playing ? "opacity-0" : "opacity-100"}`}
          />
          <video
            ref={videoRef}
            src={previewSrc(work.id)}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            onPlaying={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 ${playing ? "opacity-100" : "opacity-0"}`}
          />
          <span
            className={`absolute left-3 top-3 flex items-center gap-2 font-mono text-[10px] tracking-widest text-paper transition-opacity duration-150 ${playing ? "opacity-100" : "opacity-0"}`}
          >
            <span className="rec-dot" aria-hidden />
            PREVIEW
          </span>
        </>
      ) : hasPoster(work) ? (
        /* No playable local media, but a real poster exists. */
        <img
          src={posterSrc(work.id)}
          alt={t(work.title)}
          loading="lazy"
          className="block h-full w-full object-cover"
        />
      ) : (
        /* No local media yet — a film slate stands in. */
        <span className="flex h-full w-full flex-col justify-between p-4">
          <span className="font-mono text-[10px] tracking-widest text-stone">
            SOURCE OFFLINE
          </span>
          <span className="font-mono text-xs break-all text-paper/80">
            {work.file}
          </span>
        </span>
      )}
      <span className="pointer-events-none absolute inset-0 outline -outline-offset-4 outline-transparent transition group-hover:outline-2 group-hover:outline-signal" />
    </button>
  );
}
