import type { SectionBlock as SectionBlockData } from '../../../types/project'

/**
 * Case-study block: a small section label ("Problem", "Solution"…) with a thin line under it.
 * It's the section's h2, so the bigger headline that may follow is written with h3().
 */
export default function SectionBlock({ block }: { block: SectionBlockData }) {
  return (
    <h2 className="mt-16 mb-8 border-b border-ink/20 pb-3 text-nav font-medium md:mt-20">{block.label}</h2>
  )
}
