import type { PortableTextBlock } from '@portabletext/react'
import type { ImageBlock, MetricsBlock, ProjectImage, QuoteBlock, TableBlock } from '../types/project'

/**
 * SMALL HELPERS FOR WRITING A CASE STUDY in src/data/projects.ts.
 * Each one returns one piece of the page, in the format CaseStudyContent already knows how to draw:
 *
 *   h2('Research')                         → section heading
 *   h3('Two kinds of advocates')           → subheading
 *   p('Text with **bold** parts.')         → paragraph (wrap words in ** to make them bold)
 *   ...bullets(['One', 'Two'])             → bullet list (note the ... in front)
 *   metrics([['89%', 'what it means']])    → row of big numbers
 *   quote('Text', 'Who said it')           → pulled-out quote
 *   table('Caption', [columns], [[row]])   → comparison table
 *   image({ url, alt, width, height }, 'Caption')  → big image (leave out the image for a placeholder)
 */

/** Every piece needs a unique key so React can tell them apart. A counter is enough. */
let nextKey = 0
const key = () => `b${nextKey++}`

/** Splits 'Some **bold** text' into normal and bold pieces. */
function spans(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith('**')
        ? { _type: 'span', _key: key(), text: part.slice(2, -2), marks: ['strong'] }
        : { _type: 'span', _key: key(), text: part, marks: [] },
    )
}

function textBlock(style: 'normal' | 'h2' | 'h3', text: string): PortableTextBlock {
  return { _type: 'block', _key: key(), style, markDefs: [], children: spans(text) }
}

export const h2 = (text: string) => textBlock('h2', text)
export const h3 = (text: string) => textBlock('h3', text)
export const p = (text: string) => textBlock('normal', text)

export function bullets(items: string[]): PortableTextBlock[] {
  return items.map((text) => ({ ...textBlock('normal', text), listItem: 'bullet', level: 1 }))
}

export function metrics(items: [value: string, label: string][]): MetricsBlock {
  return { _type: 'metrics', _key: key(), items: items.map(([value, label]) => ({ value, label })) }
}

export function quote(text: string, attribution?: string): QuoteBlock {
  return { _type: 'quote', _key: key(), text, attribution }
}

export function table(caption: string, columns: string[], rows: string[][]): TableBlock {
  return { _type: 'table', _key: key(), caption, columns, rows: rows.map((cells) => ({ _key: key(), cells })) }
}

export function image(picture: ProjectImage | undefined, caption?: string): ImageBlock {
  return { _type: 'imageBlock', _key: key(), image: picture, caption }
}
