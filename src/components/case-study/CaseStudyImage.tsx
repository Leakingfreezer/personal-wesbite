import { site } from '../../data/site'
import type { ProjectImage } from '../../types/project'

interface CaseStudyImageProps {
  /** Missing image → a labelled light-gray placeholder. */
  image?: ProjectImage
  /** Tells the browser how wide the image is shown, so it downloads the right size. */
  sizes: string
  /**
   * natural   → the image keeps its own proportions (placeholder is 16:9).
   * landscape → cropped to 4:3, so images side by side line up.
   */
  shape?: 'natural' | 'landscape'
  /** True only for the first image on the page (the hero), so it loads straight away. */
  priority?: boolean
}

/** Any image inside a case study: the hero, image blocks and gallery images. */
export default function CaseStudyImage({ image, sizes, shape = 'natural', priority = false }: CaseStudyImageProps) {
  const shapeClass = shape === 'landscape' ? 'aspect-4/3 object-cover' : ''

  if (!image) {
    return (
      <div
        aria-hidden
        className={`flex w-full items-center justify-center rounded-card bg-surface text-caption text-ink-muted ${shape === 'landscape' ? 'aspect-4/3' : 'aspect-video'}`}
      >
        {site.caseStudy.imagePlaceholder}
      </div>
    )
  }

  return (
    <img
      src={image.url}
      srcSet={image.srcSet}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={`h-auto w-full rounded-card ${shapeClass}`}
    />
  )
}
