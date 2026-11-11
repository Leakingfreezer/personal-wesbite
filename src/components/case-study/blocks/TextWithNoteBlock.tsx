import { site } from '../../../data/site'
import type { TextWithNoteBlock as TextWithNoteBlockData } from '../../../types/project'
import { withBold } from './inlineText'

/**
 * Case-study block: paragraphs on the left and a small, slightly tilted stat card on the right.
 * The card leads with a big purple headline number (note.stat) and one bold line, then (optional)
 * a longer finding in smaller text, then a link to its source. Stacked on phones, card below the text.
 */
export default function TextWithNoteBlock({ block }: { block: TextWithNoteBlockData }) {
  const { note } = block

  return (
    <div className="my-8 grid gap-10 md:grid-cols-[minmax(0,1fr)_18rem] md:items-start md:gap-14">
      <div className="space-y-5 text-lg leading-relaxed">
        {block.paragraphs.map((text) => (
          <p key={text}>{withBold(text)}</p>
        ))}
      </div>

      <aside className="rounded-xl bg-accent-violet-soft p-7 md:mt-2 md:rotate-3">
        {note.stat && (
          <p>
            <span className="block text-display leading-none font-semibold text-accent-violet">{note.stat.value}</span>
            <span className="mt-3 block text-lg leading-snug font-semibold">{note.stat.label}</span>
          </p>
        )}
        {note.text && (
          <p className={note.stat ? 'mt-3 text-caption text-ink-muted' : 'font-medium'}>{note.text}</p>
        )}
        {note.source && (
          <p className="mt-5 text-caption text-ink-muted">
            {site.caseStudy.sourceLabel}{' '}
            <a href={note.source.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">
              {note.source.label}
            </a>
          </p>
        )}
      </aside>
    </div>
  )
}
