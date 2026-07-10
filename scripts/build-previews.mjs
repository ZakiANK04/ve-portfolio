/**
 * For every original present in media/originals/, emits:
 *   public/previews/{id}.mp4  — ~4 s muted hover loop, 540 px, target < 1 MB
 *   public/posters/{id}.jpg   — poster frame from 25% into the clip
 *   public/full/{id}.mp4      — compressed full cut for the lightbox (≤1280 px long side)
 * Skips outputs that already exist unless --force is passed.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { catalogue } from "./catalogue.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const ORIGINALS = path.join(ROOT, "media", "originals");
const PREVIEWS = path.join(ROOT, "public", "previews");
const POSTERS = path.join(ROOT, "public", "posters");
const FULL = path.join(ROOT, "public", "full");
const force = process.argv.includes("--force");

const ffprobe = (file) => {
  const out = execFileSync("ffprobe", [
    "-v", "error",
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height:format=duration",
    "-of", "json",
    file,
  ]).toString();
  const data = JSON.parse(out);
  return {
    duration: parseFloat(data.format.duration),
    width: data.streams[0].width,
    height: data.streams[0].height,
  };
};

const ffmpeg = (args) =>
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args]);

await Promise.all([PREVIEWS, POSTERS, FULL].map((d) => mkdir(d, { recursive: true })));

const manifest = {};
let done = 0;
for (const { id, file } of catalogue) {
  const src = path.join(ORIGINALS, file);
  if (!existsSync(src)) {
    console.log(`skip (no original)   ${file}`);
    continue;
  }
  const { duration, width, height } = ffprobe(src);
  const start = Math.max(0, duration * 0.25);
  const poster = path.join(POSTERS, `${id}.jpg`);
  const preview = path.join(PREVIEWS, `${id}.mp4`);
  const full = path.join(FULL, `${id}.mp4`);

  if (force || !existsSync(poster)) {
    ffmpeg(["-ss", `${start}`, "-i", src, "-frames:v", "1",
      "-vf", "scale=w=1280:h=1280:force_original_aspect_ratio=decrease:force_divisible_by=2",
      "-q:v", "3", poster]);
  }
  if (force || !existsSync(preview)) {
    ffmpeg(["-ss", `${start}`, "-t", `${Math.min(4, duration)}`, "-i", src,
      "-vf", "scale=w=540:h=540:force_original_aspect_ratio=decrease:force_divisible_by=2,fps=24",
      "-an", "-c:v", "libx264", "-crf", "28", "-preset", "slow",
      "-movflags", "+faststart", preview]);
  }
  if (force || !existsSync(full)) {
    ffmpeg(["-i", src,
      "-vf", "scale=w=1280:h=1280:force_original_aspect_ratio=decrease:force_divisible_by=2",
      "-c:v", "libx264", "-crf", "25", "-preset", "medium",
      "-c:a", "aac", "-b:a", "128k",
      "-movflags", "+faststart", full]);
  }
  manifest[id] = { duration: Math.round(duration * 10) / 10, width, height };
  done++;
  console.log(`ok                   ${file} (${duration.toFixed(1)}s)`);
}

await writeFile(
  path.join(ROOT, "src", "data", "media-manifest.json"),
  JSON.stringify(manifest, null, 2),
);
console.log(`\n${done}/${catalogue.length} works processed; manifest written.`);
