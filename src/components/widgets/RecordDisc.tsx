import type { ProjectImage } from '../../types/project'

interface RecordDiscProps {
  /** The plain record artwork (Irene's Figma record). */
  recordImage: string
  /** Album cover — fills the whole record. */
  cover?: ProjectImage
  /** Spins while true; stops where it is when false (like lifting the needle). */
  isPlaying: boolean
}

/**
 * The record at the top of the audio player card: a square layer as wide as the card, centred on
 * its top edge and rounded into a circle (the card shows the lower half). The album cover fills the
 * disc and the metal centre hub sits on top.
 *
 * While the song plays the disc spins like a vinyl (one turn every 6s — `--animate-record-spin` in
 * globals.css); when paused it stays at whatever angle it stopped. No spin for reduced motion.
 * The card must be a size container ([container-type:inline-size]) — 100cqw = the card's width.
 */
export default function RecordDisc({ recordImage, cover, isPlaying }: RecordDiscProps) {
  return (
    <div
      aria-hidden
      // h-[100cqw]: always a square as wide as the card; -translate-y-1/2 shows only its lower half.
      // The shadow is on this still layer, so it doesn't spin with the record.
      className="absolute top-0 left-0 z-10 h-[100cqw] w-full -translate-y-1/2 overflow-hidden rounded-full shadow-record"
    >
      <div
        className="relative size-full animate-record-spin motion-reduce:animate-none"
        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
      >
        <img src={recordImage} alt="" className="size-full" />
        {cover && <img src={cover.url} alt="" className="absolute inset-0 size-full object-cover" />}

        {/* Metal centre hub (30.5% of the disc, from Figma): slate ring with a white rim, sunken label, raised cap. */}
        <span className="absolute top-1/2 left-1/2 flex aspect-square w-[30.5%] -translate-1/2 items-center justify-center rounded-full bg-record-hub shadow-hub">
          <span className="flex aspect-square w-[65%] items-center justify-center rounded-full bg-record-label shadow-hub-label">
            <span className="aspect-square w-[69%] rounded-full bg-record-cap shadow-hub-cap" />
          </span>
        </span>
      </div>
    </div>
  )
}
