"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import {
  drivePreview,
  fullSrc,
  hasLocalMedia,
  mediaInfo,
  posterSrc,
  timecode,
  youtubeEmbed,
  type Work,
} from "@/data/works";
import { useLang } from "@/lib/i18n";

/** The screening room: everything else goes dark while a cut plays. */
export default function Lightbox({
  work,
  onClose,
}: {
  work: Work | null;
  onClose: () => void;
}) {
  const { t } = useLang();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!work) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [work, onClose]);

  const info = work ? mediaInfo(work.id) : undefined;
  const portrait = info ? info.height > info.width : false;

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t(work.title)}
          className="on-screen film-grain fixed inset-0 z-50 flex flex-col bg-screen/95 backdrop-blur-sm"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <div className="relative z-10 flex items-center justify-between px-5 py-4 text-paper">
            <span className="flex items-center gap-2 font-mono text-[11px] tracking-widest">
              <span className="rec-dot" aria-hidden />
              NOW SCREENING
            </span>
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[11px] tracking-widest text-paper hover:text-signal"
            >
              CLOSE ✕
            </button>
          </div>

          <div
            className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            {work.yt ? (
              <iframe
                src={youtubeEmbed(work.id)}
                allow="autoplay; fullscreen"
                allowFullScreen
                title={t(work.title)}
                className="aspect-video w-full max-w-5xl border-0 bg-screen"
              />
            ) : hasLocalMedia(work.id) ? (
              <video
                src={fullSrc(work.id)}
                poster={posterSrc(work.id)}
                controls
                autoPlay
                playsInline
                className={`max-h-full bg-screen ${portrait ? "h-full w-auto" : "w-full max-w-5xl"}`}
              />
            ) : (
              <iframe
                src={drivePreview(work.id)}
                allow="autoplay; fullscreen"
                title={t(work.title)}
                className="aspect-video w-full max-w-5xl border-0 bg-screen"
              />
            )}
          </div>

          <div
            className="relative z-10 flex flex-wrap items-baseline gap-x-6 gap-y-1 px-5 pb-5 text-paper"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-xl font-semibold sm:text-2xl">
              {t(work.title)}
            </h2>
            <p className="font-mono text-[11px] tracking-wider text-paper/60">
              {work.client} · {work.year} · {t(work.tag)}
              {info ? ` · ${timecode(info.duration)}` : ""}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
