import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { site } from '../../data/site'
import type { Project } from '../../types/project'
import CaseStudyImage from './CaseStudyImage'

interface CaseStudyHeaderProps {
  project: Project
}

/** Top of a case study: back link, category · year, big title, one-line summary, hero image. */
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

      <p className="mt-10 text-caption text-ink-muted md:mt-14">
        {project.category} · {project.year}
      </p>
      <h1 className="mt-3 max-w-4xl text-display font-medium">{project.title}</h1>
      <p className="mt-6 max-w-2xl text-lead text-ink-muted">{project.shortDescription}</p>

      <div className="mt-12 md:mt-16">
        <CaseStudyImage image={project.heroImage} sizes="100vw" priority />
      </div>
    </header>
  )
}
