# Irene D. — Portfolio

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS and Sanity.

> 🚧 In progress. Sections marked _(Phase N)_ are filled in as each phase is built.

## 1. Install

Requires Node 20+ (developed on Node 22).

```bash
npm install
```

## 2. Run locally

```bash
npm run dev        # http://localhost:5173
npm run typecheck  # TypeScript only
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build locally
```

## 3. Change the hero image
The hero is a base image (the star tin) plus sticker layers, all set in `src/data/hero.ts`.
- **New tin image:** put it in `public/assets/hero/` and change `base.src` and `alt`.
- **One flattened image instead:** change `base.src`, set `layers: []` and delete `knob`.
- **Move or replace a sticker:** edit its entry in `layers`. Positions are % of the tin's box.

The nav logo star is `site.logo` in `src/data/site.ts`.

## 4. Edit the About content
All text is in `src/data/site.ts` under `about`.
The overlapping photo cards are set in `src/data/about.ts`: put a photo in `public/assets/about/`,
then set that card's `src` and `alt`. Leave `src` out to show a grey placeholder.

## 5. Change global colours
Edit the `--color-*` tokens in `src/styles/globals.css`. Each token is a Tailwind class
automatically (`--color-charcoal` → `bg-charcoal`, `text-charcoal`).

## 6. Change typography
- Font file: the Google Fonts `<link>` in `index.html`.
- Font family: `--font-sans` in `src/styles/globals.css`.
- Sizes: the `--text-*` tokens in the same file. They use `clamp()` so they scale between mobile and desktop.

## 7. Edit the project card design
- **Card look** (corners, title label, arrow, hover effect): `src/components/projects/ProjectCard.tsx`.
- **Thumbnail rendering** (lazy loading, grey fill when an image is missing): `src/components/projects/ProjectImage.tsx`.

## 8. Change the project grid layout
- **How big each card size is** (`small` / `medium` / `large` / `wide`): `src/components/projects/gridVariants.ts`.
- **Columns and gaps:** `src/components/projects/ProjectGrid.tsx`.
- **Card height:** `--spacing-grid-row` in `src/styles/globals.css`. It scales with both the
  screen's width and height, so the grid fits a laptop screen and shrinks with the window.

On tablet and desktop the grid has 24 columns:
- `small` is ⅜ of the width × 1 row.
- `medium` is ⅓ of the width × 1.5 rows (the record player).
- `large` is ⅝ of the width × 2 rows.
- `wide` is ⅔ of the width × 1.5 rows.

So pair a `large` card with two `small` items, and a `wide` card with a `medium` one.
On phones each card stacks in one column with its own shape.
Each project picks its size and position with `cardSize` and `order`. Until Sanity is connected,
these come from `src/data/mockProjects.ts`.

### Mini widgets in the grid
The grid also holds two widgets. Each one has its own `order` and `cardSize`, so it slots in between projects.
They move to Sanity in Phase 6; until then, edit `src/data/mockWidgets.ts`.
- **Tech-stack folder** (`src/components/widgets/TechStackFolder.tsx`): on hover, or when the arrow is tapped,
  the tool logos rise out of the folder. Edit the `tools` list. Logos live in `public/assets/tech/`.
- **Record player** (`src/components/widgets/`): click the card to play or pause.
  While it plays, the record spins, the equalizer bounces, and the bar and time count up.
  Hovering turns the record upright and grows it to show the full album cover.
  - Song, artist, mp3 and cover are set in Studio, under **Record player**.
  - The plain record artwork is `public/assets/widgets/record.svg`.
  - How it behaves is written down as design rules in `CLAUDE.md`.
  - Files: the card is `AudioPlayerWidget.tsx`, the spinning and growing record is `RecordDisc.tsx`,
    and the bouncing bars are `EqualizerIcon.tsx`.

### Case study pages
Every project gets a page at `/work/<slug>` from **one** template, `src/pages/CaseStudyPage.tsx`.
Never make a page component per project.
- **Header** (back link, category · year, title, hero image): `src/components/case-study/CaseStudyHeader.tsx`.
- **Overview** (summary, role, timeline, tools, links): `src/components/case-study/CaseStudyOverview.tsx`.
- **Body text styles** (headings, paragraphs, lists, links): the `components` map in `src/components/case-study/CaseStudyContent.tsx`.
- **Custom blocks** (image, gallery, metrics, quote): one file each in `src/components/case-study/blocks/`.
- **Next project / Back to Work:** `src/components/case-study/NextProject.tsx`.
- **Labels** ("Back to Work", "Next project", …): `site.caseStudy` in `src/data/site.ts`.

An unknown slug shows the "Page not found" screen. Its copy is in `site.notFound`.

### Contact section
- **Text, button label and email subject:** `site.contact` in `src/data/site.ts`.
- **Your email address** (where the button sends people): `site.email` in the same file.
- **The asterisk:** replace `public/assets/illustrations/asterisk.svg`, or point `site.contact.graphic.src` at a new file.
  The layout doesn't change.
- **Button style** (outlined pill, fills dark on hover): `src/components/ui/ButtonLink.tsx`.
- **Layout:** `src/components/sections/Contact.tsx`.

## 9. Configure Sanity
Sanity stores your projects and widgets. The website only reads **published** content, with no password or token.
Sanity Studio (`studio/`) is the editor where you change that content.

**One-time setup** (project `c8y2dgds` already exists):
1. **Settings files.** Both are already filled in, and git ignores both.
   - Website: `.env.local`, with `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET`.
   - Studio: `studio/.env`, with `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`.

   Templates are in `.env.example` and `studio/.env.example`.
2. **Allow the website to read Sanity.** Go to [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **CORS origins** → **Add CORS origin**.
   - Add `http://localhost:5173` with "Allow credentials" **off**.
   - Later, add your Vercel address the same way.
3. **Make the dataset public.** On the same site, go to **Datasets** → `production` → set visibility to **Public**.
   Public means anyone can read *published* content, which is what a public website needs. Drafts stay private.
4. **Install and start Studio:**
   ```bash
   cd studio
   npm install
   npm run dev        # http://localhost:3333 — log in with your Sanity account
   ```
   Studio needs a fair amount of memory on its first start. If it crashes with "memory allocation failed", close some browser tabs or apps and try again.

**Back to mock data:** delete the `VITE_SANITY_PROJECT_ID` line from `.env.local` and restart `npm run dev`.

## 10. Add and publish a project
1. Open Studio (`cd studio && npm run dev`) and choose **Project** → **+** (create).
2. **Basics** tab: fill in the title, then click **Generate** for the URL slug. Add the short description, category, year and your role.
3. **Images** tab: upload a thumbnail (shown on the card) and a hero image (top of the case study). Write alt text for both.
4. **Grid placement** tab: choose a **Card size** and a **Display order**. Projects and widgets share the same order numbers.
5. Click **Publish**. The website shows it within a few seconds, at `/work/<slug>`.

Unpublished changes are saved as a **draft**, which only you can see in Studio.
**Tech stack folder** and **Record player** are edited the same way, and each has a display order.
The folder also has a card size. The record player is always a third of its row.

## 11. Edit a case study
Open the project in Studio → **Case study** tab:
- **Overview:** the summary paragraph at the top.
- **Case study content:** type normally. Use the style menu for **Heading** / **Subheading**, and the toolbar for bullets, bold, italic and links.
  Click **+** to insert an **Image**, **Gallery**, **Key metrics** or **Quote** block. Drag blocks to reorder them.
- **External links:** live site, prototype and so on, listed in the overview.

Click **Publish** when you're done. To change how these blocks *look*, see "Case study pages" above.
## 12. Deploy to Vercel _(Phase 8)_
`vercel.json` already makes direct links like `/work/some-project` work in production.

## Project structure

```text
src/
  components/   UI, split by area (layout, navigation, sections, projects, case-study, ui)
  pages/        One component per route
  data/         site.ts (all copy) and mock projects
  lib/          Data loading (Sanity client, queries, image URLs)
  types/        Shared TypeScript types
  styles/       globals.css: design tokens
studio/         Sanity Studio (separate app, added in Phase 6)
public/assets/  Static images (hero, about, illustrations, placeholders)
```
