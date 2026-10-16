import type { TechStack } from '../types/techStack'

/**
 * MOCK TECH STACK — used until you publish a "Tech stack" document in Sanity Studio.
 * After that, edit your tools in Studio instead. Logos live in /public/assets/tech/.
 */
export const mockTechStack: TechStack = {
  prefix: 'techstack/',
  tools: [
    { name: 'Figma', logoUrl: '/assets/tech/figma.svg' },
    { name: 'Notion', logoUrl: '/assets/tech/notion.svg' },
    { name: 'Jira', logoUrl: '/assets/tech/jira.svg' },
    { name: 'Python', logoUrl: '/assets/tech/python.svg' },
  ],
}
