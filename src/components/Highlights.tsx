"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import {
  hasPoster,
  highlightWorks,
  mediaInfo,
  posterSrc,
  timecode,
  type Work,
} from "@/data/works";
import { useLang } from "@/lib/i18n";

/**
 * Designed plate for films whose source is still Drive-locked — a typographic
 * poster instead of a missing frame. Keyed per work so no two look templated.
 */
function DesignedPlate({ work }: { work: Work }) {
  const { t } = useLang();
  if (work.file === "TEASERADC.mp4") {
    return (
      <div className="film-grain relative flex h-full w-full flex-col justify-between overflow-hidden bg-screen p-5 text-paper">
        <span className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 font-display text-[9rem] font-bold leading-none text-klein-bright/25 transition-colors duration-300 group-hover:text-klein-bright/60">
          4.0
        </span>
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] tracking-widest text-signal">
            ▶ OFFICIAL TEASER
          </span>
          <span className="h-2 w-10 bg-signal" aria-hidden />
        </div>
        <div className="relative">
          <p className="font-display text-4xl font-bold uppercase leading-[0.9] tracking-tight sm:text-5xl">
            Algeria
            <br />
            Data Cup
          </p>
          <p className="mt-3 font-mono text-[10px] tracking-widest text-paper/60">
            IEC · 04.2025 · {t({ en: "FIRST DATATHON IN ALGIERS", fr: "PREMIER DATATHON D’ALGER" })}
          </p>
        </div>
      </div>
    );
  }
  // AEC vlog intro plate
  return (
    <div className="halftone relative flex h-full w-full flex-col justify-between overflow-hidden bg-klein p-5 text-paper">
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10px] tracking-widest text-paper/70">
          VIC · {t({ en: "EVENT VLOG", fr: "VLOG D’ÉVÉNEMENT" })}
        </span>
        <span
          className="inline-block border-y-[10px] border-l-[16px] border-y-transparent border-l-paper transition-colors duration-300 group-hover:border-l-signal"
          aria-hidden
        />
      </div>
      <div>
        <p className="font-display text-[5.5rem] font-bold leading-[0.85] tracking-tight sm:text-[7rem]">
          AEC
        </p>
        <p className="mt-2 font-mono text-[10px] tracking-widest text-paper/70">
          {t({ en: "INTRO SEQUENCE — 25FPS", fr: "SÉQUENCE D’INTRO — 25FPS" })}
        </p>
      </div>
    </div>
  );
}

/** Frame-based thumb: duotone print by default, true color on hover. */
function FramePlate({ work }: { work: Work }) {
  const { t } = useLang();
  return (
    <div className="duotone halftone relative h-full w-full overflow-hidden">
      <img
        src={posterSrc(work.id)}
        alt={t(work.title)}
        loading="lazy"
        className="h-full w-full object-cover transition-[filter,mix-blend-mode] duration-300 group-hover:mix-blend-normal group-hover:![filter:none]"
      />
    </div>
  );
}

/** Four commissions, four disciplines — the genre sampler, card style. */
export default function Highlights({ onOpen }: { onOpen: (w: Work) => void }) {
  const { t } = useLang();

  return (
    <section id="work" className="relative bg-paper px-5 py-24 text-ink sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label={{ en: "Highlights", fr: "Sélection" }}
          standfirst={{
            en: "Four commissions, four disciplines — explanatory work, animation, event highlights, movie-grade trailers.",
            fr: "Quatre commandes, quatre disciplines — vidéos explicatives, animation, highlights d’événement, bandes-annonces de cinéma.",
          }}
        />

        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
          {highlightWorks.map((work, i) => {
            const info = mediaInfo(work.id);
            return (
              <Reveal key={work.id} delay={(i % 2) * 0.08}>
                <article className="group">
                  <button
                    type="button"
                    onClick={() => onOpen(work)}
                    className="relative block aspect-video w-full cursor-pointer overflow-hidden bg-screen text-left"
                    aria-label={t(work.title)}
                  >
                    {hasPoster(work) ? (
                      <FramePlate work={work} />
                    ) : (
                      <DesignedPlate work={work} />
                    )}
                    <span className="pointer-events-none absolute inset-0 outline -outline-offset-4 outline-transparent transition group-hover:outline-2 group-hover:outline-signal" />
                  </button>

                  <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-klein">
                    {work.genre ? t(work.genre) : t(work.tag)}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                    {t(work.title)}
                  </h3>
                  {work.description && (
                    <p className="mt-2 max-w-prose text-sm leading-relaxed sm:text-base">
                      {t(work.description)}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap items-baseline gap-x-4 font-mono text-[11px] tracking-wider text-stone">
                    <span>
                      {work.client} · {work.year}
                      {info ? ` · ${timecode(info.duration)}` : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpen(work)}
                      className="cursor-pointer text-ink underline decoration-2 underline-offset-4 transition-colors hover:text-klein"
                    >
                      {t({ en: "SCREEN IT →", fr: "PROJETER →" })}
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
