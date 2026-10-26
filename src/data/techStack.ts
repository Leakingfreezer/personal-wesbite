import type { TechStack } from '../types/techStack'

/**
 * THE TECH STACK reel in the About section. Logos live in /public/assets/tech/.
 * (Sanity is switched off — see src/lib/projects.ts — so this file is what the site shows.)
 */
export const techStack: TechStack = {
  prefix: 'techstack/',
  tools: [
    { name: 'Figma', logoUrl: '/assets/tech/figma.svg' },
    { name: 'Notion', logoUrl: '/assets/tech/notion.svg' },
    { name: 'Jira', logoUrl: '/assets/tech/jira.svg' },
    { name: 'Python', logoUrl: '/assets/tech/python.svg' },
    { name: 'React', logoUrl: '/assets/tech/react.svg' },
    { name: 'Next.js', logoUrl: '/assets/tech/nextjs.svg' },
    { name: 'Tailwind CSS', logoUrl: '/assets/tech/tailwindcss.svg' },
    { name: 'Java', logoUrl: '/assets/tech/java.svg' },
    { name: 'SQL', logoUrl: '/assets/tech/sql.svg' },
  ],
}
