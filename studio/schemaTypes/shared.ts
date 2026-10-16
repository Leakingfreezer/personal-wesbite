import { defineField } from 'sanity'

/**
 * Fields used by more than one content type: grid placement and images with alt text.
 * The card sizes here must match src/components/projects/gridVariants.ts in the website.
 */

export const cardSizeField = defineField({
  name: 'cardSize',
  title: 'Card size',
  type: 'string',
  description:
    'How big this is in the Past Work grid. Rows fill best when a Large sits beside two Smalls, and a Wide beside a Medium.',
  options: {
    list: [
      { title: 'Small — 1 row tall', value: 'small' },
      { title: 'Medium — 1½ rows tall', value: 'medium' },
      { title: 'Large — wide, 2 rows tall', value: 'large' },
      { title: 'Wide — wide, 1½ rows tall', value: 'wide' },
    ],
    layout: 'radio',
  },
  initialValue: 'small',
  validation: (rule) => rule.required(),
})

export const orderField = defineField({
  name: 'order',
  title: 'Display order',
  type: 'number',
  description: 'Position in the Past Work grid — 1 comes first. Projects and widgets share the same numbering.',
  validation: (rule) => rule.required().integer().min(1),
})

interface ImageFieldOptions {
  description?: string
  group?: string
  /** Decorative images (e.g. album cover) don't need alt text. */
  requireAlt?: boolean
}

/** An image upload with crop/hotspot and an alt-text field underneath. */
export function imageField(name: string, title: string, { description, group, requireAlt = true }: ImageFieldOptions = {}) {
  return defineField({
    name,
    title,
    type: 'image',
    description,
    group,
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt text',
        type: 'string',
        description: 'Describe the image for people using screen readers (e.g. "Home screen of the OneChild app").',
        validation: requireAlt ? (rule) => rule.required() : undefined,
      }),
    ],
  })
}
