"use client";

import Hourglass from "@/components/Hourglass";
import Reveal from "@/components/Reveal";
import { profile, statement, workTogether } from "@/data/site";
import { useLang } from "@/lib/i18n";

/** The black finale: statement, hourglass, one enormous ask. */
export default function ContactFinale() {
  const { t, lang } = useLang();

  const colophon = [
    { label: "LINKEDIN", value: "AOUANOUK", href: profile.linkedin },
    { label: "INSTAGRAM", value: profile.instagramHandle, href: profile.instagram },
    { label: "GITHUB", value: profile.githubHandle, href: profile.github },
    {
      label: lang === "en" ? "CV — ENGLISH" : "CV — FRANÇAIS",
      value: "PDF ↓",
      href: profile.cv[lang],
      download: true,
    },
  ];

  return (
    <section
      id="contact"
      className="on-screen film-grain relative flex min-h-svh flex-col justify-between overflow-hidden bg-screen px-5 pt-24 pb-8 text-paper sm:px-8"
    >
      <Reveal className="mx-auto w-full max-w-4xl">
        <p className="max-w-3xl text-xl font-medium uppercase leading-snug tracking-wide sm:text-3xl">
          {t(statement)}
        </p>
      </Reveal>

      <div className="relative mx-auto w-full max-w-3xl py-10">
        <Hourglass className="mx-auto block aspect-square w-full max-w-[520px]" />
        <h2 className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center text-[clamp(2.2rem,7vw,4.8rem)] font-normal uppercase tracking-wide">
          {t(workTogether)}
        </h2>
      </div>

      <div className="mx-auto w-full max-w-4xl">
        <Reveal>
          <a
            href={`mailto:${profile.email}`}
            className="mb-12 block break-all text-center font-display text-[clamp(1.4rem,4.6vw,4rem)] font-semibold leading-tight tracking-tight text-klein-bright transition-colors hover:text-signal"
          >
            {profile.email}
          </a>
        </Reveal>

        {/* Station mascot, monochrome on a tired CRT */}
        <div className="flex justify-end pb-2" aria-hidden>
          <span className="crt">
            <img src="/tenna.gif" alt="" className="h-20 w-auto" />
          </span>
        </div>

        <ul className="grid grid-cols-2 gap-6 border-t border-paper/20 pt-6 sm:grid-cols-4">
          {colophon.map((item) => (
            <li key={item.label}>
              <p className="font-mono text-[10px] tracking-widest text-paper/50">
                {item.label}
              </p>
              <a
                href={item.href}
                {...(item.download
                  ? { download: true }
                  : item.href.startsWith("mailto")
                    ? {}
                    : { target: "_blank", rel: "noreferrer" })}
                className="mt-1 inline-block break-all font-mono text-xs tracking-wider hover:text-signal"
              >
                {item.value}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3 font-mono text-[10px] tracking-widest text-paper/50">
          <p>
            © 2026 {profile.name.toUpperCase()} —{" "}
            {t({
              en: "CUT, GRADED & SHIPPED IN ALGIERS",
              fr: "MONTÉ, ÉTALONNÉ & LIVRÉ À ALGER",
            })}
          </p>
          <a href="#hero" className="hover:text-signal">
            {t({ en: "BACK TO TOP ↑", fr: "RETOUR EN HAUT ↑" })}
          </a>
        </div>
      </div>
    </section>
  );
}
