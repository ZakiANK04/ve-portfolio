import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "ZAKI — Video Editor & Motion Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social card, generated at build — the site's hero recomposed at OG
 * proportions: near-black screen, Clash Display titles with klein/ink rules,
 * mono colophon. Uses the real self-hosted faces (converted to TTF for Satori).
 */
export default async function Image() {
  const fontDir = join(process.cwd(), "public", "fonts");
  const [clash, mono] = await Promise.all([
    readFile(join(fontDir, "clash-display-700.ttf")),
    readFile(join(fontDir, "fragment-mono-400.ttf")),
  ]);

  const title = {
    fontFamily: "Clash",
    fontSize: 86,
    lineHeight: 1,
    letterSpacing: 2,
    whiteSpace: "nowrap" as const,
  };
  const rule = (color: string) => (
    <div style={{ display: "flex", flex: 1, height: 4, background: color }} />
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0B",
          color: "#F4F4F5",
          padding: "58px 66px",
          fontFamily: "Clash",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ fontFamily: "Clash", fontSize: 40, letterSpacing: -1 }}>
            ZAKI
          </div>
          <div
            style={{
              fontFamily: "Mono",
              fontSize: 17,
              letterSpacing: 4,
              color: "#8E887A",
            }}
          >
            THE MOTION ISSUE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <span style={title}>VIDEO EDITOR</span>
            {rule("#2C46FF")}
          </div>
          <div style={{ display: "flex" }}>
            <span style={title}>MOTION DESIGNER</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            {rule("#F4F4F5")}
            <span style={title}>STORYTELLER</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "Mono",
            fontSize: 18,
            letterSpacing: 2,
            color: "#8E887A",
          }}
        >
          <div style={{ display: "flex" }}>AOUANOUK AHCENE ZAKARIA — ALGIERS</div>
          <div style={{ display: "flex", color: "#F4F4F5" }}>
            ve-portfolio-delta.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Clash", data: clash, weight: 700, style: "normal" },
        { name: "Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
