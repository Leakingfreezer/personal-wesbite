import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/**
 * React Router changes the URL without the browser's built-in "jump to #id",
 * so this does it after every navigation:
 *   • "/#work" on the same page   → smooth-scroll to #work
 *   • "/#work" from another page  → jump straight there (no long scroll from the top)
 *   • a new page without a hash   → start at the top
 * Smooth scrolling is skipped for people who prefer reduced motion.
 */
export default function ScrollToHash() {
  const { pathname, hash, key } = useLocation()
  const previousPathname = useRef<string | null>(null)

  useEffect(() => {
    const isSamePage = previousPathname.current === pathname
    previousPathname.current = pathname

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior: ScrollBehavior = isSamePage && !prefersReducedMotion ? 'smooth' : 'instant'

    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior })
    } else if (!isSamePage) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash, key])

  return null
}
