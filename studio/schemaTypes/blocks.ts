import { defineArrayMember, defineField, defineType } from 'sanity'
import { imageField } from './shared'

/**
 * CUSTOM CASE-STUDY BLOCKS — the non-text pieces you can drop into a case study.
 * Each one is drawn on the website by a matching component in src/components/case-study/blocks/.
 */

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image',
  type: 'object',
  fields: [
    imageField('image', 'Image'),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
  ],
  preview: {
    select: { caption: 'caption', media: 'image' },
    prepare: ({ caption, media }) => ({ title: caption || 'Image', subtitle: 'Image block', media }),
  },
})

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Shown side by side, cropped to the same shape.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(2),
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
  ],
  preview: {
    select: { caption: 'caption', media: 'images.0' },
    prepare: ({ caption, media }) => ({ title: caption || 'Gallery', subtitle: 'Gallery block', media }),
  },
})

export const metrics = defineType({
  name: 'metrics',
  title: 'Key metrics',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Metrics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Number',
              type: 'string',
              description: 'e.g. "40%", "3×", "1,200"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'What it measures',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
      validation: (rule) => rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: { first: 'items.0.value', label: 'items.0.label' },
    prepare: ({ first, label }) => ({ title: first ? `${first} ${label ?? ''}` : 'Key metrics', subtitle: 'Metrics block' }),
  },
})

export const table = defineType({
  name: 'table',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional. What the table shows, e.g. "Key product decisions at a glance".',
    }),
    defineField({
      name: 'columns',
      title: 'Column headings',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(2).max(5),
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      description: 'One cell per column, in the same order. The first cell is the row heading.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tableRow',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { first: 'cells.0', second: 'cells.1' },
            prepare: ({ first, second }) => ({ title: first || 'Row', subtitle: second }),
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { caption: 'caption', first: 'columns.0' },
    prepare: ({ caption, first }) => ({ title: caption || first || 'Table', subtitle: 'Table block' }),
  },
})

export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({ name: 'text', title: 'Quote', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'attribution', title: 'Who said it', type: 'string', description: 'e.g. "Maya, user tester"' }),
  ],
  preview: {
    select: { title: 'text', subtitle: 'attribution' },
  },
})
