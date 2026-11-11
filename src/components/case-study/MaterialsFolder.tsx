import { useId, useRef } from 'react'
import type { MouseEvent } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { site } from '../../data/site'
import type { MaterialsFolder as MaterialsFolderData, ProjectImage } from '../../types/project'
import MaterialsRow from './MaterialsRow'

/**
 * A folder of designed pieces, drawn in three layers (back to front):
 *   1. the folder's back panel with its tab
 *   2. three full-size pages standing inside it (real shape, uncropped), their tops sticking out
 *   3. the front flap: frosted, see-through glass over the bottom of the pieces, with an arrow button
 * Hover or focus lifts the pieces and tips the front flap open a little (CSS only).
 * Clicking opens a window (native <dialog>) with every piece in a row and the caption;
 * Esc, the close button or a click outside closes it.
 * Colours: --color-folder-back / --color-folder-front in globals.css.
 */
export default function MaterialsFolder({ folder }: { folder: MaterialsFolderData }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const [middle, left, right] = folder.images

  /** A click on the dark backdrop lands on the <dialog> itself, not on its content. */
  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) event.currentTarget.close()
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`${site.caseStudy.folderOpenLabel} ${folder.title}`}
        aria-haspopup="dialog"
        className="group relative block aspect-[6/5] w-full cursor-pointer rounded-xl perspective-[60rem]"
      >
        {/* 1. Back panel + tab */}
        <span aria-hidden className="absolute top-[3%] left-0 h-[12%] w-[30%] rounded-t-xl bg-folder-back" />
        <span aria-hidden className="absolute inset-x-0 top-[13%] bottom-0 rounded-xl rounded-tl-none bg-folder-back" />

        {/* 2. The pages inside: full-size sheets at their real shape, tops standing out of the folder */}
        {left && (
          <FolderPage
            image={left}
            className="top-[11%] left-[5%] w-[42%] -rotate-3 group-hover:-translate-x-3 group-hover:-rotate-6 group-focus-visible:-rotate-6"
          />
        )}
        {right && (
          <FolderPage
            image={right}
            className="top-[14%] right-[5%] w-[40%] rotate-3 group-hover:translate-x-3 group-hover:rotate-6 group-focus-visible:rotate-6"
          />
        )}
        {middle && <FolderPage image={middle} className="top-[5%] left-[27%] z-10 w-[46%]" />}

        {/* 3. Front flap: hinged at the bottom, tips forward on hover. */}
        <span className="absolute inset-x-0 top-[64%] bottom-0 z-20 flex origin-bottom items-end justify-end rounded-xl bg-folder-front/70 p-4 shadow-folder-front backdrop-blur-md transition-transform duration-300 group-hover:-rotate-x-12 group-focus-visible:-rotate-x-12 motion-reduce:transition-none">
          <span className="flex size-11 items-center justify-center rounded-pill bg-ink text-white">
            <ArrowUpRight aria-hidden className="size-6" />
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClick={closeOnBackdrop}
        aria-labelledby={titleId}
        className="m-auto w-[calc(100%-2rem)] max-w-5xl rounded-card bg-white p-6 text-ink backdrop:bg-ink/50 md:p-8"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h3 id={titleId} className="text-button font-semibold">
            {folder.title}
          </h3>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-surface hover:bg-surface-strong"
          >
            <X aria-hidden className="size-5" />
            <span className="sr-only">{site.caseStudy.folderCloseLabel}</span>
          </button>
        </div>
        <MaterialsRow images={folder.images} label={folder.caption ?? folder.title} />
        {folder.caption && <p className="mt-4 text-caption text-ink-muted">{folder.caption}</p>}
      </dialog>
    </>
  )
}

/**
 * One page standing in the folder: the whole piece at its real shape (never cropped), like a printed sheet.
 * Its bottom part sits behind the front flap. Hover/focus pulls it up a little.
 */
function FolderPage({ image, className }: { image: ProjectImage; className: string }) {
  return (
    // Decorative here: the same pieces, with real alt text, are in the window that opens.
    <img
      src={image.url}
      srcSet={image.srcSet}
      alt=""
      width={image.width}
      height={image.height}
      sizes="(min-width: 768px) 16rem, 45vw"
      loading="lazy"
      decoding="async"
      className={`absolute h-auto rounded-sm shadow-folder transition-transform duration-300 group-hover:-translate-y-5 group-focus-visible:-translate-y-5 motion-reduce:transition-none ${className}`}
    />
  )
}
