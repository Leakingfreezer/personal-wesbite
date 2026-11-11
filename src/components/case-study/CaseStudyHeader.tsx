import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { site } from '../../data/site'
import type { Project } from '../../types/project'
import CaseStudyImage from './CaseStudyImage'
import MetricList from './MetricList'

interface CaseStudyHeaderProps {
  project: Project
}

/**
 * Top of a case study, the same order for every project:
 *   back link · [purple label] · big title · tags (or category · year) · one-line summary · hero image · [key numbers]
 * The parts in [brackets] only show when the project has them (eyebrow, keyMetrics in src/data/projects.ts).
 */
export default function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  return (
    <header className="mx-auto max-w-page px-6 pt-hero-top md:px-12 lg:px-20">
      <Link
        to="/#work"
        className="inline-flex items-center gap-2 rounded-pill text-caption text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft aria-hidden className="size-4" />
        {site.caseStudy.backLabel}
      </Link>

      <div className="mt-10 md:mt-14">
        {project.eyebrow && <p className="mb-2 text-lead font-semibold text-accent-violet">{project.eyebrow}</p>}
        <h1 className="max-w-4xl text-display font-medium">{project.title}</h1>
        <p className="mt-3 text-caption text-ink-muted">{project.tags ?? `${project.category} · ${project.year}`}</p>
      </div>
      <p className="mt-6 max-w-2xl text-lead text-ink-muted">{project.shortDescription}</p>

      <div className="mt-12 md:mt-16">
        <CaseStudyImage image={project.heroImage} sizes="100vw" priority />
      </div>

      {project.keyMetrics && project.keyMetrics.length > 0 && (
        <MetricList items={project.keyMetrics} compact className="mt-8 md:mt-10" />
      )}
    </header>
  )
}
