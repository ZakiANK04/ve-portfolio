"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import HoverPreview from "@/components/HoverPreview";
import SectionHeader from "@/components/SectionHeader";
import { archiveWorks, type Work } from "@/data/works";
import { useLang } from "@/lib/i18n";

/**
 * The contact sheet stays in the can until asked for: one DISCOVER MORE
 * press deals every thumbnail onto the table in a stagger.
 */
export default function ArchiveGrid({ onOpen }: { onOpen: (w: Work) => void }) {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  return (
    <section id="archive" className="relative bg-paper px-5 py-24 text-ink sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label={{ en: "Archive", fr: "Archives" }}
          standfirst={{
            en: "The rest of the bin — quick turnarounds, outings, announcements. Raw and shipped.",
            fr: "Le reste du chutier — livraisons rapides, sorties, annonces. Brut et livré.",
          }}
        />

        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="gate"
              className="flex justify-center py-12"
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="cursor-pointer border-2 border-ink px-10 py-4 font-mono text-[11px] tracking-widest transition-colors hover:bg-ink hover:text-paper"
              >
                {t({ en: "DISCOVER MORE ↓", fr: "DÉCOUVRIR PLUS ↓" })}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="sheet"
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
              initial={reduced ? false : "hidden"}
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.06 } },
                hidden: {},
              }}
            >
              {archiveWorks.map((work) => (
                <motion.figure
                  key={work.id}
                  variants={{
                    hidden: { opacity: 0, y: 28, scale: 0.94 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  <HoverPreview work={work} onOpen={onOpen} className="aspect-[4/5]" />
                  <figcaption className="mt-2 flex items-baseline justify-between gap-2 font-mono text-[10px] tracking-wider text-stone">
                    <span className="truncate">{work.file}</span>
                    <span className="shrink-0">{t(work.tag)}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
