/**
 * ALL GROQ QUERIES (Sanity's query language) live here, each with the shape it returns.
 * Visual components never query Sanity — src/lib/projects.ts runs these and converts the
 * results (src/lib/sanity/mappers.ts) into the app's own types.
 *
 * Try a query yourself: open Sanity Studio → the "Vision" tab, paste a query, press Fetch.
 * Fields marked required in Studio (studio/schemaTypes/) are non-optional below, because
 * Studio won't let you publish a document without them.
 */

/* ── What an image looks like in a query result ─────────────────────────── */

/** Fields fetched for every image: the asset (with its size), the editor's crop/hotspot, and alt text. */
const image = `{ asset->{ _id, url, metadata { dimensions { width, height } } }, crop, hotspot, alt }`

export interface SanityImage {
  asset?: { _id: string; url: string; metadata?: { dimensions?: { width: number; height: number } } }
  crop?: { top: number; bottom: number; left: number; right: number }
  hotspot?: { x: number; y: number; height: number; width: number }
  alt?: string
}

/* ── Past Work grid: projects + the record player, in display order ────── */

export const galleryQuery = `
*[_type in ["project", "audioWidget"] && defined(order) && (_type == "audioWidget" || defined(cardSize))] | order(order asc) {
  _type, _id, order, cardSize,
  _type == "project" => {
    "slug": slug.current, title, shortDescription, category, headline, customHeadline, year, featured, comingSoon,
    thumbnail ${image}
  },
  _type == "audioWidget" => { artist, songTitle, "audioUrl": audio.asset->url, cover ${image} }
}`

interface SanityGalleryBase {
  _id: string
  order: number
  cardSize: 'small' | 'medium' | 'large' | 'wide'
}

export interface SanityProjectSummary extends SanityGalleryBase {
  _type: 'project'
  slug: string
  title: string
  shortDescription: string
  category: string
  /** A preset word ("Scale"…), or "custom" — then the text is in customHeadline. */
  headline?: string
  customHeadline?: string
  year: number
  featured?: boolean
  comingSoon?: boolean
  thumbnail?: SanityImage
}

export interface SanityAudioWidget extends Omit<SanityGalleryBase, 'cardSize'> {
  _type: 'audioWidget'
  /** Not set in Studio — the record player's size is fixed (see mappers.ts). */
  cardSize?: SanityGalleryBase['cardSize']
  artist: string
  songTitle: string
  audioUrl?: string
  cover?: SanityImage
}

export type SanityGalleryDoc = SanityProjectSummary | SanityAudioWidget

/* ── About section: the tech-stack reel ─────────────────────────────────── */

/** The "Tech stack" document (if you ever publish more than one, the most recently edited wins). */
export const techStackQuery = `
*[_type == "techStackWidget"] | order(_updatedAt desc)[0] {
  prefix, tools[]{ name, logo ${image} }
}`

export interface SanityTechStack {
  prefix: string
  tools?: { name: string; logo?: SanityImage }[]
}

/* ── Project list (used for "Next project" — skips "Coming soon" projects) ── */

export const projectSummariesQuery = `
*[_type == "project" && defined(slug.current) && comingSoon != true] | order(order asc) {
  _type, _id, order, cardSize, "slug": slug.current, title, shortDescription, category, headline, customHeadline, year, featured,
  thumbnail ${image}
}`

/* ── One full case study ─────────────────────────────────────────────────── */

export const projectBySlugQuery = `
*[_type == "project" && slug.current == $slug][0] {
  _type, _id, order, cardSize, "slug": slug.current, title, shortDescription, category, headline, customHeadline, year, featured,
  thumbnail ${image},
  heroImage ${image},
  role, timeline, tools, overview,
  links[]{ label, url },
  body[]{
    ...,
    _type == "imageBlock" => { _type, _key, caption, image ${image} },
    _type == "gallery" => { _type, _key, caption, images[] ${image} }
  }
}`

/** A body item as it comes back from Sanity: plain text blocks, or our custom blocks with raw images. */
export type SanityBodyItem =
  | { _type: 'block'; _key: string; [field: string]: unknown }
  | { _type: 'imageBlock'; _key: string; image?: SanityImage; caption?: string }
  | { _type: 'gallery'; _key: string; images?: SanityImage[]; caption?: string }
  | { _type: 'metrics'; _key: string; items?: { value: string; label: string }[] }
  | { _type: 'quote'; _key: string; text: string; attribution?: string }

export interface SanityProject extends SanityProjectSummary {
  heroImage?: SanityImage
  role: string
  timeline?: string
  tools?: string[]
  overview: string
  links?: { label: string; url: string }[]
  body?: SanityBodyItem[]
}
