import type { PortableTextBlock } from '@portabletext/react'
import { site } from '../../data/site'
import type { GalleryItem } from '../../types/gallery'
import type { TechStack } from '../../types/techStack'
import type { CaseStudyBlock, Project, ProjectSummary } from '../../types/project'
import { toImageUrl, toProjectImage } from './image'
import type { SanityBodyItem, SanityGalleryDoc, SanityProject, SanityProjectSummary, SanityTechStack } from './queries'

/**
 * Converts raw Sanity results (shapes in queries.ts) into the app's own types (src/types/).
 * This is the only place that knows both shapes — so if a Sanity field is renamed,
 * only this file and the query need to change, never the components.
 */

export function toProjectSummary(doc: SanityProjectSummary): ProjectSummary {
  return {
    slug: doc.slug,
    title: doc.title,
    shortDescription: doc.shortDescription,
    category: doc.category,
    headline: toHeadline(doc),
    year: doc.year,
    cardSize: doc.cardSize,
    order: doc.order,
    featured: doc.featured ?? false,
    comingSoon: doc.comingSoon ?? false,
    thumbnail: toProjectImage(doc.thumbnail, doc.title),
  }
}

/** The card's headline label: the preset word, or the typed text when "Custom…" was picked. */
function toHeadline(doc: SanityProjectSummary): string | undefined {
  if (doc.headline === 'custom') return doc.customHeadline?.trim() || undefined
  return doc.headline
}

export function toProject(doc: SanityProject): Project {
  return {
    ...toProjectSummary(doc),
    role: doc.role,
    timeline: doc.timeline,
    tools: doc.tools ?? [],
    overview: doc.overview,
    heroImage: toProjectImage(doc.heroImage, doc.title),
    links: doc.links,
    body: doc.body?.map(toBodyBlock),
  }
}

/** Custom blocks need their images converted; everything else is already the right shape. */
function toBodyBlock(item: SanityBodyItem): CaseStudyBlock {
  switch (item._type) {
    case 'imageBlock':
      return { _type: 'imageBlock', _key: item._key, caption: item.caption, image: toProjectImage(item.image) }
    case 'gallery':
      return {
        _type: 'gallery',
        _key: item._key,
        caption: item.caption,
        images: (item.images ?? []).map((image) => toProjectImage(image)),
      }
    case 'metrics':
      return { _type: 'metrics', _key: item._key, items: item.items ?? [] }
    case 'quote':
      return item
    case 'block':
      // Plain text blocks (headings, paragraphs, lists) are already Portable Text.
      return item as unknown as PortableTextBlock
  }
}

export function toGalleryItem(doc: SanityGalleryDoc): GalleryItem {
  switch (doc._type) {
    case 'project':
      return { kind: 'project', id: doc.slug, order: doc.order, cardSize: doc.cardSize, project: toProjectSummary(doc) }
    case 'audioWidget':
      return {
        kind: 'audio',
        id: doc._id,
        order: doc.order,
        // Always a third of the row — the record player sizes itself around its record.
        cardSize: 'medium',
        artist: doc.artist,
        songTitle: doc.songTitle,
        audioUrl: doc.audioUrl,
        cover: toProjectImage(doc.cover, ''),
        recordImage: site.widgets.recordImage,
      }
  }
}

export function toTechStack(doc: SanityTechStack): TechStack {
  return {
    prefix: doc.prefix,
    // Tools without an uploaded logo are skipped rather than shown as broken images.
    tools: (doc.tools ?? []).flatMap((tool) => {
      const logoUrl = toImageUrl(tool.logo, 256)
      return logoUrl ? [{ name: tool.name, logoUrl }] : []
    }),
  }
}
