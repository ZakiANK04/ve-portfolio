"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile, sections } from "@/data/site";
import { useLang, type Lang } from "@/lib/i18n";

/**
 * Persistent chrome: ZAKI top-left (morph target of the intro), EN/FR and
 * MENU top-right. Lives in a difference blend so it reads over white
 * sections and the black finale alike. MENU opens a full white overlay.
 */
export default function CornerChrome({ introDone }: { introDone: boolean }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const langButton = (code: Lang) => (
    <button
      type="button"
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      className={`px-1 font-mono text-[11px] tracking-widest underline-offset-4 ${
        lang === code ? "underline decoration-2" : "hover:underline"
      }`}
    >
      {code.toUpperCase()}
    </button>
  );

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 mix-blend-difference">
        <div className="flex items-center justify-between px-5 py-4 text-paper sm:px-8">
          <a href="#hero" className="pointer-events-auto" aria-label="Back to top">
            {introDone && (
              <motion.span
                layoutId="zaki-wordmark"
                className="inline-block font-display text-lg font-bold tracking-tight"
              >
                ZAKI
              </motion.span>
            )}
          </a>
          <div className="pointer-events-auto flex items-center gap-5">
            <span className="flex items-center">
              {langButton("en")}
              <span className="font-mono text-[11px]" aria-hidden>
                /
              </span>
              {langButton("fr")}
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="font-mono text-[11px] tracking-widest hover:underline underline-offset-4"
            >
              MENU
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-paper px-6 py-5 sm:px-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold tracking-tight">ZAKI</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-mono text-[11px] tracking-widest hover:text-klein"
              >
                CLOSE ✕
              </button>
            </div>
            <nav className="flex flex-1 items-center" aria-label="Sections">
              <ul className="space-y-2">
                {sections.slice(1).map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.35 }}
                  >
                    <a
                      href={`#${s.id}`}
                      onClick={() => setOpen(false)}
                      className="text-[clamp(2rem,6vw,3.5rem)] font-normal uppercase tracking-wide transition-colors hover:text-klein"
                    >
                      {t(s.label)}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-wrap items-baseline justify-between gap-3 font-mono text-[11px] tracking-widest text-stone">
              <a href={`mailto:${profile.email}`} className="hover:text-klein">
                {profile.email}
              </a>
              <span className="flex gap-5">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-klein">
                  LINKEDIN
                </a>
                <a href={profile.instagram} target="_blank" rel="noreferrer" className="hover:text-klein">
                  INSTAGRAM
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-klein">
                  GITHUB
                </a>
                <a href={profile.cv[lang]} download className="hover:text-klein">
                  CV ↓
                </a>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
