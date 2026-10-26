import type { ImageAsset } from '../../data/site'

interface HeroPhotoProps {
  photo: ImageAsset
  /** Label on the grey placeholder while the photo has no `src`. */
  placeholderLabel: string
  /** Optional sticker on the bottom-left corner, styled like the skill pills. */
  caption?: string
  /** Controls the rendered width; the photo is always square. */
  className?: string
}

/**
 * Your photo beside the hero headline: a square, slightly tilted card (like the design),
 * with an optional little caption sticker tilted the other way.
 * Which photo and caption → src/data/site.ts (hero.photo, hero.photoCaption). Until the photo has a `src`, a grey placeholder shows.
 */
export default function HeroPhoto({ photo, placeholderLabel, caption, className = '' }: HeroPhotoProps) {
  return (
    <figure className={`relative ${className}`}>
      <div className="aspect-square rotate-3 overflow-hidden rounded-photo bg-pill-hover">
        {photo.src ? (
          <img src={photo.src} alt={photo.alt} fetchPriority="high" className="size-full object-cover" />
        ) : (
          <span aria-hidden className="flex size-full items-center justify-center text-caption text-ink-muted">
            {placeholderLabel}
          </span>
        )}
      </div>

      {caption && (
        // Pops in after the hero text has finished animating (same pop as the skill pills).
        <figcaption
          className="absolute -bottom-4 -left-2 -rotate-6 animate-pop rounded-pill border-[1.5px] border-charcoal bg-canvas px-4 py-2 text-caption font-medium text-charcoal motion-reduce:animate-none"
          style={{ animationDelay: '1100ms' }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
