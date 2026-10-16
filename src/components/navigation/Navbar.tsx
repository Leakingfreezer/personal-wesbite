import { Link } from 'react-router'
import { site } from '../../data/site'
import { playClickSound } from '../../lib/uiSound'

/**
 * The floating white pill at the top of every page. It's `fixed`, so it stays at the top
 * of the screen while you scroll. Its sizes are tokens in globals.css → "Nav sizing".
 * Links point at "/#section" so they work from case-study pages too;
 * ScrollToHash does the actual scrolling. The section links make a little click sound.
 */
export default function Navbar() {
  return (
    // The header is a full-width strip, so it ignores clicks (pointer-events-none) —
    // only the pill itself is clickable, and content beside it stays clickable.
    <header className="pointer-events-none fixed inset-x-0 top-0 z-20 px-4 pt-nav-top">
      {/* Flex row: name+logo on the left, links on the right. All sizes are fluid (clamp). */}
      <nav
        aria-label="Primary"
        className="pointer-events-auto mx-auto flex h-nav-height w-full max-w-nav items-center justify-between rounded-pill bg-canvas pr-[clamp(0.375rem,2.9vw,2.6rem)] pl-[clamp(1rem,2.8vw,2.5rem)] shadow-pill transition-colors duration-300 hover:bg-surface"
      >
        <Link to="/#home" className="group flex shrink-0 items-center gap-1.5 rounded-pill text-nav font-medium">
          {site.name}
          <img
            src={site.logo.src}
            alt={site.logo.alt}
            width={48}
            height={48}
            className="hidden size-nav-logo transition-transform duration-300 group-hover:scale-120 group-hover:rotate-12 motion-reduce:transition-none min-[360px]:block"
          />
        </Link>

        <ul className="flex items-center gap-[clamp(0rem,0.7vw,0.625rem)]">
          {site.nav.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                onClick={playClickSound}
                className="flex h-nav-link items-center rounded-pill px-[clamp(0.625rem,3.4vw,3.15rem)] text-nav font-medium whitespace-nowrap transition-colors duration-200 hover:bg-pill-hover"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
