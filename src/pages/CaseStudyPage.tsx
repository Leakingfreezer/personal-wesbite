import { data, useLoaderData, type LoaderFunctionArgs } from 'react-router'
import CaseStudyContent from '../components/case-study/CaseStudyContent'
import CaseStudyHeader from '../components/case-study/CaseStudyHeader'
import CaseStudyOverview from '../components/case-study/CaseStudyOverview'
import NextProject from '../components/case-study/NextProject'
import { site } from '../data/site'
import { getNextProject, getProjectBySlug } from '../lib/projects'

/**
 * Runs before the page renders (wired up in src/router.tsx).
 * An unknown slug throws a 404, which the router turns into the "Page not found" screen.
 */
export async function caseStudyLoader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? ''
  const project = await getProjectBySlug(slug)
  if (!project) {
    throw data('Project not found', { status: 404 })
  }
  return { project, nextProject: await getNextProject(slug) }
}

/**
 * The ONE template every case study uses (/work/:slug).
 * A new project is a new Sanity entry — never a new page component.
 */
export default function CaseStudyPage() {
  const { project, nextProject } = useLoaderData<typeof caseStudyLoader>()

  return (
    <>
      {/* React moves this into <head>, so the browser tab shows the project name. */}
      <title>{`${project.title} — ${site.name}`}</title>

      <article>
        <CaseStudyHeader project={project} />
        <CaseStudyOverview project={project} />
        {project.body && project.body.length > 0 && <CaseStudyContent body={project.body} />}
      </article>

      <NextProject next={nextProject} />
    </>
  )
}
