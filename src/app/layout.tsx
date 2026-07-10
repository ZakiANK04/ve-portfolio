import type { Metadata } from "next";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZAKI — Video Editor & Motion Designer",
  description:
    "Ahcene Zakaria Aouanouk edits event films, idents and campaigns for IEEE, VIC, IEC, ADC and more. The Motion Issue — Algiers, 2026.",
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
