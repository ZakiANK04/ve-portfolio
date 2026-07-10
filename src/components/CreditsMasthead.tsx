"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { partners } from "@/data/site";
import { useLang } from "@/lib/i18n";

/** Partners set like a masthead page: names first, logos as stamps. */
export default function CreditsMasthead() {
  const { t } = useLang();

  return (
    <section id="credits" className="relative bg-paper px-5 py-24 text-ink sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label={{ en: "Credits", fr: "Crédits" }}
          standfirst={{
            en: "The clubs and brands whose stories run through this issue.",
            fr: "Les clubs et marques dont les histoires traversent ce numéro.",
          }}
        />

        <ul>
          {partners.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.04}>
              <li className="flex items-center gap-5 border-t border-ink/25 py-5 last:border-b sm:gap-8">
                <span className="logo-mono relative block h-12 w-12 shrink-0 sm:h-14 sm:w-14">
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    className="h-full w-full object-contain"
                  />
                </span>
                <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-4xl">
                  {p.name}
                </h3>
                <p className="ml-auto text-right font-mono text-[11px] tracking-wider text-stone">
                  {t(p.role)}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
