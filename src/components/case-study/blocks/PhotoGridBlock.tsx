import { Quote } from 'lucide-react'
import type { PhotoGridBlock as PhotoGridBlockData, PhotoSlot } from '../../../types/project'
import MaterialsFolder from '../MaterialsFolder'

/**
 * Case-study block: one photo, a purple quote card and a folder of materials.
 *   left  → the photo, stretched to the full height of the right column (cropped to fit)
 *   right → the quote card, the materials folder under it (opens to show every piece)
 * Phones: everything stacks. An empty slot shows a grey box naming the photo still to add.
 */
export default function PhotoGridBlock({ block }: { block: PhotoGridBlockData }) {
  return (
    <figure className="my-14 md:my-20">
      <div className="grid gap-4 md:grid-cols-[567fr_488fr] md:gap-5">
        {/* The box sets the photo's size; the photo fills it (absolute), so it never makes the row taller. */}
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[28rem]">
          <Slot slot={block.photo} sizes="(min-width: 768px) 36rem, 100vw" className="absolute inset-0" />
        </div>

        <div className="flex flex-col gap-4 md:gap-5">
          <blockquote className="flex gap-4 rounded-xl bg-accent-violet-soft p-6 text-button font-semibold text-accent-violet md:p-7">
            <Quote aria-hidden className="size-8 shrink-0 rotate-180 fill-current" strokeWidth={0} />
            <p>{block.quote}</p>
          </blockquote>
          <div className="flex flex-1 items-center">
            <MaterialsFolder folder={block.folder} />
          </div>
        </div>
      </div>
      {block.caption && <figcaption className="mt-3 text-caption text-ink-muted">{block.caption}</figcaption>}
    </figure>
  )
}

/** One photo, cropped to fill its box; or a grey box naming the missing photo. */
function Slot({ slot, sizes, className }: { slot: PhotoSlot; sizes: string; className: string }) {
  if (!slot.image) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-surface-strong p-4 text-center text-caption text-ink-muted ${className}`}
      >
        {slot.placeholder}
      </div>
    )
  }

  const { image } = slot
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
      style={image.focus ? { objectPosition: image.focus } : undefined}
      className={`size-full rounded-xl object-cover ${className}`}
    />
  )
}
