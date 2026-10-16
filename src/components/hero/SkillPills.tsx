import type { Skill } from '../../data/site'
import { playHoverSound } from '../../lib/uiSound'

interface SkillPillsProps {
  skills: Skill[]
  className?: string
}

/**
 * The liquid colour for each pill, in order (the 5th pill reuses pink, and so on).
 * Colours are tokens in globals.css (--color-liquid-*). Full class names so Tailwind sees them.
 */
const liquidColours = ['text-liquid-pink', 'text-liquid-purple', 'text-liquid-yellow', 'text-liquid-green']

/**
 * The outlined pills after "through" (Design, Strategy, …). They pop in one by one when the
 * page loads. On hover a thick, slow liquid rises up from the bottom and fills the pill —
 * a different bright colour for each — then drains back out when the mouse leaves.
 * Labels and icons come from src/data/site.ts → hero.skills.
 * The list is capped at 24em wide so the four default pills sit two per row, like the design.
 */
export default function SkillPills({ skills, className = '' }: SkillPillsProps) {
  return (
    <ul className={`flex max-w-[24em] flex-wrap gap-[0.5em] text-button sm:justify-center ${className}`}>
      {skills.map(({ label, icon: Icon }, index) => (
        <li
          key={label}
          // isolate + overflow-hidden: the liquid stays inside the pill, behind the icon and label.
          className="group relative isolate flex animate-pop items-center gap-[0.45em] overflow-hidden rounded-pill border-[1.5px] border-charcoal bg-canvas px-[1.3em] py-[0.7em] leading-none font-medium text-charcoal transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:animate-none motion-reduce:transition-none"
          style={{ animationDelay: `${250 + index * 90}ms` }}
          onPointerEnter={playHoverSound}
        >
          <Liquid colourClass={liquidColours[index % liquidColours.length]} />
          <Icon aria-hidden strokeWidth={2} className="size-[1em] shrink-0" />
          {label}
        </li>
      ))}
    </ul>
  )
}

/**
 * The liquid: a wavy surface (SVG) on top of a solid body, sitting just below the pill.
 * On hover it slides up until the wave is above the pill's top edge, so the pill is full.
 * It climbs slowly and steadily, easing off near the top like syrup (1.4s), and drains faster (0.5s).
 */
function Liquid({ colourClass }: { colourClass: string }) {
  return (
    <span
      aria-hidden
      className={`absolute inset-x-0 -top-[0.8em] bottom-0 -z-10 flex translate-y-full flex-col transition-transform duration-500 ease-in group-hover:translate-y-0 group-hover:duration-1400 group-hover:ease-[cubic-bezier(0.3,0.1,0.2,1)] motion-reduce:transition-none ${colourClass}`}
    >
      {/* Two wave lengths side by side, drifting left forever, so the surface looks like it's sloshing. */}
      <svg
        viewBox="0 0 200 20"
        preserveAspectRatio="none"
        className="-mb-px h-[0.8em] w-[200%] shrink-0 animate-liquid-wave fill-current motion-reduce:animate-none"
      >
        <path d="M0 12 C 20 2, 30 2, 50 12 S 80 22, 100 12 S 130 2, 150 12 S 180 22, 200 12 V 20 H 0 Z" />
      </svg>
      <span className="flex-1 bg-current" />
    </span>
  )
}
