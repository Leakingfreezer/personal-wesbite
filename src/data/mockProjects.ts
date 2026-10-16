import type { PortableTextBlock } from '@portabletext/react'
import type { Project } from '../types/project'

/**
 * MOCK PROJECTS — placeholder data for local development only.
 * Used automatically until Sanity is connected (Phase 6); after that, projects come from Sanity Studio.
 * All text here is filler — real content belongs in Sanity, not in this file.
 * Orders 3 and 4 are taken by the folder and record widgets (src/data/mockWidgets.ts).
 *
 * Try it: copy an entry, change `slug`, `title`, `order` and `cardSize`, and it appears in the grid
 * and gets its own case-study page at /work/<slug>.
 */

/* Tiny helpers that write mock case-study text in Sanity's Portable Text format.
   (In Sanity Studio you just type — you never write this by hand.) */
let keyCount = 0
const key = () => `mock-${++keyCount}`

function text(style: 'normal' | 'h2' | 'h3', content: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: content, marks: [] }],
  }
}

function bullets(items: string[]): PortableTextBlock[] {
  return items.map((item) => ({ ...text('normal', item), listItem: 'bullet', level: 1 }))
}

/** A paragraph that ends with a link, to show how inline links look. */
function paragraphWithLink(before: string, linkText: string, href: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [{ _type: 'link', _key: 'link', href }],
    children: [
      { _type: 'span', _key: key(), text: before, marks: [] },
      { _type: 'span', _key: key(), text: linkText, marks: ['link'] },
      { _type: 'span', _key: key(), text: '.', marks: [] },
    ],
  }
}

export const mockProjects: Project[] = [
  {
    slug: 'onechild-advocacy-hub',
    title: 'OneChild Advocacy Hub',
    shortDescription: 'Mock description — replace in Sanity.',
    category: 'Product Design',
    year: 2025,
    cardSize: 'large',
    order: 1,
    featured: true,
    role: 'Mock role — Product Designer',
    timeline: 'Mock timeline — Jan to Apr 2025',
    tools: ['Figma', 'Notion', 'Maze'],
    overview:
      'Mock overview — a short summary of the project: what it is, who it was for, and why it mattered. Replace this in Sanity.',
    links: [{ label: 'Live site', url: 'https://example.com' }],
    // This mock uses every kind of content block, so you can see them all on one page.
    body: [
      text('h2', 'The problem'),
      text(
        'normal',
        'Mock section — describe the problem in a few sentences. Case studies can have as many or as few sections as they need.',
      ),
      ...bullets(['Mock point one', 'Mock point two', 'Mock point three']),
      { _type: 'imageBlock', _key: key(), caption: 'Mock caption — a full-width image block.' },
      text('h2', 'Process'),
      text('normal', 'Mock section — walk through research, ideas and decisions.'),
      { _type: 'gallery', _key: key(), images: [undefined, undefined], caption: 'Mock caption — a two-image gallery.' },
      {
        _type: 'quote',
        _key: key(),
        text: 'Mock quote — something a user or teammate said that captures the project.',
        attribution: 'Mock person, role',
      },
      text('h2', 'Outcome'),
      {
        _type: 'metrics',
        _key: key(),
        items: [
          { value: '00%', label: 'Mock metric' },
          { value: '0×', label: 'Mock metric' },
          { value: '000', label: 'Mock metric' },
        ],
      },
      paragraphWithLink('Mock closing paragraph with an inline link to ', 'an external page', 'https://example.com'),
    ],
  },
  {
    slug: 'food-for-thought',
    title: 'Food for Thought',
    shortDescription: 'Mock description — replace in Sanity.',
    category: 'UX Research',
    year: 2025,
    cardSize: 'small',
    order: 2,
    featured: false,
    role: 'Mock role',
    tools: ['Figma'],
    overview: 'Mock overview — replace in Sanity.',
    body: [text('h2', 'Mock section'), text('normal', 'A shorter case study — only one section.')],
  },
  {
    slug: 'nexus-performance',
    title: 'Nexus Performance',
    shortDescription: 'Mock description — replace in Sanity.',
    category: 'Product Management',
    year: 2024,
    cardSize: 'wide',
    order: 5,
    featured: false,
    role: 'Mock role',
    tools: ['Notion'],
    overview: 'Mock overview — replace in Sanity.',
  },
]
