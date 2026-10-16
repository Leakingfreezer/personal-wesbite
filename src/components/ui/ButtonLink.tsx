import { ArrowRight } from 'lucide-react'

interface ButtonLinkProps {
  href: string
  children: React.ReactNode
}

/**
 * An outlined pill that looks like a button but is a link (it takes you somewhere —
 * here, your email app). On hover it fills in dark and the arrow nudges right.
 */
export default function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 rounded-pill border border-line px-[clamp(1.25rem,2.6vw,2.4rem)] py-[clamp(0.75rem,1.4vw,1.25rem)] text-button text-ink-soft transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-canvas motion-reduce:transition-none"
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-[1.3em] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
        strokeWidth={1.75}
      />
    </a>
  )
}
