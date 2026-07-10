import type { Bi } from "@/lib/i18n";
import manifest from "./media-manifest.json";

export type WorkKind = "animation" | "reel";

export type Work = {
  /** Google Drive file id — also the key for posters/previews/full renders. */
  id: string;
  file: string;
  title: Bi;
  tag: Bi;
  client: string;
  kind: WorkKind;
  year: number;
  /** Curated into HIGHLIGHTS; everything else lands in the ARCHIVE sheet. */
  featured?: boolean;
  /** Genre line shown on highlight cards. */
  genre?: Bi;
  /** One-paragraph story shown on highlight cards. */
  description?: Bi;
  /** Drive has download disabled — no local media until the original is dropped in. */
  locked?: boolean;
};

type MediaInfo = { duration: number; width: number; height: number };
const media = manifest as Record<string, MediaInfo>;

/** Local media presence + metadata, baked by scripts/build-previews.mjs. */
export const mediaInfo = (id: string): MediaInfo | undefined => media[id];
export const hasLocalMedia = (id: string) => id in media;

export const posterSrc = (id: string) => `/posters/${id}.jpg`;
export const previewSrc = (id: string) => `/previews/${id}.mp4`;
export const fullSrc = (id: string) => `/full/${id}.mp4`;
export const drivePreview = (id: string) =>
  `https://drive.google.com/file/d/${id}/preview`;

export const timecode = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const f = Math.round((seconds % 1) * 24);
  return `00:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
};

export const works: Work[] = [
  // ——— Highlights: four commissions, four disciplines ———
  {
    id: "1oyaKKepkA1N5txZu0-1QYt6kyqFfj8hU",
    file: "TEASERADC.mp4",
    title: { en: "Algeria Data Cup 4.0 — The Teaser", fr: "Algeria Data Cup 4.0 — Le teaser" },
    tag: { en: "Teaser", fr: "Teaser" },
    genre: { en: "Movie-grade trailer", fr: "Bande-annonce ciné" },
    description: {
      en: "Commissioned by IEC in April 2025 to announce Algeria Data Cup 4.0 — the first datathon in Algiers. Cut like a film trailer: tension, reveals, and a title card that lands.",
      fr: "Commandé par l’IEC en avril 2025 pour annoncer l’Algeria Data Cup 4.0 — le premier datathon d’Alger. Monté comme une bande-annonce de film : tension, révélations, et un titre qui claque.",
    },
    client: "IEC",
    kind: "reel",
    year: 2025,
    featured: true,
    locked: true,
  },
  {
    id: "1i2VLPioocVwyMNMEQUbMRngJtjc0R8S_",
    file: "gamecraft-highlights.mp4",
    title: { en: "Gamecraft — The Highlights", fr: "Gamecraft — Les highlights" },
    tag: { en: "Event highlights", fr: "Highlights d’événement" },
    genre: { en: "Event highlights", fr: "Highlights d’événement" },
    description: {
      en: "Five days, one space-time theme. Made for VIC to spotlight what participants built during the Gamecraft game jam.",
      fr: "Cinq jours, un thème espace-temps. Réalisé pour VIC pour mettre en avant le travail des participants du game jam Gamecraft.",
    },
    client: "VIC",
    kind: "reel",
    year: 2025,
    featured: true,
  },
  {
    id: "1jXiPxgTN4WyWnPjo6auCbfbxm9kdRJsz",
    file: "Finalintro.mp4",
    title: { en: "AEC — The Vlog Intro", fr: "AEC — L’intro du vlog" },
    tag: { en: "Intro animation", fr: "Animation d’intro" },
    genre: { en: "Intro animation", fr: "Animation d’intro" },
    description: {
      en: "The opening sequence of VIC’s AEC event vlog — a motion intro that sets the pace before the first frame of footage.",
      fr: "La séquence d’ouverture du vlog de l’événement AEC de VIC — une intro motion qui donne le tempo avant la première image.",
    },
    client: "VIC",
    kind: "animation",
    year: 2025,
    featured: true,
    locked: true,
  },
  {
    id: "1Ngi42NR34AObbtBLhXhpCVdVl2gtXa6g",
    file: "CPSP.mp4",
    title: { en: "CPSP — Explained", fr: "CPSP — Expliqué" },
    tag: { en: "Explanatory video", fr: "Vidéo explicative" },
    genre: { en: "Explanatory video", fr: "Vidéo explicative" },
    description: {
      en: "A descriptive piece made for VIC in September 2025 — structure over spectacle, walking viewers through CPSP step by step.",
      fr: "Une vidéo descriptive réalisée pour VIC en septembre 2025 — la structure avant le spectacle, pas à pas.",
    },
    client: "VIC",
    kind: "reel",
    year: 2025,
    featured: true,
  },

  // ——— Archive ———
  {
    id: "1iARa7W4Z5ECG8u4AU0EbQ0A_x8wgE6YS",
    file: "ieee2024recap.mp4",
    title: { en: "IEEE 2024, One Year in Four Minutes", fr: "IEEE 2024, un an en quatre minutes" },
    tag: { en: "Year recap", fr: "Rétrospective" },
    client: "IEEE ENP",
    kind: "reel",
    year: 2024,
  },
  {
    id: "1rsCJApST6RjbNtqi8qpZnpq7_oErEXWA",
    file: "iectalks.mp4",
    title: { en: "IEC Talks, Title Sequence", fr: "IEC Talks, générique" },
    tag: { en: "Event opener", fr: "Générique d’événement" },
    client: "IEC",
    kind: "animation",
    year: 2025,
  },
  {
    id: "1Nnrk8dunuW3ct7HDCTMHzsPG0PNZChwM",
    file: "VIC.mp4",
    title: { en: "VIC, Club Ident", fr: "VIC, ident du club" },
    tag: { en: "Ident", fr: "Ident" },
    client: "VIC",
    kind: "animation",
    year: 2025,
  },
  {
    id: "1RmmUBAUVAKjME8tZGx7fZWYg-PGBAgW0",
    file: "ADC_logo.mp4",
    title: { en: "Algeria Data Cup, Logo Reveal", fr: "Algeria Data Cup, révélation du logo" },
    tag: { en: "Logo animation", fr: "Animation de logo" },
    client: "IEC",
    kind: "animation",
    year: 2025,
  },
  {
    id: "1QByWpQmHBhodw_zMFISuaA-UvUmcyKqk",
    file: "gala-reminder.mp4",
    title: { en: "Engineers’ Gala, the Call", fr: "Gala des ingénieurs, l’appel" },
    tag: { en: "Event promo", fr: "Promo d’événement" },
    client: "ENP",
    kind: "reel",
    year: 2025,
  },
  {
    id: "1gen6vI5vdYjcf3qepVOc1IJ0oM7w05DR",
    file: "ieee-recrutement.mp4",
    title: { en: "IEEE Recruitment Drive", fr: "Campagne de recrutement IEEE" },
    tag: { en: "Campaign", fr: "Campagne" },
    client: "IEEE ENP",
    kind: "reel",
    year: 2024,
  },
  {
    id: "19HZqKhymI-xL_TtCmsyUW5FdXFi4ZmYX",
    file: "GazoChat-v2.mp4",
    title: { en: "GazoChat", fr: "GazoChat" },
    tag: { en: "Product promo", fr: "Promo produit" },
    client: "GazoChat",
    kind: "reel",
    year: 2025,
  },
  {
    id: "1daKvD943ToeIi3DD4TGKk7AFtGfLvBpw",
    file: "charity-sortie.mp4",
    title: { en: "Charity Outing", fr: "Sortie caritative" },
    tag: { en: "Recap", fr: "Récap" },
    client: "VIC",
    kind: "reel",
    year: 2025,
  },
  {
    id: "1Cg9-KqCjf6G-IXHKAEXB00_Xjx9df10M",
    file: "sortie-tibhirine.mp4",
    title: { en: "Tibhirine Outing", fr: "Sortie Tibhirine" },
    tag: { en: "Recap", fr: "Récap" },
    client: "VIC",
    kind: "reel",
    year: 2025,
  },
  {
    id: "1TeDrHKTg0Vh2j_3Nbut8o0x9HohUQ7j8",
    file: "VIC2.mp4",
    title: { en: "VIC, Ident II", fr: "VIC, ident II" },
    tag: { en: "Ident", fr: "Ident" },
    client: "VIC",
    kind: "animation",
    year: 2025,
  },
  {
    id: "1ZCW_EFJ_yRJGbc3LZusWSan8kT_lG4Ne",
    file: "AEC2phases.mp4",
    title: { en: "AEC, Two Phases", fr: "AEC, deux phases" },
    tag: { en: "Event promo", fr: "Promo d’événement" },
    client: "VIC",
    kind: "reel",
    year: 2025,
    locked: true,
  },
  {
    id: "1rR7_hqjcxTeBYBx8LeLMwhWvTO5BnY_h",
    file: "CSTOPOSTADC.mp4",
    title: { en: "Algeria Data Cup, Promo", fr: "Algeria Data Cup, promo" },
    tag: { en: "Event promo", fr: "Promo d’événement" },
    client: "IEC",
    kind: "reel",
    year: 2025,
    locked: true,
  },
  {
    id: "1lvvMkNAmM8h0D6nNSkb_8taPAyX-wkcR",
    file: "Episode6.mp4",
    title: { en: "Episode 6", fr: "Épisode 6" },
    tag: { en: "Series edit", fr: "Montage série" },
    client: "—",
    kind: "reel",
    year: 2025,
    locked: true,
  },
  {
    id: "14Gi_vmyF-ujVtZnOQtLg9diFkBfd8j6l",
    file: "final-reminder-24hrs.mp4",
    title: { en: "24 Hours Left", fr: "Plus que 24 heures" },
    tag: { en: "Countdown", fr: "Compte à rebours" },
    client: "—",
    kind: "reel",
    year: 2025,
    locked: true,
  },
];

export const highlightWorks = works.filter((w) => w.featured);
export const archiveWorks = works.filter((w) => !w.featured);
/** Clips that can hard-cut in the cover montage (need a local preview). */
export const montageWorks = works.filter((w) => hasLocalMedia(w.id));
