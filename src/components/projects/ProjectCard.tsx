import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { site } from '../../data/site'
import type { ProjectSummary } from '../../types/project'
import { imageSizes } from './gridVariants'
import ProjectImage from './ProjectImage'

interface ProjectCardProps {
  project: ProjectSummary
}

// aspect-4/3 only matters for a `medium` card on phones, the one size with no fixed shape there.
const cardClasses = 'group relative block aspect-4/3 size-full overflow-hidden rounded-card bg-surface md:aspect-auto'

/**
 * One project in the Past Work grid. It fills whatever space the grid gives it —
 * size is decided in gridVariants.ts.
 *
 * Normally the whole card is a link to its case study. On hover/focus the thumbnail zooms
 * very slightly and the arrow turns to point right.
 *
 * "Coming soon" projects (a switch in Studio) are a plain, non-clickable card with no arrow;
 * on hover the image dims and "Coming soon" fades in.
 *
 * Top-left: the project's headline label (e.g. "SCALE"), if it has one — set in Studio.
 * All effects are CSS transitions and switch off for reduced motion.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  if (project.comingSoon) {
    return (
      <div className={cardClasses}>
        <CardContent project={project} />

        {/* Hover overlay. Screen readers skip it — the title label already says "Coming soon" to them. */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-charcoal/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
        >
          <span className="rounded-pill bg-canvas px-5 py-2.5 text-caption font-semibold tracking-wide text-ink uppercase">
            {site.work.comingSoonLabel}
          </span>
        </div>
      </div>
    )
  }

  return (
    <Link to={`/work/${project.slug}`} className={cardClasses}>
      <CardContent project={project} />
    </Link>
  )
}

/** The image, headline label and bottom row — the same for both kinds of card. */
function CardContent({ project }: ProjectCardProps) {
  return (
    <>
      {/* Positioned absolutely so a tall thumbnail can never stretch its grid row — it just fills the card. */}
      <ProjectImage
        image={project.thumbnail}
        sizes={imageSizes[project.cardSize]}
        className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
      />

      {project.headline && (
        <span className="absolute top-4 left-4 rounded-pill bg-charcoal px-3 py-1.5 text-caption font-semibold tracking-wide text-canvas uppercase md:top-5 md:left-5">
          {project.headline}
        </span>
      )}

      {/* Bottom row: title label on the left, arrow on the right (links only). */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
        <span className="rounded-pill bg-canvas/90 px-4 py-2 text-caption">
          <span className="font-semibold">{project.title}</span>
          <span className="text-ink-muted">
            {' · '}
            {project.category}
          </span>
          {project.comingSoon && <span className="sr-only">{` (${site.work.comingSoonLabel})`}</span>}
        </span>

        {!project.comingSoon && (
          <span
            aria-hidden
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-canvas transition-transform duration-300 group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none"
          >
            <ArrowUpRight className="size-5" strokeWidth={2} />
          </span>
        )}
      </div>
    </>
  )
}
