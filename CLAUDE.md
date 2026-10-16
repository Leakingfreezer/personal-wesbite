# CLAUDE.md — engineering rules for this portfolio

Irene's personal portfolio. Irene maintains this code herself and is learning from it —
**clarity beats cleverness** in every decision.

The full project brief (sections, phases, acceptance criteria) is in `docs/BRIEF.md`;
the wireframe is `docs/wireframe.png`. Work phase by phase and ask for approval after each.

## Stack
React 19 + TypeScript (strict) · Vite · Tailwind CSS v4 · React Router v7 (data router) ·
Sanity (headless CMS, Studio lives in `studio/`) · Motion for React (sparingly) · Lucide icons.
Deployed on Vercel as an SPA (`vercel.json` rewrites all paths to `index.html`).

Do not add frameworks, state libraries, UI kits, or databases without asking first,
and explain what any new dependency does before installing it.

## Where things live (one place per concern)
| Concern | Location |
|---|---|
| Colours, fonts, type scale, radii | `src/styles/globals.css` (`@theme` tokens) |
| Site copy, email, nav links, fixed image paths | `src/data/site.ts` |
| Project data types | `src/types/project.ts` |
| Fetching projects (Sanity or mock fallback) | `src/lib/projects.ts` |
| GROQ queries | `src/lib/sanity/queries.ts` |
| Card size → grid span mapping | `src/components/projects/gridVariants.ts` |
| Past Work grid items (projects + record player) types | `src/types/gallery.ts` |
| Record player widget | `src/components/widgets/` (mock data: `src/data/mockWidgets.ts`) |
| Tech stack reel (About) | `src/components/about/TechStackReel.tsx` · type `src/types/techStack.ts` · data: Sanity "Tech stack" (mock: `src/data/mockTechStack.ts`) · logos `public/assets/tech/` |
| Routes | `src/router.tsx` |
| Sanity schemas | `studio/schemaTypes/` |

## Rules
- **Content never lives in JSX.** Copy → `site.ts`. Projects → Sanity (mock data in `src/data/mockProjects.ts`).
- **Visual components never fetch.** Data is loaded by route loaders via `src/lib/projects.ts` and passed down as typed props.
- **One component, one job.** Sections compose smaller components; no giant multi-section files.
- **Use tokens, not raw values.** No hex codes or px font sizes in components — add a token in `globals.css` instead.
- **Types for everything.** No `any`. Props get an explicit interface/type.
- **Prefer native behaviour.** Anchors (`<a href="/#work">` / `<Link>`), CSS for hover/transition; Motion only where CSS can't do it cleanly.
- **Respect reduced motion** for every animation and smooth scroll.
- **Accessibility:** semantic HTML, one `h1` per page, visible focus states, real alt text, links for navigation / buttons for actions.
- **Never commit secrets.** Only `VITE_SANITY_PROJECT_ID` / `VITE_SANITY_DATASET` (public, read-only) go in env vars. No write tokens in the frontend.
- **Public routes show published content only** (Sanity `perspective: 'published'`).
- Don't recreate Irene's 3D artwork with CSS/emoji — use her exported assets or labeled placeholders.

## Design rules (Irene's decisions — keep them true in every change)
### Record player (`src/components/widgets/` — AudioPlayerWidget, RecordDisc)
Reference: Irene's Pinterest pin https://ca.pinterest.com/pin/677651075230542080/ ("Highest in the Room" player),
restyled to Irene's grey design: a grainy grey card (`bg-player bg-grain`) and a grey record.
- **Fits around its record.** At rest the vinyl is always the card's full width, centred on the card's
  top edge (lower half visible), never shrunk and never cropped by the card's bottom. The card's height comes
  from the record (half the record + the text below); the grid row grows to fit. Never shrink the record
  to fit a fixed card height.
- **Always a third of its row** (`medium`, 8 of 24 columns). No "Card size" choice in Studio;
  `src/lib/sanity/mappers.ts` fixes it to `medium`. Pair it with a `wide` project.
- **Looks like vinyl.** Album cover (if any) fills the whole disc; the metal centre hub (30.5% of the disc,
  from Figma — slate ring with a white rim, sunken label, raised cap) sits on top of it while it's a record.
  Keep the small shadows: the record's soft shadow on the card, the hub's rim + shadow, the sunken label,
  the pressed-in play button (`--shadow-record`, `--shadow-hub*`, `--shadow-player-button`).
- **Play / pause:** click the round button (the real `<button>`; keyboard: Tab + Enter/Space) or anywhere on
  the card. The button shows ▶ paused, ❚❚ playing.
- **Spins like a vinyl — nothing else moves.** While playing, the record (cover and hub together) spins one
  turn per 6s (`--animate-record-spin`); paused, it stops where it is. No cover drop-down, no hover reveal.
- **Smooth, not choppy:** the spin is a CSS animation (rotate only), and the record uses a box-shadow on a
  still layer (so the shadow doesn't spin), not a drop-shadow filter.
- **Under the record, centred:** artist (small, grey) · song title (bold) · round play/pause button.
- **Reduced motion:** no spin, no grow animation (states still change, just instantly).

## When asked to change something
1. Find the one file responsible (table above).
2. Make the smallest change that does it; don't touch unrelated files.
3. Replacing an image = change the asset reference only.
4. Styling change = don't touch content data or queries.
5. New project = a new Sanity entry, never a new page component.
6. Briefly explain the change and where future edits of that kind belong.
7. Ask before making major design decisions.

## Commands
- `npm run dev` — local dev server
- `npm run typecheck` — TypeScript check
- `npm run build` — typecheck + production build (run before declaring work done)
