import { projects } from '../data/projects'
import { techStack } from '../data/techStack'
import { audioWidget } from '../data/widgets'
import type { GalleryItem } from '../types/gallery'
import type { TechStack } from '../types/techStack'
import type { Project, ProjectSummary } from '../types/project'
import { sanityClient } from './sanity/client'
import { toGalleryItem, toProject, toProjectSummary, toTechStack } from './sanity/mappers'
import {
  galleryQuery,
  projectBySlugQuery,
  projectSummariesQuery,
  techStackQuery,
  type SanityGalleryDoc,
  type SanityProject,
  type SanityProjectSummary,
  type SanityTechStack,
} from './sanity/queries'

/**
 * THE ONE PLACE PROJECTS (AND THE TECH STACK) ARE LOADED FROM.
 * Route loaders call these functions; components only receive the results as props.
 *
 * Where the data comes from:
 *   • Now: the files in src/data/ (projects.ts, widgets.ts, techStack.ts) — edit those to change content.
 *   • Sanity is switched off but kept for later. To turn it back on, set USE_SANITY to true
 *     (it then also needs VITE_SANITY_PROJECT_ID in .env.local and content published in Studio).
 * If Sanity can't be reached, the error is NOT hidden — the page shows "Something went wrong".
 */
const USE_SANITY = false
const sanity = USE_SANITY ? sanityClient : null

/** Projects in display order, without "Coming soon" ones (used for "Next project"). */
export async function getProjectSummaries(): Promise<ProjectSummary[]> {
  if (sanity) {
    const docs = await sanity.fetch<SanityProjectSummary[]>(projectSummariesQuery)
    return docs.map(toProjectSummary)
  }
  return projects.filter((project) => !project.comingSoon).sort((a, b) => a.order - b.order)
}

/** Everything in the Past Work grid — projects and the record player — sorted by their `order`. */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (sanity) {
    const docs = await sanity.fetch<SanityGalleryDoc[]>(galleryQuery)
    return docs.map(toGalleryItem)
  }

  const items: GalleryItem[] = [
    ...projects.map((project) => ({
      kind: 'project' as const,
      id: project.slug,
      order: project.order,
      cardSize: project.cardSize,
      project,
    })),
    audioWidget,
  ]
  return items.sort((a, b) => a.order - b.order)
}

/** The About section's tech stack. */
export async function getTechStack(): Promise<TechStack> {
  if (sanity) {
    const doc = await sanity.fetch<SanityTechStack | null>(techStackQuery)
    if (doc) return toTechStack(doc)
  }
  return techStack
}

/** One full case study, or `null` if no project has this slug. */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (sanity) {
    const doc = await sanity.fetch<SanityProject | null>(projectBySlugQuery, { slug })
    return doc ? toProject(doc) : null
  }
  return projects.find((project) => project.slug === slug) ?? null
}

/** The project after this one in display order (the last one wraps round to the first). */
export async function getNextProject(slug: string): Promise<ProjectSummary | null> {
  const summaries = await getProjectSummaries()
  if (summaries.length < 2) return null

  const index = summaries.findIndex((project) => project.slug === slug)
  return summaries[(index + 1) % summaries.length]
}
