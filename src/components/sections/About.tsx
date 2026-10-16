import RichText from '../about/RichText'
import TechStackReel from '../about/TechStackReel'
import { site } from '../../data/site'
import type { TechStack } from '../../types/techStack'

interface AboutProps {
  /** Loaded by the homepage loader (Sanity, or mock data) — see src/lib/projects.ts. */
  techStack: TechStack
}

/**
 * Section 2: introduction on the left (with marker highlights), the tech-stack slot-machine reel on the right.
 * Stacks into one column on phones (text first, card below).
 * Text and highlights → src/data/site.ts (about). Tools → Sanity ("Tech stack"), or src/data/mockTechStack.ts.
 */
export default function About({ techStack }: AboutProps) {
  const { greeting, greetingEmoji, program, bio } = site.about

  return (
    <section id="about" className="mx-auto max-w-page px-6 pt-8 pb-16 md:px-12 md:pt-12 md:pb-24 lg:px-20">
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-16">
        <div className="max-w-xl text-intro font-medium">
          <h2 className="group w-fit">
            {greeting}{' '}
            {/* The hand waves from its wrist while the greeting is hovered. */}
            <span
              aria-hidden
              className="inline-block origin-[70%_70%] group-hover:animate-wave motion-reduce:group-hover:animate-none"
            >
              {greetingEmoji}
            </span>
          </h2>
          <p>
            <RichText text={program} />
          </p>
          <p>
            <RichText text={bio} />
          </p>
        </div>

        <TechStackReel techStack={techStack} className="justify-center" />
      </div>
    </section>
  )
}
