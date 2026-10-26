import { ArrowRight } from 'lucide-react'
import type { FlowBlock as FlowBlockData } from '../../../types/project'

/**
 * Case-study block: numbered steps joined by arrows — a roadmap, a journey, a loop.
 * Desktop: left to right, wrapping onto a new line when there are many steps.
 * Phones: top to bottom (the arrows turn to point down).
 * Several lanes stack under each other with a small label, e.g. frontstage over backstage.
 */
export default function FlowBlock({ block }: { block: FlowBlockData }) {
  return (
    <figure className="mx-auto my-14 max-w-5xl space-y-10 md:my-20">
      {block.lanes.map((lane) => (
        <div key={lane._key}>
          {lane.label && <p className="mb-4 text-caption text-ink-muted">{lane.label}</p>}
          <ol className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-y-8">
            {lane.steps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-3 md:flex-row md:items-start">
                <div className="border-t-[1.5px] border-charcoal pt-3 md:w-36">
                  <span className="text-caption text-ink-muted">{String(index + 1).padStart(2, '0')}</span>
                  <p className="mt-1 leading-snug font-medium">{step.title}</p>
                  {step.description && <p className="mt-1 text-caption text-ink-muted">{step.description}</p>}
                </div>
                {index < lane.steps.length - 1 && (
                  <ArrowRight aria-hidden className="ml-1 size-4 shrink-0 rotate-90 text-ink-muted md:mt-3 md:ml-0 md:rotate-0" />
                )}
              </li>
            ))}
          </ol>
        </div>
      ))}
      {block.caption && <figcaption className="text-caption text-ink-muted">{block.caption}</figcaption>}
    </figure>
  )
}
