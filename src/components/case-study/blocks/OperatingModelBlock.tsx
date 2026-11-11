import { ArrowDown, RefreshCw } from 'lucide-react'
import type { OperatingModelBlock as OperatingModelBlockData } from '../../../types/project'

/**
 * Case-study block: how a program runs.
 *   Workstreams (in parallel) → Delivery (dark box) → Retrospective (purple box) → loops back.
 * Each workstream is one row: its name on the left, its steps on the right (stacked on phones).
 * Built from real text (not an image), so it stays sharp and readable at every size.
 */
export default function OperatingModelBlock({ block }: { block: OperatingModelBlockData }) {
  return (
    <figure className="my-10 rounded-card border border-surface-strong p-5 md:my-14 md:p-8">
      <figcaption>
        <p className="text-lead font-medium">{block.title}</p>
        {block.subtitle && <p className="mt-1 text-caption text-ink-muted">{block.subtitle}</p>}
      </figcaption>

      <ul className="mt-6 space-y-2">
        {block.workstreams.map((stream) => (
          <li key={stream._key} className="grid gap-2 md:grid-cols-[9rem_1fr]">
            <span className="flex items-center rounded-lg bg-surface px-4 py-3 text-caption font-semibold tracking-wide uppercase">
              {stream.title}
            </span>
            <Steps steps={stream.steps} className="rounded-lg bg-accent-violet-soft px-4 py-3" />
          </li>
        ))}
      </ul>

      <ArrowDown aria-hidden className="mx-auto my-3 size-5 text-ink-muted" />

      <div className="rounded-xl bg-charcoal px-6 py-6 text-center text-canvas">
        <p className="text-lead font-semibold tracking-wide uppercase">{block.delivery.title}</p>
        <Steps steps={block.delivery.steps} className="mt-2 justify-center text-canvas/80" />
      </div>

      <ArrowDown aria-hidden className="mx-auto my-3 size-5 text-ink-muted" />

      <div className="rounded-xl bg-accent-violet-soft px-6 py-5 text-center">
        <p className="font-semibold tracking-wide uppercase">{block.retrospective.title}</p>
        <Steps steps={block.retrospective.steps} className="mt-2 justify-center text-ink-muted" />
      </div>

      {block.loopNote && (
        <p className="mt-4 flex items-center justify-center gap-2 text-caption text-ink-muted">
          <RefreshCw aria-hidden className="size-5 text-accent-violet" />
          {block.loopNote}
        </p>
      )}
    </figure>
  )
}

/** Steps in order, joined by small arrows (the arrows are decorative; the list order carries the meaning). */
function Steps({ steps, className = '' }: { steps: string[]; className?: string }) {
  return (
    <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-caption ${className}`}>
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden>→</span>}
          {step}
        </li>
      ))}
    </ol>
  )
}
