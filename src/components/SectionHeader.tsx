"use client";

import { useLang, type Bi } from "@/lib/i18n";

/** Minimal department head: thin rule, light oversized caps, real standfirst. */
export default function SectionHeader({
  label,
  standfirst,
  dark = false,
}: {
  label: Bi;
  standfirst: Bi;
  dark?: boolean;
}) {
  const { t } = useLang();
  return (
    <div className="mb-10 sm:mb-14">
      <div className={`h-px ${dark ? "bg-paper/40" : "bg-ink/25"}`} aria-hidden />
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h2 className="text-[clamp(2rem,5.5vw,3.75rem)] font-normal uppercase leading-none tracking-wide">
          {t(label)}
        </h2>
        <p
          className={`max-w-sm font-mono text-[11px] leading-relaxed tracking-wider ${dark ? "text-paper/60" : "text-stone"}`}
        >
          {t(standfirst)}
        </p>
      </div>
    </div>
  );
}
