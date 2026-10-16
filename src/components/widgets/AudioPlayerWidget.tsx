import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'
import type { AudioWidget } from '../../types/gallery'
import RecordDisc from './RecordDisc'

interface AudioPlayerWidgetProps {
  widget: AudioWidget
}

/**
 * A little record player in the Past Work grid (Irene's design: grainy grey card, grey record).
 *
 *   • The record (with the album cover on it) shows its lower half at the top of the card,
 *     then the artist, the title and a round play / pause button.
 *   • Click the button — or anywhere on the card — to play or pause.
 *   • While playing, the record spins like a vinyl; paused, it stops where it is.
 *
 * DESIGN RULE: the card always fits around the record. The record is always the card's full
 * width and never shrinks; the card's height follows from it (half the record + the text
 * below). If the grid row is taller, the extra space goes evenly around the text.
 */
export default function AudioPlayerWidget({ widget }: AudioPlayerWidgetProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const hasTrack = Boolean(widget.audioUrl)
  const StateIcon = isPlaying ? Pause : Play

  function togglePlayback() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      // The browser may refuse to play (e.g. file missing). Then no "play" event fires,
      // so the card simply stays paused — nothing else to handle.
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }

  const buttonLabel = !hasTrack
    ? `“${widget.songTitle}” by ${widget.artist} — track coming soon`
    : `${isPlaying ? 'Pause' : 'Play'} “${widget.songTitle}” by ${widget.artist}`

  return (
    <div
      // [container-type:inline-size] lets the record and button measure the card's width (cqw).
      className="group relative flex h-full flex-col overflow-hidden rounded-card bg-player bg-grain [container-type:inline-size]"
    >
      <RecordDisc recordImage={widget.recordImage} cover={widget.cover} isPlaying={isPlaying} />

      {/* Reserves the visible half of the record (half the card's width) so the text sits below it. */}
      <div aria-hidden className="aspect-2/1 w-full shrink-0" />

      {/* Artist, title and the round play/pause button — centred in the space below the record. */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-5 pb-6 text-center">
        <p className="max-w-full truncate text-caption text-ink-muted">{widget.artist}</p>
        <p className="max-w-full truncate text-nav leading-tight font-semibold tracking-tight">{widget.songTitle}</p>

        {/* The real play/pause button (keyboard: Tab + Enter/Space). Sits above the card-wide click area. */}
        <button
          type="button"
          onClick={togglePlayback}
          disabled={!hasTrack}
          aria-label={buttonLabel}
          title={buttonLabel}
          className="relative z-30 mt-4 flex size-[clamp(2.5rem,13cqw,3.5rem)] cursor-pointer items-center justify-center rounded-full bg-ink/15 text-canvas shadow-player-button transition-colors duration-300 group-hover:bg-ink/25 disabled:cursor-default disabled:opacity-60"
        >
          {/* The play triangle is nudged right a touch so it looks centred (its weight sits on the left). */}
          <StateIcon
            aria-hidden
            className={`size-[40%] fill-current ${isPlaying ? '' : 'translate-x-[8%]'}`}
            strokeWidth={0}
          />
        </button>
      </div>

      {/* Clicking anywhere else on the card plays / pauses too (mouse convenience — keyboard uses the button). */}
      {hasTrack && <div aria-hidden onClick={togglePlayback} className="absolute inset-0 z-20 cursor-pointer" />}

      {hasTrack && (
        <audio
          ref={audioRef}
          src={widget.audioUrl}
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </div>
  )
}
