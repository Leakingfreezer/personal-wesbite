import type { MetricsBlock as MetricsBlockData } from '../../../types/project'
import MetricList from '../MetricList'

/** Case-study block: a row of big numbers with short labels underneath (`compact` = smaller, in one line). */
export default function MetricsBlock({ block }: { block: MetricsBlockData }) {
  return (
    <MetricList
      items={block.items}
      compact={block.compact}
      className={block.compact ? 'my-10 md:my-14' : 'my-14 md:my-20'}
    />
  )
}
