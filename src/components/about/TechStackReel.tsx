import { animate, motion, useInView, useMotionValue, useReducedMotion } from 'motion/react'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { TechStack, Tool } from '../../types/techStack'

interface TechStackReelProps {
  techStack: TechStack
  className?: string
}

/* ── Tuning knobs ──────────────────────────────────────────────────────── */
/** Rows visible in the reel window (odd, so one row sits exactly in the middle). */
const ROWS = 5
/** Spin speed: seconds per row scrolled past (the more tools, the longer the spin)… */
const SECONDS_PER_ROW = 0.45
/** …but never shorter than this. */
const MIN_SPIN_SECONDS = 1.4
/** How long the tool it lands on glows violet, in ms. */
const GLOW_MS = 850
/** Pause on the landed tool before the next spin, in ms. */
const PAUSE_MS = 2000
/** Smooth start, smooth stop — no whip. */
const EASE = [0.65, 0, 0.35, 1] as const

/** spinning → scrolling past · landed → target glows violet · done → target settles to normal ink */
type Phase = 'spinning' | 'landed' | 'done'

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * About section: "techstack/" followed by a slot-machine reel of your tools (logo + name),
 * like bento.me/username. Every tool appears once; each spin lands on the next one in order
 * (Figma, then Notion, then Jira…). It only spins while it's on screen.
 * With reduced motion it swaps tools instantly instead of scrolling.
 * Prefix and tools come from src/data/techStack.ts.
 */
export default function TechStackReel({ techStack, className = '' }: TechStackReelProps) {
  const { prefix, tools } = techStack

  const wrapperRef = useRef<HTMLDivElement>(null)
  const probeRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapperRef, { amount: 0.5 })
  const reduceMotion = useReducedMotion()

  const [spin, setSpin] = useState(0)
  const [rowHeight, setRowHeight] = useState(0)
  const [phase, setPhase] = useState<Phase>('done')
  const y = useMotionValue(0)

  // The reel, top to bottom: the tool we'll land on, then every other tool once (shuffled).
  // The spin starts at the bottom and the rows slide down until the target reaches the middle.
  const target: Tool | undefined = tools[spin % tools.length]
  const reel = useMemo(() => (target ? [target, ...shuffle(tools.filter((tool) => tool !== target))] : []), [tools, target])

  const targetIndex = 0
  const startIndex = reel.length - 1
  /** How far to move the reel so row `index` sits in the middle of the window. */
  const offsetFor = (index: number) => (rowHeight * ROWS) / 2 - (index * rowHeight + rowHeight / 2)

  // Measure one row, so the reel works at any font size.
  useLayoutEffect(() => {
    setRowHeight(probeRef.current?.offsetHeight ?? 0)
  }, [])

  // One spin per `spin` number: slide from the last row to the target, glow, pause, repeat.
  useEffect(() => {
    if (!rowHeight || !target) return
    const landed = offsetFor(targetIndex)
    const timers: number[] = []
    const next = (delay: number) => timers.push(window.setTimeout(() => setSpin((count) => count + 1), delay))

    // Off screen or only one tool: rest on it. Reduced motion: no scrolling, just swap tools.
    if (!isInView || reduceMotion || tools.length < 2) {
      y.set(landed)
      setPhase('done')
      if (isInView && tools.length > 1) next(GLOW_MS + PAUSE_MS)
      return () => timers.forEach(window.clearTimeout)
    }

    setPhase('spinning')
    y.set(offsetFor(startIndex))
    const controls = animate(y, landed, {
      duration: Math.max(MIN_SPIN_SECONDS, (startIndex - targetIndex) * SECONDS_PER_ROW),
      ease: EASE,
      onComplete: () => {
        setPhase('landed')
        timers.push(
          window.setTimeout(() => {
            setPhase('done')
            next(PAUSE_MS)
          }, GLOW_MS),
        )
      },
    })

    return () => {
      controls.stop()
      timers.forEach(window.clearTimeout)
    }
    // offsetFor/startIndex/target are derived from these, so they don't need listing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowHeight, spin, isInView, reduceMotion])

  if (!target) return null

  const targetColour = { spinning: 'text-ink-muted', landed: 'text-accent-violet', done: 'text-ink' }[phase]

  return (
    // The prefix and the reel sit on one line; the reel's middle row lines up with the prefix.
    <div ref={wrapperRef} className={`flex items-center text-heading font-semibold tracking-tight ${className}`}>
      {/* The reel is decorative, so screen readers get this plain list instead. */}
      <ul aria-label={prefix} className="sr-only">
        {tools.map((tool) => (
          <li key={tool.name}>{tool.name}</li>
        ))}
      </ul>

      <span aria-hidden className="shrink-0 whitespace-nowrap text-ink-muted">
        {prefix}
      </span>

      {/* The window: exactly ROWS rows tall; everything outside it is hidden, and the top and bottom fade out. */}
      <div aria-hidden className="relative overflow-hidden mask-y-from-70%" style={{ height: rowHeight * ROWS }}>
        {/* Invisible copy of one row, only used to measure its height. */}
        <div ref={probeRef} className="pointer-events-none invisible absolute">
          <ReelRow tool={target} />
        </div>

        <motion.div style={{ y }} className={rowHeight ? 'transform-gpu' : 'opacity-0'}>
          {reel.map((tool, index) => {
            const isTarget = index === targetIndex
            const colour = isTarget ? targetColour : 'text-ink-muted'
            // Once it has landed, every row except the target fades away.
            const hidden = !isTarget && phase !== 'spinning' ? 'opacity-0' : ''
            return <ReelRow key={tool.name} tool={tool} className={`${colour} ${hidden}`} />
          })}
        </motion.div>
      </div>
    </div>
  )
}

/** One line of the reel: logo, then name. */
function ReelRow({ tool, className = '' }: { tool: Tool; className?: string }) {
  return (
    <div
      className={`flex items-center gap-[0.3em] pl-[0.15em] leading-[1.2] whitespace-nowrap transition-[color,opacity] duration-500 ease-out ${className}`}
    >
      <img src={tool.logoUrl} alt="" className="size-[0.8em] shrink-0 object-contain" />
      {tool.name}
    </div>
  )
}
