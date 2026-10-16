import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import type { ProjectSummary } from '../../types/project'
import { imageSizes } from './gridVariants'
import ProjectImage from './ProjectImage'

interface ProjectCardProps {
  project: ProjectSummary
}

/**
 * One project in the Past Work grid. The whole card is a link to its case study.
 * It fills whatever space the grid gives it — size is decided in gridVariants.ts.
 *
 * Hover/focus: the thumbnail zooms very slightly and the arrow turns to point right.
 * Both are CSS transitions and switch off for reduced motion.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group relative block size-full overflow-hidden rounded-card bg-surface"
    >
      {/* Positioned absolutely so a tall thumbnail can never stretch its grid row — it just fills the card. */}
      <ProjectImage
        image={project.thumbnail}
        sizes={imageSizes[project.cardSize]}
        className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
      />

      {/* Bottom row: title label on the left, arrow on the right. */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
        <span className="rounded-pill bg-canvas/90 px-4 py-2 text-caption">
          <span className="font-semibold">{project.title}</span>
          <span className="text-ink-muted">
            {' · '}
            {project.category}
          </span>
        </span>

        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-canvas transition-transform duration-300 group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none"
        >
          <ArrowUpRight className="size-5" strokeWidth={2} />
        </span>
      </div>
    </Link>
  )
}
