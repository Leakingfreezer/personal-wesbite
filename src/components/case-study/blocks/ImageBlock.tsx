import type { ImageBlock as ImageBlockData } from '../../../types/project'
import CaseStudyImage from '../CaseStudyImage'

/** Case-study block: one wide image with an optional caption. */
export default function ImageBlock({ block }: { block: ImageBlockData }) {
  return (
    <figure className="my-14 md:my-20">
      <CaseStudyImage image={block.image} sizes="(min-width: 1024px) 64rem, 100vw" />
      {block.caption && <figcaption className="mt-3 text-caption text-ink-muted">{block.caption}</figcaption>}
    </figure>
  )
}
