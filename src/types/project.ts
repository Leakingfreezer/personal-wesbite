/**
 * The shape of project data used everywhere in the React app.
 * Sanity results and mock data are both converted into these types
 * (in src/lib/projects.ts), so components never care where data came from.
 */
import type { PortableTextBlock } from '@portabletext/react'

/** Card size options shown in Sanity Studio. Spans are defined in projects/gridVariants.ts. */
export type CardSize = 'small' | 'medium' | 'large' | 'wide'

export interface ProjectImage {
  /** Absolute URL — a Sanity CDN URL or a local /assets path. */
  url: string
  /** Optional list of sizes ("url 800w, url 1600w") so the browser can pick the smallest sharp one. */
  srcSet?: string
  alt: string
  width?: number
  height?: number
}

/** Everything the Past Work grid needs to render one card. */
export interface ProjectSummary {
  slug: string
  title: string
  shortDescription: string
  category: string
  /** Optional short label on the Past Work card, e.g. "Scale" (picked or typed in Studio). */
  headline?: string
  year: number
  cardSize: CardSize
  order: number
  featured: boolean
  /** True while the case study isn't ready: the card isn't clickable and shows "Coming soon" on hover. */
  comingSoon?: boolean
  /** Optional: a light-gray placeholder is shown when missing. */
  thumbnail?: ProjectImage
}

export interface ExternalLink {
  label: string
  url: string
}

/* ── Case-study content blocks ────────────────────────────────────────────
 * A case study's `body` is Portable Text (Sanity's rich-text format): normal text blocks
 * (headings, paragraphs, lists, links) mixed with the custom blocks below.
 * Each custom block is drawn by its own component in src/components/case-study/blocks/.
 * Images are optional so a half-finished case study shows a placeholder instead of breaking.
 */

/** One large image with an optional caption. */
export interface ImageBlock {
  _type: 'imageBlock'
  _key: string
  image?: ProjectImage
  caption?: string
}

/** Two or more images side by side. */
export interface GalleryBlock {
  _type: 'gallery'
  _key: string
  images: (ProjectImage | undefined)[]
  caption?: string
}

/** A row of key numbers, e.g. "40%" / "faster onboarding". */
export interface MetricsBlock {
  _type: 'metrics'
  _key: string
  items: { value: string; label: string }[]
}

/** A pulled-out quote. */
export interface QuoteBlock {
  _type: 'quote'
  _key: string
  text: string
  attribution?: string
}

export type CaseStudyBlock = PortableTextBlock | ImageBlock | GalleryBlock | MetricsBlock | QuoteBlock

/** Full case-study data for /work/:slug. */
export interface Project extends ProjectSummary {
  role: string
  timeline?: string
  tools: string[]
  overview: string
  heroImage?: ProjectImage
  links?: ExternalLink[]
  /** Flexible case-study content. Any number of sections, in any order. */
  body?: CaseStudyBlock[]
}
