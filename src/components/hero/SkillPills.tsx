import type { Skill } from '../../data/site'
import { playHoverSound } from '../../lib/hoverSound'

interface SkillPillsProps {
  skills: Skill[]
  className?: string
}

/**
 * The white pills after "through" (Design, Strategy, …). They pop in one by one when the
 * page loads, and tilt a little (with a little snap sound) on hover. Labels and icons come from src/data/site.ts → hero.skills.
 * The list is capped at 23em wide so the four default pills sit two per row, like the design.
 */
export default function SkillPills({ skills, className = '' }: SkillPillsProps) {
  return (
    <ul className={`flex max-w-[23em] flex-wrap gap-[0.5em] text-button sm:justify-center ${className}`}>
      {skills.map(({ label, icon: Icon }, index) => (
        <li
          key={label}
          className="flex animate-pop items-center gap-[0.45em] rounded-pill bg-canvas px-[1.25em] py-[0.45em] leading-none text-ink shadow-chip ring-1 ring-ink/5 transition-transform duration-300 odd:hover:-rotate-3 even:hover:rotate-3 hover:-translate-y-0.5 motion-reduce:animate-none motion-reduce:transition-none"
          style={{ animationDelay: `${250 + index * 90}ms` }}
          onPointerEnter={playHoverSound}
        >
          <Icon aria-hidden strokeWidth={1.75} className="size-[1em] shrink-0" />
          {label}
        </li>
      ))}
    </ul>
  )
}
