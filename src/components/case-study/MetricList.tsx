import type { Metric } from '../../types/project'

interface MetricListProps {
  items: Metric[]
  /** compact → smaller numbers flowing in one line (wraps on phones). Otherwise a big 2–3 column grid. */
  compact?: boolean
  className?: string
}

/**
 * A list of key numbers with short labels: the strip under a case-study hero (keyMetrics)
 * and the metrics block in the body. A `highlight` number is purple.
 */
export default function MetricList({ items, compact = false, className = '' }: MetricListProps) {
  // Up to 4 compact numbers sit in one line; more than 4 go into an even grid of 3 so nothing is left dangling.
  const layout = !compact
    ? 'grid max-w-3xl grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3'
    : items.length > 4
      ? 'grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3'
      : 'grid grid-cols-2 gap-x-8 gap-y-6 md:flex md:flex-wrap md:gap-x-14'
  const valueSize = compact ? 'text-heading font-semibold' : 'text-display font-medium'

  return (
    <dl className={`${layout} ${className}`}>
      {items.map((item) => (
        // dt (label) comes first for screen readers; flex-col-reverse shows the number on top.
        <div key={`${item.value}-${item.label}`} className="flex max-w-64 flex-col-reverse justify-end gap-1">
          <dt className="text-caption text-ink-muted">{item.label}</dt>
          <dd className={`${valueSize} ${item.highlight ? 'text-accent-violet' : ''}`}>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
