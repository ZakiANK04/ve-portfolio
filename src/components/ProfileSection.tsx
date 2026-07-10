"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import Toolkit from "@/components/Toolkit";
import { interview, profile, pullQuote } from "@/data/site";
import { useLang } from "@/lib/i18n";

/** The editor, interviewed by his own magazine. */
export default function ProfileSection() {
  const { t, lang } = useLang();

  return (
    <section id="about" className="relative bg-paper px-5 py-24 text-ink sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label={{ en: "About", fr: "À propos" }}
          standfirst={{
            en: "An interview with the person behind every cut on this page.",
            fr: "Entretien avec celui qui signe chaque montage de cette page.",
          }}
        />

        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <figure>
              <div className="duotone halftone relative overflow-hidden">
                <img
                  src="/portrait.png"
                  alt={profile.name}
                  className="block w-full object-cover"
                />
              </div>
              <figcaption className="mt-2 font-mono text-[10px] tracking-wider text-stone">
                {profile.name} — {t(profile.location)}
              </figcaption>
            </figure>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={profile.cv[lang]}
                download
                className="bg-ink px-5 py-2.5 font-mono text-[11px] tracking-widest text-paper transition-colors hover:bg-klein"
              >
                {t({ en: "DOWNLOAD CV (EN)", fr: "TÉLÉCHARGER LE CV (FR)" })}
              </a>
              <a
                href={profile.cv[lang === "en" ? "fr" : "en"]}
                download
                className="border-2 border-ink px-5 py-2.5 font-mono text-[11px] tracking-widest transition-colors hover:border-klein hover:text-klein"
              >
                {t({ en: "VERSION FRANÇAISE", fr: "ENGLISH VERSION" })}
              </a>
            </div>
          </Reveal>

          <div className="space-y-8 md:col-span-7">
            {interview.map((item) => (
              <Reveal key={item.q.en}>
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-klein">
                  {t(item.q)}
                </h3>
                <p className="mt-2 max-w-prose text-base leading-relaxed sm:text-lg">
                  {t(item.a)}
                </p>
              </Reveal>
            ))}
            <Reveal>
              <blockquote className="border-l-4 border-klein pl-5 font-quote text-2xl italic leading-snug text-klein sm:text-3xl">
                “{t(pullQuote)}”
              </blockquote>
            </Reveal>
          </div>
        </div>

        <Toolkit />
      </div>
    </section>
  );
}
