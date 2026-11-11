import { site } from '../../../data/site'
import type { ImageBlock as ImageBlockData } from '../../../types/project'
import CaseStudyImage from '../CaseStudyImage'

/**
 * Case-study block: one wide image with an optional caption.
 * With `scrollOnPhones` (a diagram with small text), phones show it at a readable size and scroll it sideways.
 */
export default function ImageBlock({ block }: { block: ImageBlockData }) {
  const picture = <CaseStudyImage image={block.image} sizes="(min-width: 1024px) 64rem, 100vw" />

  return (
    <figure className="my-14 md:my-20">
      {block.scrollOnPhones ? (
        <div
          tabIndex={0}
          aria-label={block.caption}
          className="-mx-6 overflow-x-auto px-6 pb-2 md:mx-0 md:overflow-visible md:px-0 md:pb-0"
        >
          <div className="min-w-4xl md:min-w-0">{picture}</div>
        </div>
      ) : (
        picture
      )}
      {block.caption && <figcaption className="mt-3 text-caption text-ink-muted">{block.caption}</figcaption>}
      {block.scrollOnPhones && <p className="mt-1 text-caption text-ink-muted md:hidden">{site.caseStudy.scrollHint}</p>}
    </figure>
  )
}
