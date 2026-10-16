import type { RichText as RichTextValue, TextMark } from '../../data/site'
import { playHoverSound } from '../../lib/hoverSound'

interface RichTextProps {
  text: RichTextValue
}

/** Highlights get a slightly tilted, rounded marker swipe that straightens on hover. */
const highlight =
  'inline-block rounded-[0.25em] px-[0.12em] leading-tight transition-transform duration-300 hover:rotate-0 motion-reduce:transition-none'

/** What each mark looks like. To add a new style, add it to TextMark in site.ts and here. */
const markClass: Record<TextMark, string> = {
  underline: 'underline decoration-accent-violet decoration-[0.08em] underline-offset-[0.15em]',
  pink: `${highlight} -rotate-1 bg-highlight-pink`,
  blue: `${highlight} rotate-1 bg-highlight-blue`,
  yellow: `${highlight} -rotate-1 bg-highlight-yellow`,
}

/** Draws a sentence from site.ts where some words are highlighted or underlined. */
export default function RichText({ text }: RichTextProps) {
  return text.map((part, index) =>
    typeof part === 'string' ? (
      part
    ) : (
      <span
        key={index}
        className={markClass[part.mark]}
        // Highlights snap when hovered; the plain underline stays quiet.
        onPointerEnter={part.mark === 'underline' ? undefined : playHoverSound}
      >
        {part.text}
      </span>
    ),
  )
}
