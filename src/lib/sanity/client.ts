import { createClient } from '@sanity/client'

/**
 * The connection to Sanity. Configured from .env.local (see .env.example):
 *   VITE_SANITY_PROJECT_ID — your project's ID from sanity.io/manage
 *   VITE_SANITY_DATASET    — usually "production"
 *
 * While the project ID is empty, `sanityClient` is null and the site uses mock data instead.
 */
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      // The API version this code was written against — a fixed date keeps results stable.
      apiVersion: '2026-10-01',
      // Sanity's fast cache. Fine for a portfolio: new content appears within a few seconds.
      useCdn: true,
      // Public pages only ever see PUBLISHED content — drafts stay private in Studio.
      perspective: 'published',
    })
  : null
