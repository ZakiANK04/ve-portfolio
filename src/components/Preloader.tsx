"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { introLines } from "@/data/site";

const SEEN_KEY = "zaki-intro-v1";
const LINE_MS = 1350;

/**
 * The kinetic intro: HELLO! → I'M AOUANOUK ZAKARIA → OR JUST CALL ME ZAKI,
 * then the word ZAKI FLIP-morphs into the hero's corner wordmark
 * (shared layoutId="zaki-wordmark"). Plays once per session, click to skip,
 * bypassed entirely under reduced motion.
 */
export default function Preloader({
  playing,
  onDone,
}: {
  playing: boolean;
  onDone: () => void;
}) {
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (!playing) return;
    if (line >= introLines.length) {
      const t = window.setTimeout(onDone, 150);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setLine((l) => l + 1), LINE_MS);
    return () => window.clearTimeout(t);
  }, [playing, line, onDone]);

  if (!playing) return null;
  const lastLine = introLines.length - 1;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-paper px-6"
      onClick={onDone}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      aria-label="Intro — click to skip"
    >
      <AnimatePresence mode="wait">
        {line < introLines.length && (
          <motion.p
            key={line}
            className="text-center text-[clamp(2rem,7vw,4.5rem)] font-normal uppercase tracking-wide text-ink"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {line === lastLine ? (
              <>
                OR JUST CALL ME{" "}
                <motion.span layoutId="zaki-wordmark" className="inline-block font-display font-bold">
                  ZAKI
                </motion.span>
              </>
            ) : (
              introLines[line]
            )}
          </motion.p>
        )}
      </AnimatePresence>
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-stone">
        CLICK TO SKIP
      </p>
    </motion.div>
  );
}

/** Session gate for the intro. */
export function useIntroGate() {
  // Overlay is white-on-white at first paint, so defaulting to "show" is
  // invisible for returning visitors until the effect flips it off.
  const [show, setShow] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SEEN_KEY) === "1";
    if (reduced || seen) setShow(false);
    setChecked(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(SEEN_KEY, "1");
    setShow(false);
  };

  return { showIntro: show && checked, introPending: show, dismiss };
}
