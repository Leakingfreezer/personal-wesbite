interface EqualizerIconProps {
  /** Bars bounce while true, and freeze in place while false. */
  isPlaying: boolean
}

/** Bar heights (% of the icon) when still — a little uneven, like a sound wave. */
const barHeights = [40, 75, 100, 60, 35]

/**
 * Five small bars that bounce while music plays (CSS animation `animate-eq-bar`).
 * Each bar starts at a different point in the bounce so they don't move in sync.
 * Frozen for people who prefer reduced motion.
 */
export default function EqualizerIcon({ isPlaying }: EqualizerIconProps) {
  return (
    <span aria-hidden className="flex h-4 items-center gap-[3px]">
      {barHeights.map((height, index) => (
        <span
          key={index}
          className="w-0.5 rounded-full bg-line animate-eq-bar motion-reduce:animate-none"
          style={{
            height: `${height}%`,
            animationDelay: `${index * -0.17}s`,
            animationPlayState: isPlaying ? 'running' : 'paused',
          }}
        />
      ))}
    </span>
  )
}
