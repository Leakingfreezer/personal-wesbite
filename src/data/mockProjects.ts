import type { Project } from '../types/project'

/**
 * MOCK PROJECTS — placeholder data for local development only.
 * Used automatically when VITE_SANITY_PROJECT_ID isn't set; otherwise projects come from Sanity Studio.
 * Real content belongs in Sanity, not in this file.
 * Order 2 is taken by the record player (src/data/mockWidgets.ts).
 *
 * Try it: copy an entry, change `slug`, `title`, `order` and `cardSize`, and it appears in the grid
 * and gets its own case-study page at /work/<slug>.
 */

export const mockProjects: Project[] = [
  {
    slug: 'onechild-opportunities-board',
    title: 'OneChild Opportunities Board',
    shortDescription: 'Mock description — replace in Sanity.',
    category: 'Product Design',
    year: 2026,
    cardSize: 'medium',
    order: 1,
    featured: false,
    comingSoon: true,
    thumbnail: {
      url: '/assets/projects/onechild-opportunities-board-1600.webp',
      srcSet:
        '/assets/projects/onechild-opportunities-board-800.webp 800w, /assets/projects/onechild-opportunities-board-1600.webp 1600w',
      alt: 'The OneChild Opportunities Board shown on an iMac: a grid of youth events, grants and internships with one opened in a side panel.',
      width: 1600,
      height: 1089,
    },
    role: 'Mock role',
    tools: ['Figma'],
    overview: 'Mock overview — replace in Sanity.',
  },
]
