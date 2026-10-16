import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { site } from '../../data/site'
import type { ProjectSummary } from '../../types/project'

interface NextProjectProps {
  /** null when there's only one project, so there's nowhere to go next. */
  next: ProjectSummary | null
}

/** Bottom of a case study: back to the grid on the left, the next project on the right. */
export default function NextProject({ next }: NextProjectProps) {
  return (
    <nav aria-label="More work" className="mx-auto max-w-page px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="flex flex-col gap-10 border-t border-surface-strong pt-12 md:flex-row md:items-end md:justify-between">
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 rounded-pill text-caption text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {site.caseStudy.backLabel}
        </Link>

        {next && (
          <Link to={`/work/${next.slug}`} className="group flex flex-col gap-2 rounded-card md:items-end">
            <span className="text-caption text-ink-muted">{site.caseStudy.nextLabel}</span>
            <span className="flex items-center gap-4 text-heading font-medium">
              {next.title}
              <span
                aria-hidden
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-charcoal text-canvas transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              >
                <ArrowRight className="size-5" />
              </span>
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}
