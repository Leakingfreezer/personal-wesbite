import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { site } from '../data/site'
import NotFoundPage from './NotFoundPage'

/**
 * Shown when a page fails to load (set as `errorElement` in src/router.tsx).
 * A 404 (e.g. an unknown /work/ slug) shows the normal "Page not found" screen;
 * anything else shows a short "something went wrong" message.
 */
export default function RouteErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />
  }

  // Keep the real error visible in the browser console for debugging.
  console.error(error)

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-page flex-col items-start justify-center gap-6 px-6 pt-hero-top md:px-12 lg:px-20">
      <h1 className="text-display font-semibold">{site.error.heading}</h1>
      <p className="text-lead text-ink-muted">{site.error.body}</p>
      <Link to="/" className="text-button underline underline-offset-4">
        {site.error.linkLabel}
      </Link>
    </section>
  )
}
