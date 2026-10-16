import { useEffect, useRef, useState } from 'react'
import type { ProjectImage } from '../../types/project'

interface RecordDiscProps {
  /** The plain record artwork (Irene's Figma record). */
  recordImage: string
  /** Album cover — fills the whole record. */
  cover?: ProjectImage
  /** Spins while true. */
  isPlaying: boolean
  /** True → drop down and fill the whole card with the cover; false → back to the half-record. */
  isExpanded: boolean
}

/** One full turn every 6 seconds while music plays. */
const DEGREES_PER_SECOND = 60

/**
 * The "gravity" feel: the cover drops into place, overshoots a touch, and floats back to rest.
 * (A cubic-bezier above 1 = overshoot. Lower the 1.28 for less bounce, raise it for more.)
 */
const GRAVITY_EASING = 'cubic-bezier(0.32, 1.28, 0.6, 1)'
const REVEAL_MS = 700

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * The record at the top of the audio player card.
 *
 *   Normal:   a square layer as wide as the card, centred on its top edge and rounded into a circle
 *             (the card shows the lower half). The black centre label sits on top.
 *   Expanded: the label vanishes instantly, the record turns upright, and the layer drops down into the
 *             card (with a soft overshoot) while its corners relax into the card's — so the full cover shows.
 *
 * Only transform, opacity and border-radius animate (no layout changes), which keeps it smooth.
 * The spin is done in JavaScript so the record can turn back to upright from wherever it stopped.
 * The card must be a size container ([container-type:inline-size]) — 100cqw = the card's width.
 */
export default function RecordDisc({ recordImage, cover, isPlaying, isExpanded }: RecordDiscProps) {
  const layerRef = useRef<HTMLDivElement>(null)
  const spinnerRef = useRef<HTMLDivElement>(null)
  const angle = useRef(0)
  /** How much to enlarge the square layer so it covers the whole card (cards can be taller than wide). */
  const [coverScale, setCoverScale] = useState(1.06)
  const shouldSpin = isPlaying && !isExpanded && !prefersReducedMotion()

  // Keep coverScale right as the card resizes.
  useEffect(() => {
    const card = layerRef.current?.parentElement
    if (!card) return
    const observer = new ResizeObserver(() => {
      const ratio = card.clientHeight / card.clientWidth
      // Scaled around its centre, the square must reach the card's bottom edge (2·ratio − 1),
      // plus a little extra (6%) so the overshoot never shows a gap at the top.
      setCoverScale(Math.max(1.06, 2 * ratio - 1 + 0.06))
    })
    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  // Spin while playing; turn upright when expanding.
  useEffect(() => {
    const spinner = spinnerRef.current
    if (!spinner) return

    if (shouldSpin) {
      spinner.style.transition = 'none'
      let lastTime = performance.now()
      let frame = requestAnimationFrame(function tick(now) {
        angle.current += ((now - lastTime) / 1000) * DEGREES_PER_SECOND
        lastTime = now
        spinner.style.rotate = `${angle.current}deg`
        frame = requestAnimationFrame(tick)
      })
      return () => cancelAnimationFrame(frame)
    }

    if (isExpanded) {
      // Turn forward to the next upright position, at the same time as the drop.
      angle.current = Math.ceil(angle.current / 360) * 360
      spinner.style.transition = prefersReducedMotion() ? 'none' : `rotate ${REVEAL_MS}ms ${GRAVITY_EASING}`
      spinner.style.rotate = `${angle.current}deg`
    }
  }, [shouldSpin, isExpanded])

  const motion = prefersReducedMotion()
    ? 'none'
    : `translate ${REVEAL_MS}ms ${GRAVITY_EASING}, scale ${REVEAL_MS}ms ${GRAVITY_EASING}, border-radius ${REVEAL_MS}ms ease-out`

  return (
    <div
      ref={layerRef}
      aria-hidden
      // h-[100cqw]: always a square as wide as the card. will-change: let the GPU move it smoothly.
      className="absolute top-0 left-0 z-10 h-[100cqw] w-full overflow-hidden shadow-record will-change-transform"
      style={{
        transition: motion,
        translate: isExpanded ? '0 0' : '0 -50%',
        scale: isExpanded ? coverScale : 1,
        // 50% = circle. Expanded, divide the card's corner radius by the scale so it still matches the card.
        borderRadius: isExpanded ? `calc(var(--radius-card) / ${coverScale})` : '50%',
      }}
    >
      <div ref={spinnerRef} className="relative size-full">
        <img src={recordImage} alt="" className="size-full" />
        {cover && <img src={cover.url} alt="" className="absolute inset-0 size-full object-cover" />}
        {/*
          Black centre label (30.5% of the disc, from Figma) so it reads as a vinyl.
          Vanishes instantly when the cover is revealed; comes back only once the record has shrunk again.
        */}
        <span
          className="absolute top-1/2 left-1/2 aspect-square w-[30.5%] -translate-1/2 rounded-full bg-black"
          style={{
            opacity: isExpanded ? 0 : 1,
            transition: isExpanded ? 'none' : `opacity 150ms ease-out ${REVEAL_MS - 150}ms`,
          }}
        />
      </div>
    </div>
  )
}
