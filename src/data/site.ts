import type { Bi } from "@/lib/i18n";

export const profile = {
  name: "Ahcene Zakaria Aouanouk",
  masthead: "ZAKI",
  email: "zzaouanouk@gmail.com",
  location: { en: "Algiers, Algeria", fr: "Alger, Algérie" } as Bi,
  role: {
    en: "Video editor & motion designer",
    fr: "Monteur vidéo & motion designer",
  } as Bi,
  linkedin:
    "https://www.linkedin.com/in/ahcene-zakaria-aouanouk-1126902b7/",
  instagram: "https://www.instagram.com/zaki_ank/",
  instagramHandle: "@zaki_ank",
  github: "https://github.com/ZakiANK04",
  githubHandle: "ZakiANK04",
  cv: { en: "/cv/CV_Aouanouk_EN.pdf", fr: "/cv/CV_Aouanouk_FR.pdf" },
};

export type Section = { id: string; label: Bi };

/** Sections in scroll order. */
export const sections: Section[] = [
  { id: "hero", label: { en: "Top", fr: "Haut" } },
  { id: "work", label: { en: "Portfolio", fr: "Portfolio" } },
  { id: "archive", label: { en: "Archive", fr: "Archives" } },
  { id: "about", label: { en: "About", fr: "À propos" } },
  { id: "credits", label: { en: "Credits", fr: "Crédits" } },
  { id: "contact", label: { en: "Contact", fr: "Contact" } },
];

/** The kinetic intro, line by line. Always English — it plays before any toggle. */
export const introLines = ["HELLO!", "I’M AOUANOUK ZAKARIA", "OR JUST CALL ME ZAKI"];

/** The hero's stacked titles. */
export const heroTitles: { text: Bi; rule: "after" | "before" | "none" }[] = [
  { text: { en: "Video Editor", fr: "Monteur Vidéo" }, rule: "after" },
  { text: { en: "Motion Designer", fr: "Motion Designer" }, rule: "none" },
  { text: { en: "Storyteller", fr: "Conteur" }, rule: "before" },
];

/** The contact finale statement, set huge over black. */
export const statement: Bi = {
  en: "Video editor & motion designer based in Algiers — cutting films, idents and campaigns for IEEE, VIC, IEC & ADC.",
  fr: "Monteur vidéo & motion designer basé à Alger — films, idents et campagnes pour IEEE, VIC, IEC & ADC.",
};

export const workTogether: Bi = {
  en: "LET’S WORK TOGETHER!",
  fr: "TRAVAILLONS ENSEMBLE !",
};

export type Partner = {
  key: string;
  name: string;
  logo: string;
  role: Bi;
};

export const partners: Partner[] = [
  {
    key: "ieee",
    name: "IEEE ENP",
    logo: "/partners/ieee.jpeg",
    role: { en: "Recaps, campaigns, highlights", fr: "Récaps, campagnes, highlights" },
  },
  {
    key: "vic",
    name: "VIC",
    logo: "/partners/vic.jpeg",
    role: { en: "Idents & outing films", fr: "Idents & films de sorties" },
  },
  {
    key: "iec",
    name: "IEC",
    logo: "/partners/iec.png",
    role: { en: "Title sequences & talks", fr: "Génériques & conférences" },
  },
  {
    key: "kabas",
    name: "KABAS",
    logo: "/partners/kabas.jpeg",
    role: { en: "Brand & promo edits", fr: "Montages promo & marque" },
  },
  {
    key: "916",
    name: "916",
    logo: "/partners/916.png",
    role: { en: "Collaborations", fr: "Collaborations" },
  },
];

/** Interview-style bio — rewritten from Zaki's own reflections. */
export const interview: { q: Bi; a: Bi }[] = [
  {
    q: { en: "How did this start?", fr: "Comment ça a commencé ?" },
    a: {
      en: "With a deadline nobody else wanted. A club event needed a video, someone asked around, and I said yes before I really knew what I was doing. The edit worked, the next event asked for a bigger one — and somewhere between IEEE recaps and VIC game jams, while studying Data Science & AI at ENP Algiers, cutting stopped being a favor and became the craft I take most seriously.",
      fr: "Par une deadline dont personne ne voulait. Un événement de club avait besoin d’une vidéo, on a demandé autour, et j’ai dit oui avant de vraiment savoir ce que je faisais. Le montage a marché, l’événement suivant en a demandé un plus grand — et quelque part entre les récaps IEEE et les game jams VIC, tout en étudiant la Data Science & IA à l’ENP d’Alger, monter a cessé d’être un coup de main pour devenir le métier que je prends le plus au sérieux.",
    },
  },
  {
    q: { en: "What are you chasing in an edit?", fr: "Que cherches-tu dans un montage ?" },
    a: {
      en: "Two things. The cut you never notice — when the film flows so naturally the editing disappears. And the one you feel: that frame-perfect moment when the picture lands exactly on the beat. Invisible craft, audible impact. If a viewer rewinds to see how I did it, I’ve already lost; if they rewind because it hit, that’s the job.",
      fr: "Deux choses. Le cut qu’on ne remarque jamais — quand le film coule si naturellement que le montage disparaît. Et celui qu’on ressent : cette image posée à la frame près sur le temps fort. Un artisanat invisible, un impact qui s’entend. Si le spectateur revient en arrière pour comprendre la technique, j’ai déjà perdu ; s’il revient parce que ça l’a touché, c’est gagné.",
    },
  },
  {
    q: { en: "What do clients get — and what’s next?", fr: "Qu’obtiennent les clients — et la suite ?" },
    a: {
      en: "Hand me a messy folder of rushes and a brutal deadline — that’s home ground. People come back for three things: the story I find in their footage, the speed it ships at, and the fact that they always know where the project stands. Next: a studio or agency floor, bigger productions, a team to cut with.",
      fr: "Donnez-moi un dossier de rushes en vrac et une deadline brutale — c’est mon terrain. On revient vers moi pour trois choses : l’histoire que je trouve dans les images, la vitesse de livraison, et le fait de toujours savoir où en est le projet. La suite : un studio ou une agence, des productions plus ambitieuses, une équipe avec qui monter.",
    },
  },
];

export const pullQuote: Bi = {
  en: "The best cut is the one you never see. The best edit is the one you feel.",
  fr: "Le meilleur cut est celui qu’on ne voit pas. Le meilleur montage, celui qu’on ressent.",
};

