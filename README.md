# ZAKI — The Motion Issue

Bold-editorial portfolio for Ahcene Zakaria Aouanouk, video editor & motion
designer. A printed magazine about moving images: paper spreads that turn
cinema-black wherever footage plays. Next.js + Tailwind v4 + Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Video pipeline

Videos never live in git — only small derived files do (`public/previews`,
`public/posters`, `public/full`).

```bash
npm run fetch-videos     # pulls originals from Drive into media/originals/
npm run build-previews   # ffmpeg → posters, 4s hover loops, compressed full cuts
```

Six Drive files have downloads disabled and must be dropped into
`media/originals/` by hand (exact filenames):
`Finalintro.mp4`, `AEC2phases.mp4`, `TEASERADC.mp4`, `CSTOPOSTADC.mp4`,
`Episode6.mp4`, `final-reminder-24hrs.mp4`. Until then they render as slate
cards and play through the Drive embed in the lightbox. After dropping them,
run `npm run build-previews` again.

### Adding a new work

1. Upload to Drive, note the file id.
2. Add an entry to `scripts/catalogue.mjs` and to `src/data/works.ts`
   (bilingual title/tag, client, year, `featured` if it belongs up top).
3. `npm run fetch-videos && npm run build-previews`.

## Content lives in two files

- `src/data/works.ts` — the 18 works, curation flags, captions.
- `src/data/site.ts` — bio interview, cover lines, partners, contact links.

Everything is bilingual (`{ en, fr }`); the header toggle swaps the whole
issue including the CV download.

## Deploy

New Vercel project (keep the old portfolio-zak-dv.vercel.app until ready):

```bash
npx vercel
```
