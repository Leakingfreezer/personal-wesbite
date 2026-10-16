import type { MetricsBlock as MetricsBlockData } from '../../../types/project'

/** Case-study block: a row of big numbers with short labels underneath. */
export default function MetricsBlock({ block }: { block: MetricsBlockData }) {
  return (
    <dl className="mx-auto my-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-10 md:my-20 md:grid-cols-3">
      {block.items.map((item) => (
        // dt (label) comes first for screen readers; flex-col-reverse shows the number on top.
        <div key={`${item.value}-${item.label}`} className="flex flex-col-reverse gap-1">
          <dt className="text-caption text-ink-muted">{item.label}</dt>
          <dd className="text-display font-medium">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
