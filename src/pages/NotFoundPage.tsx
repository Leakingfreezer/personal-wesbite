import { Link } from 'react-router'
import { site } from '../data/site'

/** Shown for unknown URLs and unknown project slugs. Copy lives in site.ts → notFound. */
export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-page flex-col items-start justify-center gap-6 px-6 pt-hero-top md:px-12 lg:px-20">
      <title>{`${site.notFound.heading} — ${site.name}`}</title>
      <h1 className="text-display font-semibold">{site.notFound.heading}</h1>
      <p className="text-lead text-ink-muted">{site.notFound.body}</p>
      <Link to="/" className="text-button underline underline-offset-4">
        {site.notFound.linkLabel}
      </Link>
    </section>
  )
}
