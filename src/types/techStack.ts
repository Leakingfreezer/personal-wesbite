/**
 * The tech stack shown in the About section's slot-machine reel.
 * Comes from src/data/techStack.ts.
 */

/** One app or language in the reel. */
export interface Tool {
  name: string
  /** Logo image shown beside the name. */
  logoUrl: string
}

export interface TechStack {
  /** Grey text before the reel, e.g. "techstack/" (like bento.me/username). */
  prefix: string
  tools: Tool[]
}
