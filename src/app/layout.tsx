import type { Metadata } from "next";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

const DESCRIPTION =
  "Ahcene Zakaria Aouanouk edits event films, idents and campaigns for IEEE, VIC, IEC, ADC and more. The Motion Issue — Algiers, 2026.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ve-portfolio-delta.vercel.app"),
  title: "ZAKI — Video Editor & Motion Designer",
  description: DESCRIPTION,
  openGraph: {
    title: "ZAKI — Video Editor & Motion Designer",
    description: DESCRIPTION,
    url: "/",
    siteName: "The Motion Issue",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZAKI — Video Editor & Motion Designer",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
