import type { CSSProperties } from 'react'
import type { ProjectImage } from '../../types/project'

interface MaterialsRowProps {
  images: ProjectImage[]
  /** Read out by screen readers for the scrollable list. */
  label?: string
}

/**
 * Designed pieces (flyers, posts, guides) in one row, all the same height and never cropped.
 * Tablet and up: each piece's width follows its shape, so the row fills its container exactly.
 * Phones: a fixed-height row you scroll sideways (it can be focused and scrolled with the keyboard too).
 * Used by MaterialsBlock and inside the opened MaterialsFolder.
 */
export default function MaterialsRow({ images, label }: MaterialsRowProps) {
  return (
    <ul
      tabIndex={0}
      aria-label={label}
      className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:gap-4 md:overflow-visible md:px-0 md:pb-0"
    >
      {images.map((image) => {
        const ratio = image.width && image.height ? image.width / image.height : 1
        return (
          <li
            key={image.url}
            style={{ '--ratio': ratio } as CSSProperties}
            className="h-56 shrink-0 md:h-auto md:shrink md:grow-(--ratio) md:basis-0"
          >
            <img
              src={image.url}
              srcSet={image.srcSet}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 768px) 20vw, 40vw"
              loading="lazy"
              decoding="async"
              className="h-full w-auto rounded-lg border border-surface-strong md:h-auto md:w-full"
            />
          </li>
        )
      })}
    </ul>
  )
}
