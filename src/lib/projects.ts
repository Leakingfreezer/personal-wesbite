import { mockProjects } from '../data/mockProjects'
import { mockTechStack } from '../data/mockTechStack'
import { mockAudio } from '../data/mockWidgets'
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
 *   • VITE_SANITY_PROJECT_ID is set (in .env.local) → published content from Sanity.
 *   • Not set → the mock data in src/data/, so the site still works before Sanity is set up.
 * If Sanity can't be reached, the error is NOT hidden — the page shows "Something went wrong".
 */

/** Projects in display order. */
export async function getProjectSummaries(): Promise<ProjectSummary[]> {
  if (sanityClient) {
    const docs = await sanityClient.fetch<SanityProjectSummary[]>(projectSummariesQuery)
    return docs.map(toProjectSummary)
  }
  return [...mockProjects].sort((a, b) => a.order - b.order)
}

/** Everything in the Past Work grid — projects and the record player — sorted by their `order`. */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (sanityClient) {
    const docs = await sanityClient.fetch<SanityGalleryDoc[]>(galleryQuery)
    return docs.map(toGalleryItem)
  }

  const mockItems: GalleryItem[] = [
    ...mockProjects.map((project) => ({
      kind: 'project' as const,
      id: project.slug,
      order: project.order,
      cardSize: project.cardSize,
      project,
    })),
    mockAudio,
  ]
  return mockItems.sort((a, b) => a.order - b.order)
}

/** The About section's tech stack. Until a "Tech stack" document is published in Studio, the mock list shows. */
export async function getTechStack(): Promise<TechStack> {
  if (sanityClient) {
    const doc = await sanityClient.fetch<SanityTechStack | null>(techStackQuery)
    if (doc) return toTechStack(doc)
  }
  return mockTechStack
}

/** One full case study, or `null` if no published project has this slug. */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (sanityClient) {
    const doc = await sanityClient.fetch<SanityProject | null>(projectBySlugQuery, { slug })
    return doc ? toProject(doc) : null
  }
  return mockProjects.find((project) => project.slug === slug) ?? null
}

/** The project after this one in display order (the last one wraps round to the first). */
export async function getNextProject(slug: string): Promise<ProjectSummary | null> {
  const projects = await getProjectSummaries()
  if (projects.length < 2) return null

  const index = projects.findIndex((project) => project.slug === slug)
  return projects[(index + 1) % projects.length]
}
