import type { ImageAsset } from '../../data/site'

interface HeroPhotoProps {
  photo: ImageAsset
  /** Label on the grey placeholder while the photo has no `src`. */
  placeholderLabel: string
  /** Controls the rendered width; the photo is always square. */
  className?: string
}

/**
 * Your photo beside the hero headline: a square, slightly tilted card (like the design).
 * Which photo → src/data/site.ts (hero.photo). Until it has a `src`, a grey placeholder shows.
 */
export default function HeroPhoto({ photo, placeholderLabel, className = '' }: HeroPhotoProps) {
  return (
    <div className={`aspect-square rotate-3 overflow-hidden rounded-photo bg-pill-hover ${className}`}>
      {photo.src ? (
        <img src={photo.src} alt={photo.alt} fetchPriority="high" className="size-full object-cover" />
      ) : (
        <span aria-hidden className="flex size-full items-center justify-center text-caption text-ink-muted">
          {placeholderLabel}
        </span>
      )}
    </div>
  )
}
