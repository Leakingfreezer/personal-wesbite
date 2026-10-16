import type { GalleryItem } from '../../types/gallery'
import AudioPlayerWidget from '../widgets/AudioPlayerWidget'
import { gridSpanClasses } from './gridVariants'
import ProjectCard from './ProjectCard'

interface ProjectGridProps {
  /** Projects and widgets, already sorted in display order (see src/lib/projects.ts). */
  items: GalleryItem[]
}

/**
 * Arranges the Past Work grid: project cards plus the record-player widget.
 * Each item's size comes from its `cardSize` via gridVariants.ts.
 * `grid-flow-row-dense` lets smaller items back-fill gaps so there are no awkward holes.
 * Rows are half-rows (--spacing-grid-half-row), and their height follows the screen's
 * width AND height, so the grid fits a laptop screen and never overflows sideways.
 * Rows may grow taller ("minmax(…, auto)") when an item needs more room — e.g. the record
 * player, which always fits around its record. Items beside it stretch to match.
 */
export default function ProjectGrid({ items }: ProjectGridProps) {
  return (
    <ul className="grid grid-flow-row-dense grid-cols-1 gap-4 md:auto-rows-[minmax(var(--spacing-grid-half-row),auto)] md:grid-cols-24 md:gap-grid-gap">
      {items.map((item) => (
        <li key={item.id} className={gridSpanClasses[item.cardSize]}>
          <GridItem item={item} />
        </li>
      ))}
    </ul>
  )
}

/** Picks the right component for each kind of grid item. */
function GridItem({ item }: { item: GalleryItem }) {
  switch (item.kind) {
    case 'project':
      return <ProjectCard project={item.project} />
    case 'audio':
      return <AudioPlayerWidget widget={item} />
  }
}
