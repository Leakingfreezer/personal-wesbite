import { useRef, useState } from 'react'
import type { AudioWidget } from '../../types/gallery'
import EqualizerIcon from './EqualizerIcon'
import RecordDisc from './RecordDisc'

interface AudioPlayerWidgetProps {
  widget: AudioWidget
}

/** 75.4 seconds → "1:15". Shows "–:––" until the length is known. */
function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return '–:––'
  const minutes = Math.floor(seconds / 60)
  const rest = Math.floor(seconds % 60)
  return `${minutes}:${rest.toString().padStart(2, '0')}`
}

/** Phones and tablets can't hover, so the cover reveal works differently there (see isExpanded). */
const canHover = () => window.matchMedia('(hover: hover)').matches

/**
 * A little record player in the Past Work grid (based on Irene's Pinterest reference).
 *
 *   • Click anywhere on the card to play / pause (the whole card is one invisible button).
 *   • While playing: the record spins, the equalizer bars bounce, the bar and time count up.
 *   • Hover (or keyboard focus): the record turns upright and grows to show the whole cover.
 *     On touch screens, which can't hover, the cover shows while the song is playing.
 *
 * DESIGN RULE: the card always fits around the record. The record is always the card's full
 * width and never shrinks; the card's height follows from it (half the record + the text
 * below). If the grid row is taller, the extra space goes evenly around the text.
 */
export default function AudioPlayerWidget({ widget }: AudioPlayerWidgetProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(Number.NaN)
  const [isHovered, setIsHovered] = useState(false)
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false)

  const hasTrack = Boolean(widget.audioUrl)
  const progress = duration > 0 ? currentTime / duration : 0
  // Only grow when there's a cover to show.
  const isExpanded = Boolean(widget.cover) && (isHovered || isKeyboardFocused || (!canHover() && isPlaying))

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
      // [container-type:inline-size] lets the record measure the card's width (100cqw).
      className="relative flex h-full flex-col overflow-hidden rounded-card bg-surface [container-type:inline-size]"
      onPointerEnter={(event) => event.pointerType === 'mouse' && setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <RecordDisc
        recordImage={widget.recordImage}
        cover={widget.cover}
        isPlaying={isPlaying}
        isExpanded={isExpanded}
      />

      {/* Reserves the visible half of the record (half the card's width) so the text sits below it. */}
      <div aria-hidden className="aspect-2/1 w-full shrink-0" />

      {/* Equalizer, artist, title, progress bar and time — centred in the space below the record. */}
      <div className="flex flex-1 flex-col items-center justify-center gap-1 px-4 pt-4 pb-6">
        <span className="mb-1">
          <EqualizerIcon isPlaying={isPlaying} />
        </span>
        <p className="text-caption text-line">{widget.artist}</p>
        <p className="text-caption font-semibold">{widget.songTitle}</p>

        {/*
          Progress bar: a grey track with a dark fill that grows as the song plays.
          The fill is stretched with scaleX (smooth and cheap for the browser); the short
          transition smooths the jumps between updates and is off for reduced motion.
        */}
        <div
          role="progressbar"
          aria-label="Song progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          className="mt-2 h-1 w-[min(60%,10rem)] overflow-hidden rounded-full bg-surface-strong"
        >
          <div
            className="h-full origin-left rounded-full bg-ink transition-transform duration-300 ease-linear motion-reduce:transition-none"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        {/* "1:15 / 2:26" — tabular-nums keeps the digits from jiggling as they change. */}
        <p className="mt-1 text-caption tabular-nums">
          <span className="font-semibold">{formatTime(currentTime)}</span>
          <span className="text-line"> / {formatTime(duration)}</span>
        </p>
      </div>

      {/* The whole card is the play/pause button. It sits on top of everything, invisible. */}
      <button
        type="button"
        onClick={togglePlayback}
        disabled={!hasTrack}
        aria-label={buttonLabel}
        title={buttonLabel}
        className="absolute inset-0 z-20 cursor-pointer rounded-card disabled:cursor-default"
        onFocus={(event) => setIsKeyboardFocused(event.currentTarget.matches(':focus-visible'))}
        onBlur={() => setIsKeyboardFocused(false)}
      />

      {hasTrack && (
        <audio
          ref={audioRef}
          src={widget.audioUrl}
          // Load just the song's length up front, so the total time shows before it's played.
          preload="metadata"
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onEnded={() => {
            setIsPlaying(false)
            setCurrentTime(0)
          }}
        />
      )}
    </div>
  )
}
