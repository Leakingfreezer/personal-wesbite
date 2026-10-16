import { defineArrayMember, defineField, defineType } from 'sanity'
import { imageField, orderField } from './shared'

/**
 * WIDGETS — the little interactive pieces of the homepage.
 *   • Tech stack   → the slot-machine reel in the About section (only one is used).
 *   • Record player → sits in the Past Work grid, with a Display order shared with projects.
 */

/**
 * The About section's slot-machine reel: it spins through these tools (logo + name).
 * (Its internal name stays "techStackWidget" so documents you already made keep working.)
 */
export const techStackWidget = defineType({
  name: 'techStackWidget',
  title: 'Tech stack',
  type: 'document',
  fields: [
    defineField({
      name: 'prefix',
      title: 'Prefix',
      type: 'string',
      description: 'Grey text before the reel, e.g. "techstack/" — the reel of tools appears right after it.',
      initialValue: 'techstack/',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array',
      description: 'Apps and languages the reel spins through (each shown once), landing on each in this order. Drag to reorder.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'App / language',
              type: 'string',
              description: 'e.g. Figma, Python.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              description: 'A square logo — SVG or PNG with a transparent background works best.',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: 'name', media: 'logo' } },
        }),
      ],
      validation: (rule) => rule.min(2).max(12),
    }),
  ],
  preview: {
    select: { title: 'prefix' },
    prepare: ({ title }) => ({ title, subtitle: 'About section · slot-machine reel' }),
  },
})

/** The record player that plays one track. */
export const audioWidget = defineType({
  name: 'audioWidget',
  title: 'Record player',
  type: 'document',
  fields: [
    defineField({ name: 'songTitle', title: 'Song title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'artist', title: 'Artist', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'audio',
      title: 'Audio file',
      type: 'file',
      description: 'An MP3. Until you add one, the play button is greyed out.',
      options: { accept: 'audio/*' },
    }),
    imageField('cover', 'Cover art', {
      description: 'Optional. Fills the whole record (cropped to a circle) and spins while the song plays.',
      requireAlt: false,
    }),
    // No "Card size" here on purpose: the record player always takes a third of its row and
    // sizes itself around the record (design rule in CLAUDE.md). Put a Wide project next to it.
    orderField,
  ],
  preview: {
    select: { title: 'songTitle', artist: 'artist', order: 'order', media: 'cover' },
    prepare: ({ title, artist, order, media }) => ({
      title,
      subtitle: [artist, 'Record widget', order ? `#${order}` : null].filter(Boolean).join(' · '),
      media,
    }),
  },
})
