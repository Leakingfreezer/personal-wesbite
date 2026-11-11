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
  /** Optional: which part stays visible when the image is cropped (CSS object-position), e.g. 'center 30%'. */
  focus?: string
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

/** A live site, prototype, repo… With `comingSoon`, it shows as plain text with no URL yet. */
export type ExternalLink = { label: string; url: string; comingSoon?: false } | { label: string; comingSoon: true }

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
  /** For wide diagrams with small text: on phones the image keeps a readable size and scrolls sideways. */
  scrollOnPhones?: boolean
}

/** A small section label with a thin line under it ("Problem", "Solution"…). It's the section's h2. */
export interface SectionBlock {
  _type: 'section'
  _key: string
  label: string
}

/** Paragraphs on the left, a small tilted stat card on the right (e.g. a survey figure with its source). */
export interface TextWithNoteBlock {
  _type: 'textWithNote'
  _key: string
  /** Each string is one paragraph; wrap words in ** to make them bold. */
  paragraphs: string[]
  note: {
    /** Optional headline number at the top of the card, e.g. { value: '44%', label: 'skipped social events…' }. */
    stat?: { value: string; label: string }
    /** Optional longer finding, shown smaller under the headline number (or on its own without one). */
    text?: string
    source?: { label: string; url: string }
  }
}

/** One photo slot. Without an image it shows a grey box with `placeholder` written in it. */
export interface PhotoSlot {
  image?: ProjectImage
  placeholder: string
}

/** Designed pieces tucked into a folder: the first three peek out; clicking opens all of them. */
export interface MaterialsFolder {
  /** Heading of the window that opens, e.g. "Program materials". */
  title: string
  /** images[0] sits in the middle of the folder, images[1] left, images[2] right. All are shown when opened. */
  images: ProjectImage[]
  /** Shown under the pieces in the opened window. */
  caption?: string
}

/** One photo filling the left side; a purple quote card + a materials folder on the right. */
export interface PhotoGridBlock {
  _type: 'photoGrid'
  _key: string
  photo: PhotoSlot
  quote: string
  folder: MaterialsFolder
  caption?: string
}

/** A row of designed pieces (flyers, posts, guides), all the same height, uncropped. */
export interface MaterialsBlock {
  _type: 'materials'
  _key: string
  images: ProjectImage[]
  caption?: string
}

/** One stage of the operating model: a title and its steps (shown joined by arrows). */
export interface OperatingStage {
  title: string
  steps: string[]
}

/** Workstreams that run in parallel, converge into delivery, then a retrospective that loops back. */
export interface OperatingModelBlock {
  _type: 'operatingModel'
  _key: string
  title: string
  subtitle?: string
  workstreams: (OperatingStage & { _key: string })[]
  delivery: OperatingStage
  retrospective: OperatingStage
  /** Text beside the loop icon at the bottom, e.g. "Feeds into the next workshop cycle". */
  loopNote?: string
}

/** Two or more images side by side. */
export interface GalleryBlock {
  _type: 'gallery'
  _key: string
  images: (ProjectImage | undefined)[]
  caption?: string
}

/** One key number, e.g. "40%" / "faster onboarding". `highlight` colours it purple. */
export interface Metric {
  value: string
  label: string
  highlight?: boolean
}

/** A row of key numbers. `compact` = smaller numbers in one line (good for 5–6 figures). */
export interface MetricsBlock {
  _type: 'metrics'
  _key: string
  items: Metric[]
  compact?: boolean
}

/** A pulled-out quote. */
export interface QuoteBlock {
  _type: 'quote'
  _key: string
  text: string
  attribution?: string
}

/** A small comparison table: column headings, then rows of text cells. */
export interface TableBlock {
  _type: 'table'
  _key: string
  caption?: string
  columns: string[]
  rows: { _key: string; cells: string[] }[]
}

/** Steps joined by arrows (a roadmap, a journey…). Two or more lanes stack, e.g. frontstage over backstage. */
export interface FlowBlock {
  _type: 'flow'
  _key: string
  caption?: string
  lanes: { _key: string; label?: string; steps: { title: string; description?: string }[] }[]
}

export type CaseStudyBlock =
  | PortableTextBlock
  | ImageBlock
  | GalleryBlock
  | MetricsBlock
  | QuoteBlock
  | TableBlock
  | FlowBlock
  | SectionBlock
  | TextWithNoteBlock
  | PhotoGridBlock
  | MaterialsBlock
  | OperatingModelBlock

/** Full case-study data for /work/:slug. */
export interface Project extends ProjectSummary {
  /** Optional purple label above the title, e.g. "Community Programming". */
  eyebrow?: string
  /** Optional line under the title, e.g. "Service Design · Community Product". Defaults to category · year. */
  tags?: string
  /** Optional headline numbers right under the hero image. */
  keyMetrics?: Metric[]
  /** Optional heading for the summary, e.g. "TL;DR". Defaults to "Overview". */
  overviewHeading?: string
  role: string
  timeline?: string
  tools: string[]
  overview: string
  heroImage?: ProjectImage
  links?: ExternalLink[]
  /** Flexible case-study content. Any number of sections, in any order. */
  body?: CaseStudyBlock[]
}
