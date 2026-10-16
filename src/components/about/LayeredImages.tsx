import type { LayeredImage, LayeredImageSet } from '../../data/about'

interface LayeredImagesProps {
  set: LayeredImageSet
  /** Controls the rendered width; height follows the aspect ratio. */
  className?: string
}

/**
 * A few slightly tilted photo cards overlapping each other.
 * It only knows how to draw a LayeredImageSet — which photos and where live in src/data/about.ts.
 */
export default function LayeredImages({ set, className = '' }: LayeredImagesProps) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: set.aspectRatio }}>
      {set.images.map((image) => (
        <PhotoCard key={image.placeholderLabel} image={image} />
      ))}
    </div>
  )
}

function PhotoCard({ image }: { image: LayeredImage }) {
  const { box } = image

  return (
    <div
      className="absolute overflow-hidden rounded-photo border border-ink-muted/40 bg-surface-strong"
      style={{
        left: `${box.left}%`,
        top: `${box.top}%`,
        width: `${box.width}%`,
        height: `${box.height}%`,
        rotate: image.rotate ? `${image.rotate}deg` : undefined,
      }}
    >
      {image.src ? (
        <img src={image.src} alt={image.alt} loading="lazy" className="size-full object-cover" />
      ) : (
        // Placeholder until the real photo is added in src/data/about.ts.
        <span aria-hidden className="flex size-full items-center justify-center p-2 text-center text-caption text-ink-muted">
          {image.placeholderLabel}
        </span>
      )}
    </div>
  )
}
