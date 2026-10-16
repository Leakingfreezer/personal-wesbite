import type { GalleryBlock as GalleryBlockData } from '../../../types/project'
import CaseStudyImage from '../CaseStudyImage'

/** Case-study block: images side by side (stacked on phones), all cropped to the same shape. */
export default function GalleryBlock({ block }: { block: GalleryBlockData }) {
  return (
    <figure className="my-14 md:my-20">
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {block.images.map((image, index) => (
          <CaseStudyImage
            key={image?.url ?? index}
            image={image}
            shape="landscape"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ))}
      </div>
      {block.caption && <figcaption className="mt-3 text-caption text-ink-muted">{block.caption}</figcaption>}
    </figure>
  )
}
