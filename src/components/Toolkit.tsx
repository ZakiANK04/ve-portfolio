"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { useLang, type Bi } from "@/lib/i18n";

const SWEEP_S = 1.4;

/* ————— Inline tool marks — mono ink by default, brand color when `colored`. ————— */

function AdobeTile({
  letters,
  tile,
  text,
  colored,
}: {
  letters: string;
  tile: string;
  text: string;
  colored: boolean;
}) {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden>
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="6"
        fill={colored ? tile : "currentColor"}
        style={{ transition: "fill 200ms" }}
      />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fontFamily="Fragment Mono, monospace"
        fontSize="13"
        fontWeight="700"
        fill={colored ? text : "var(--color-paper)"}
        style={{ transition: "fill 200ms" }}
      >
        {letters}
      </text>
    </svg>
  );
}

function ResolveMark({ colored }: { colored: boolean }) {
  const petals: [number, number, string][] = [
    [16, 7.5, "#FFB43B"],
    [24.5, 16, "#FF6B5E"],
    [16, 24.5, "#B15EFF"],
    [7.5, 16, "#4C9AFF"],
  ];
  return (
    <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0" aria-hidden>
      {petals.map(([cx, cy, brand], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="7.5"
          fill={colored ? brand : "currentColor"}
          fillOpacity={colored ? 0.9 : 0.55}
          style={{ transition: "fill 200ms" }}
        />
      ))}
    </svg>
  );
}

function CinemaMark({ colored }: { colored: boolean }) {
  // A "C" drawn as a ring of spheres, gap facing right — the C4D ball.
  const dots: ReactNode[] = [];
  for (let i = 0; i < 9; i++) {
    const angle = ((40 + i * 35) * Math.PI) / 180;
    dots.push(
      <circle
        key={i}
        cx={16 + 11.5 * Math.cos(angle)}
        cy={16 + 11.5 * Math.sin(angle)}
        r="2.6"
        fill={colored ? "#5A6FF0" : "currentColor"}
        style={{ transition: "fill 200ms" }}
      />,
    );
  }
  return (
    <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0" aria-hidden>
      {dots}
      <circle
        cx="16"
        cy="16"
        r="4"
        fill={colored ? "#5A6FF0" : "currentColor"}
        fillOpacity={colored ? 1 : 0.55}
        style={{ transition: "fill 200ms" }}
      />
    </svg>
  );
}

function BlenderMark({ colored }: { colored: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0" aria-hidden>
      <circle
        cx="16"
        cy="16"
        r="13"
        fill={colored ? "#EA7600" : "currentColor"}
        style={{ transition: "fill 200ms" }}
      />
      <circle cx="19" cy="13" r="6.5" fill="var(--color-paper)" />
      <circle
        cx="19"
        cy="13"
        r="2.8"
        fill={colored ? "#265787" : "currentColor"}
        style={{ transition: "fill 200ms" }}
      />
    </svg>
  );
}

/* ————— Data ————— */

type CoreTool = {
  name: string;
  score: number; // out of 5
  mark: (colored: boolean) => ReactNode;
};

const CORE: CoreTool[] = [
  {
    name: "Premiere Pro",
    score: 4.5,
    mark: (c) => <AdobeTile letters="Pr" tile="#00005B" text="#9999FF" colored={c} />,
  },
  {
    name: "After Effects",
    score: 4,
    mark: (c) => <AdobeTile letters="Ae" tile="#00005B" text="#9999FF" colored={c} />,
  },
  {
    name: "Illustrator",
    score: 4,
    mark: (c) => <AdobeTile letters="Ai" tile="#330000" text="#FF9A00" colored={c} />,
  },
  {
    name: "Photoshop",
    score: 3,
    mark: (c) => <AdobeTile letters="Ps" tile="#001E36" text="#31A8FF" colored={c} />,
  },
];

type PowerTool = {
  name: string;
  role: Bi;
  mark: (colored: boolean) => ReactNode;
};

const POWER: PowerTool[] = [
  {
    name: "DaVinci Resolve",
    role: { en: "Color grading & finishing", fr: "Étalonnage & finishing" },
    mark: (c) => <ResolveMark colored={c} />,
  },
  {
    name: "Cinema 4D",
    role: { en: "3D & motion design", fr: "3D & motion design" },
    mark: (c) => <CinemaMark colored={c} />,
  },
  {
    name: "Blender",
    role: { en: "3D & simulation", fr: "3D & simulation" },
    mark: (c) => <BlenderMark colored={c} />,
  },
];

/* ————— The timeline ————— */

/**
 * The toolkit as an edit timeline: a frame ruler, one track per tool, clip
 * length = proficiency. A master playhead sweeps once when scrolled into
 * view; clips wipe in behind it and park at their score with a keyframe.
 */
export default function Toolkit() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);
  const run = inView && !reduced;

  return (
    <div ref={ref} className="mt-16">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-t-2 border-ink pt-4">
        <h3 className="font-mono text-[11px] uppercase tracking-widest text-klein">
          {t({ en: "Technical toolkit", fr: "Boîte à outils" })}
        </h3>
        <p className="font-mono text-[10px] tracking-widest text-stone">
          {t({ en: "PROFICIENCY, 0–5", fr: "MAÎTRISE, 0–5" })}
        </p>
      </div>

      {/* Ruler */}
      <div className="relative mt-4" aria-hidden>
        <div className="flex justify-between border-b-2 border-ink pb-1 font-mono text-[9px] tracking-widest text-stone">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <span key={n}>{String(n).padStart(2, "0")}:00</span>
          ))}
        </div>
      </div>

      {/* Tracks + master playhead */}
      <div className="relative">
        {!reduced && (
          <motion.div
            className="pointer-events-none absolute top-0 bottom-0 z-10 w-[2px] bg-signal"
            style={{ marginLeft: "-1px" }}
            initial={{ left: "0%", opacity: 0 }}
            animate={
              run
                ? { left: ["0%", "100%", "100%"], opacity: [1, 1, 0] }
                : undefined
            }
            transition={{
              duration: SWEEP_S + 0.35,
              times: [0, SWEEP_S / (SWEEP_S + 0.35), 1],
              ease: "linear",
            }}
            aria-hidden
          >
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-signal" />
          </motion.div>
        )}

        <ul>
          {CORE.map((tool) => {
            const pct = (tool.score / 5) * 100;
            const arrive = (SWEEP_S * pct) / 100;
            return (
              <li
                key={tool.name}
                className="border-b border-ink/15 py-3"
                onMouseEnter={() => setHovered(tool.name)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(tool.name)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                aria-label={`${tool.name}: ${tool.score} / 5`}
              >
                <div className="mb-2 flex items-center gap-3 text-ink">
                  {tool.mark(hovered === tool.name)}
                  <span className="font-mono text-[11px] uppercase tracking-widest">
                    {tool.name}
                  </span>
                  <motion.span
                    className="ml-auto font-mono text-[11px] tracking-wider text-stone"
                    initial={reduced ? undefined : { opacity: 0 }}
                    animate={run ? { opacity: 1 } : undefined}
                    transition={{ delay: arrive, duration: 0.25 }}
                  >
                    {tool.score.toFixed(1)} / 5.0
                  </motion.span>
                </div>
                <div className="relative h-7 bg-ink/[0.07]" aria-hidden>
                  <motion.div
                    className="absolute inset-y-1 left-0 bg-ink"
                    initial={reduced ? { width: `${pct}%` } : { width: 0 }}
                    animate={run || reduced ? { width: `${pct}%` } : undefined}
                    transition={{
                      duration: reduced ? 0 : arrive,
                      ease: "linear",
                    }}
                  />
                  {/* Keyframe diamond parked at the score */}
                  <motion.span
                    className="absolute top-1/2 z-10 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-signal"
                    style={{ left: `${pct}%` }}
                    initial={reduced ? undefined : { opacity: 0, scale: 0.4 }}
                    animate={run ? { opacity: 1, scale: 1 } : undefined}
                    transition={{ delay: arrive, duration: 0.2 }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Power tools — the finishing rack, no meters */}
      <div className="mt-8">
        <h3 className="font-mono text-[11px] uppercase tracking-widest text-klein">
          {t({ en: "Power tools", fr: "Outils avancés" })}
        </h3>
        <ul className="mt-4 grid gap-6 sm:grid-cols-3">
          {POWER.map((tool) => (
            <li
              key={tool.name}
              className="flex items-center gap-3 border-t-2 border-ink pt-4 text-ink"
              onMouseEnter={() => setHovered(tool.name)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(tool.name)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
            >
              {tool.mark(hovered === tool.name)}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest">
                  {tool.name}
                </p>
                <p className="mt-0.5 font-mono text-[10px] tracking-wider text-stone">
                  {t(tool.role)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
