"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ArchiveGrid from "@/components/ArchiveGrid";
import ContactFinale from "@/components/ContactFinale";
import CornerChrome from "@/components/CornerChrome";
import CreditsMasthead from "@/components/CreditsMasthead";
import KineticHero from "@/components/KineticHero";
import Highlights from "@/components/Highlights";
import Lightbox from "@/components/Lightbox";
import Preloader, { useIntroGate } from "@/components/Preloader";
import ProfileSection from "@/components/ProfileSection";
import type { Work } from "@/data/works";

export default function Home() {
  const [screening, setScreening] = useState<Work | null>(null);
  const { showIntro, introPending, dismiss } = useIntroGate();
  const introDone = !introPending;

  return (
    <>
      <AnimatePresence>
        {showIntro && <Preloader playing onDone={dismiss} />}
      </AnimatePresence>
      <CornerChrome introDone={introDone} />
      <main>
        <KineticHero introDone={introDone} />
        <Highlights onOpen={setScreening} />
        <ArchiveGrid onOpen={setScreening} />
        <ProfileSection />
        <CreditsMasthead />
        <ContactFinale />
      </main>
      <Lightbox work={screening} onClose={() => setScreening(null)} />
    </>
  );
}
