import type { PortableTextBlock } from '@portabletext/react'
import type {
  FlowBlock,
  GalleryBlock,
  ImageBlock,
  MaterialsBlock,
  MaterialsFolder,
  Metric,
  MetricsBlock,
  OperatingModelBlock,
  OperatingStage,
  PhotoGridBlock,
  PhotoSlot,
  ProjectImage,
  QuoteBlock,
  SectionBlock,
  TableBlock,
  TextWithNoteBlock,
} from '../types/project'

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
 *   gallery([photoA, photoB], 'Caption')   → images side by side (undefined = placeholder)
 *   flow('Caption', [steps])               → steps joined by arrows; a step is 'Title' or ['Title', 'Short description']
 *   flowLanes('Caption', [['Lane label', [steps]], …])  → several flows stacked, e.g. frontstage over backstage
 *
 *   diagram(image, 'Caption')              → wide diagram; scrolls sideways on phones so its text stays readable
 *   section('Problem')                    → small section label with a thin line (the section's h2)
 *   compactMetrics([['10', 'workshops']])  → one line of smaller numbers (add true as a 3rd item to colour one purple)
 *   textWithNote([paragraphs], { stat: { value, label }, text, source: { label, url } })
 *                                          → text left, tilted stat card right (stat = optional big headline number)
 *   photoGrid([3 slots], 'Quote', { title, images, caption })
 *                                          → photo mosaic + purple quote card + a folder of materials that opens;
 *                                            a slot is a photo or 'Placeholder name'
 *   materials([images], 'Caption')         → row of flyers/posts at the same height, uncropped
 *   operatingModel({ title, workstreams, delivery, retrospective })  → workstreams → delivery → retrospective loop
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

/** A wide diagram with small text: on phones it keeps a readable size and scrolls sideways. */
export function diagram(picture: ProjectImage | undefined, caption?: string): ImageBlock {
  return { _type: 'imageBlock', _key: key(), image: picture, caption, scrollOnPhones: true }
}

export function gallery(pictures: (ProjectImage | undefined)[], caption?: string): GalleryBlock {
  return { _type: 'gallery', _key: key(), images: pictures, caption }
}

/** A step is just its title, or [title, short description]. */
type Step = string | [title: string, description: string]

const toStep = (step: Step) => (typeof step === 'string' ? { title: step } : { title: step[0], description: step[1] })

export function flow(caption: string | undefined, steps: Step[]): FlowBlock {
  return { _type: 'flow', _key: key(), caption, lanes: [{ _key: key(), steps: steps.map(toStep) }] }
}

export function flowLanes(caption: string | undefined, lanes: [label: string, steps: Step[]][]): FlowBlock {
  return {
    _type: 'flow',
    _key: key(),
    caption,
    lanes: lanes.map(([label, steps]) => ({ _key: key(), label, steps: steps.map(toStep) })),
  }
}

export function section(label: string): SectionBlock {
  return { _type: 'section', _key: key(), label }
}

/** [value, label] or [value, label, true] to colour that number purple. */
type MetricInput = [value: string, label: string, highlight?: boolean]

const toMetric = ([value, label, highlight]: MetricInput): Metric => ({ value, label, highlight })

/** The same list as metrics(), but smaller numbers in one line. Also used for a project's keyMetrics. */
export function compactMetrics(items: MetricInput[]): MetricsBlock {
  return { _type: 'metrics', _key: key(), items: items.map(toMetric), compact: true }
}

/** For a project's `keyMetrics` (the numbers under the hero image). */
export const keyMetrics = (items: MetricInput[]): Metric[] => items.map(toMetric)

export function textWithNote(paragraphs: string[], note: TextWithNoteBlock['note']): TextWithNoteBlock {
  return { _type: 'textWithNote', _key: key(), paragraphs, note }
}

/** A slot is a photo, or a string naming the photo that still needs to be added. */
type SlotInput = ProjectImage | string

const toSlot = (slot: SlotInput): PhotoSlot =>
  typeof slot === 'string' ? { placeholder: slot } : { image: slot, placeholder: slot.alt }

export function photoGrid(
  photo: SlotInput,
  quoteText: string,
  folder: MaterialsFolder,
  caption?: string,
): PhotoGridBlock {
  return { _type: 'photoGrid', _key: key(), photo: toSlot(photo), quote: quoteText, folder, caption }
}

export function materials(images: ProjectImage[], caption?: string): MaterialsBlock {
  return { _type: 'materials', _key: key(), images, caption }
}

export function operatingModel(model: {
  title: string
  subtitle?: string
  workstreams: OperatingStage[]
  delivery: OperatingStage
  retrospective: OperatingStage
  loopNote?: string
}): OperatingModelBlock {
  return {
    _type: 'operatingModel',
    _key: key(),
    ...model,
    workstreams: model.workstreams.map((stage) => ({ ...stage, _key: key() })),
  }
}
