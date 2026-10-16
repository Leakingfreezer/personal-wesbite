import { site } from '../../data/site'
import type { Project } from '../../types/project'

interface CaseStudyOverviewProps {
  project: Project
}

/** Summary paragraph on the left; role, timeline, tools and links on the right. */
export default function CaseStudyOverview({ project }: CaseStudyOverviewProps) {
  const labels = site.caseStudy

  return (
    <section
      aria-labelledby="overview-heading"
      className="mx-auto grid max-w-page gap-10 px-6 py-16 md:grid-cols-[2fr_1fr] md:gap-16 md:px-12 md:py-24 lg:px-20"
    >
      <div>
        <h2 id="overview-heading" className="text-caption text-ink-muted">
          {labels.overviewHeading}
        </h2>
        <p className="mt-4 text-lead">{project.overview}</p>
      </div>

      <dl className="grid content-start gap-6">
        <Detail label={labels.roleLabel}>{project.role}</Detail>
        {project.timeline && <Detail label={labels.timelineLabel}>{project.timeline}</Detail>}
        {project.tools.length > 0 && <Detail label={labels.toolsLabel}>{project.tools.join(', ')}</Detail>}
        {project.links && project.links.length > 0 && (
          <Detail label={labels.linksLabel}>
            <ul className="space-y-1">
              {project.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Detail>
        )}
      </dl>
    </section>
  )
}

/** One label/value pair in the details list. */
function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-caption text-ink-muted">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  )
}
