"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroTitles } from "@/data/site";
import { useLang } from "@/lib/i18n";

/* Three compatible blob silhouettes (same command structure) for the
   top-center morphing mark. */
const BLOBS = [
  "M50 12 C68 10 88 24 86 46 C84 68 70 88 48 87 C26 86 12 70 13 48 C14 26 32 14 50 12 Z",
  "M50 8 C74 12 90 30 84 50 C78 70 66 90 44 86 C22 82 8 64 12 44 C16 24 34 6 50 8 Z",
  "M48 14 C66 6 86 20 88 42 C90 64 74 84 52 88 C30 92 10 74 12 50 C14 30 30 20 48 14 Z",
];

/**
 * The white hero: four-corner labels, a subtly morphing blob top-center, and
 * the stacked editorial titles with stitched rules. Content staggers in once
 * the intro hands over.
 */
export default function KineticHero({ introDone }: { introDone: boolean }) {
  const { t } = useLang();
  const reduced = useReducedMotion();

  const appear = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: introDone ? { opacity: 1, y: 0 } : {},
          transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-paper px-5 text-ink sm:px-8"
    >
      {/* Top-center: the morphing blob */}
      <motion.div className="absolute left-1/2 top-5 -translate-x-1/2" {...appear(0.35)}>
        <svg viewBox="0 0 100 100" className="h-10 w-10 text-klein" aria-hidden>
          {reduced ? (
            <path d={BLOBS[0]} fill="currentColor" />
          ) : (
            <motion.path
              fill="currentColor"
              initial={{ d: BLOBS[0] }}
              animate={{ d: [...BLOBS, BLOBS[0]] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </svg>
      </motion.div>

      {/* Center: the stacked titles */}
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="sr-only">
          Aouanouk Zakaria — {heroTitles.map((l) => l.text.en).join(", ")}
        </h1>
        {heroTitles.map((line, i) => (
          <motion.div
            key={line.text.en}
            className="flex items-center gap-6 py-1 sm:gap-10"
            aria-hidden
            {...appear(0.15 + i * 0.12)}
          >
            {line.rule === "before" && <span className="h-[2px] flex-1 bg-ink" />}
            <span className="whitespace-nowrap text-[clamp(2.2rem,6.5vw,5rem)] font-normal uppercase leading-[1.15] tracking-wide">
              {t(line.text)}
            </span>
            {line.rule === "after" && <span className="h-[2px] flex-1 bg-ink" />}
          </motion.div>
        ))}
      </div>

      {/* Bottom corners */}
      <motion.nav
        className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 pb-5 font-mono text-[11px] tracking-widest sm:px-8"
        aria-label="Hero shortcuts"
        {...appear(0.6)}
      >
        <a href="#work" className="hover:text-klein">
          PORTFOLIO
        </a>
        <a href="#contact" className="hover:text-klein">
          CONTACT
        </a>
        <a href="#archive" className="hover:text-klein">
          ARCHIVE
        </a>
      </motion.nav>
    </section>
  );
}
