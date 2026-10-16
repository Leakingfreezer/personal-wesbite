import ProjectGrid from '../projects/ProjectGrid'
import { site } from '../../data/site'
import type { GalleryItem } from '../../types/gallery'

interface PastWorkProps {
  /** Projects and mini widgets, in display order. */
  items: GalleryItem[]
}

/**
 * Section 3: centred "Past Work" heading above the project grid.
 * Items arrive as props from the homepage loader — this component never fetches.
 */
export default function PastWork({ items }: PastWorkProps) {
  return (
    <section id="work" className="mx-auto max-w-page px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <h2 className="mb-10 text-center text-heading font-medium md:mb-14">{site.work.heading}</h2>

      {items.length > 0 ? (
        <ProjectGrid items={items} />
      ) : (
        <p className="text-center text-ink-muted">{site.work.emptyMessage}</p>
      )}
    </section>
  )
}
