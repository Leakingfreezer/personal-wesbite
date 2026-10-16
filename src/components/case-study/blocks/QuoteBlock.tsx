import type { QuoteBlock as QuoteBlockData } from '../../../types/project'

/** Case-study block: a large pulled-out quote with who said it. */
export default function QuoteBlock({ block }: { block: QuoteBlockData }) {
  return (
    <figure className="mx-auto my-14 max-w-4xl md:my-20">
      <blockquote className="text-heading font-medium">“{block.text}”</blockquote>
      {block.attribution && <figcaption className="mt-4 text-caption text-ink-muted">— {block.attribution}</figcaption>}
    </figure>
  )
}
