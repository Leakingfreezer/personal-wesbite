import type { ProjectImage as ProjectImageData } from '../../types/project'

interface ProjectImageProps {
  /** Missing image → plain light-gray fill (the card behind it shows through). */
  image?: ProjectImageData
  /** Tells the browser how wide the image will be shown (see gridVariants.ts). */
  sizes: string
  className?: string
}

/**
 * A project thumbnail that fills its parent box (the card decides the shape).
 * Below-the-fold, so it lazy-loads.
 */
export default function ProjectImage({ image, sizes, className = '' }: ProjectImageProps) {
  if (!image) {
    return <div aria-hidden className={`size-full bg-surface ${className}`} />
  }

  return (
    <img
      src={image.url}
      srcSet={image.srcSet}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      loading="lazy"
      decoding="async"
      className={`size-full object-cover ${className}`}
    />
  )
}
