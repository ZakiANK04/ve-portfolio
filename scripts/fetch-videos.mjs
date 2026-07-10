/**
 * Downloads the portfolio's source videos from Google Drive into media/originals/.
 * Files Drive refuses to serve (download disabled) are reported at the end so
 * they can be dropped in manually — the rest of the pipeline picks up anything
 * present in media/originals/ regardless of how it got there.
 */
import { createWriteStream, existsSync, statSync, unlinkSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { catalogue } from "./catalogue.mjs";

const OUT_DIR = path.resolve(import.meta.dirname, "..", "media", "originals");

const downloadUrl = (id) =>
  `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`;

async function fetchOne({ id, file }) {
  const dest = path.join(OUT_DIR, file);
  if (existsSync(dest) && statSync(dest).size > 0) {
    return { file, status: "already-present" };
  }
  const res = await fetch(downloadUrl(id), { redirect: "follow" });
  const type = res.headers.get("content-type") ?? "";
  if (!res.ok || type.includes("text/html")) {
    return { file, status: "blocked" };
  }
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  const size = statSync(dest).size;
  if (size < 10_000) {
    unlinkSync(dest); // an error stub, not a video
    return { file, status: "blocked" };
  }
  return { file, status: "downloaded", mb: (size / 1e6).toFixed(1) };
}

await mkdir(OUT_DIR, { recursive: true });
const results = [];
for (const entry of catalogue) {
  try {
    const r = await fetchOne(entry);
    results.push(r);
    console.log(`${r.status.padEnd(16)} ${r.file}${r.mb ? ` (${r.mb} MB)` : ""}`);
  } catch (err) {
    results.push({ file: entry.file, status: "error" });
    console.log(`error            ${entry.file}: ${err.message}`);
  }
}

const missing = results.filter((r) => r.status === "blocked" || r.status === "error");
console.log(`\n${results.length - missing.length}/${catalogue.length} available locally.`);
if (missing.length) {
  console.log("Missing (drop the original files into media/originals/):");
  for (const m of missing) console.log(`  - ${m.file}`);
}
