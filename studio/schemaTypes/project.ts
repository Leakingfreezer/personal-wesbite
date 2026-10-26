import { defineArrayMember, defineField, defineType } from 'sanity'
import { cardSizeField, imageField, orderField } from './shared'

/**
 * Ready-made words for a project's Headline (the label on its Past Work card).
 * Add or remove words here. "Custom…" lets you type your own in the field below it.
 */
const headlineOptions = [
  { title: 'Scale', value: 'Scale' },
  { title: 'Launch', value: 'Launch' },
  { title: 'Growth', value: 'Growth' },
  { title: 'Redesign', value: 'Redesign' },
  { title: 'Research', value: 'Research' },
  { title: 'Custom…', value: 'custom' },
]

/**
 * A PROJECT — one card in the Past Work grid plus its case-study page at /work/<slug>.
 * Fields are split into tabs (groups) so the editor stays tidy.
 * Publishing uses Sanity's built-in Draft → Publish: the website only ever shows published projects.
 */
export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'images', title: 'Images' },
    { name: 'grid', title: 'Grid placement' },
    { name: 'caseStudy', title: 'Case study' },
  ],
  fields: [
    /* ── Basics ── */
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'basics', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'basics',
      description: 'The case study lives at /work/<slug>. Click "Generate" to make one from the title.',
      options: { source: 'title', maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 2,
      group: 'basics',
      description: 'One sentence shown under the title on the case-study page.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'basics',
      description: 'e.g. Product Design, UX Research. Shown on the card and case study.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      group: 'basics',
      description: 'Optional. A short label on the Past Work card, e.g. "Scale". Pick one, or "Custom…" to type your own.',
      options: { list: headlineOptions },
    }),
    defineField({
      name: 'customHeadline',
      title: 'Custom headline',
      type: 'string',
      group: 'basics',
      description: 'Your own word or short phrase, e.g. "Zero to one". Keep it short — it sits in a small label.',
      // Only shown when "Custom…" is picked above.
      hidden: ({ parent }) => (parent as { headline?: string } | undefined)?.headline !== 'custom',
      validation: (rule) =>
        rule.max(30).custom((value, context) => {
          const picked = (context.parent as { headline?: string } | undefined)?.headline
          return picked === 'custom' && !value?.trim() ? 'Type your custom headline, or pick another option.' : true
        }),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'basics',
      validation: (rule) => rule.required().integer().min(2000).max(2100),
    }),
    defineField({ name: 'role', title: 'Your role', type: 'string', group: 'basics', validation: (rule) => rule.required() }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      group: 'basics',
      description: 'Optional, e.g. "Jan – Apr 2025" or "8 weeks".',
    }),
    defineField({
      name: 'tools',
      title: 'Tools & technologies',
      type: 'array',
      group: 'basics',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),

    /* ── Images ── */
    imageField('thumbnail', 'Thumbnail', {
      group: 'images',
      description: 'The image on the Past Work card. Leave empty for a light-gray placeholder.',
    }),
    imageField('heroImage', 'Hero image', {
      group: 'images',
      description: 'The big image at the top of the case study.',
    }),

    /* ── Grid placement ── */
    { ...cardSizeField, group: 'grid' },
    { ...orderField, group: 'grid' },
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'grid',
      description: 'Marks a highlight project (not used for layout yet).',
      initialValue: false,
    }),
    defineField({
      name: 'comingSoon',
      title: 'Coming soon',
      type: 'boolean',
      group: 'grid',
      description: 'Turn on while the case study is not ready: the card cannot be clicked and shows "Coming soon" on hover.',
      initialValue: false,
    }),

    /* ── Case study ── */
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 4,
      group: 'caseStudy',
      description: 'A short summary: what it is, who it was for, why it mattered.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Case study content',
      type: 'array',
      group: 'caseStudy',
      description: 'Add as many sections as you like, in any order. Use "Heading" to start a new section.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
          ],
          lists: [
            { title: 'Bullets', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) => rule.required().uri({ scheme: ['http', 'https', 'mailto'] }),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({ type: 'imageBlock' }),
        defineArrayMember({ type: 'gallery' }),
        defineArrayMember({ type: 'metrics' }),
        defineArrayMember({ type: 'quote' }),
        defineArrayMember({ type: 'table' }),
      ],
    }),
    defineField({
      name: 'links',
      title: 'External links',
      type: 'array',
      group: 'caseStudy',
      description: 'Optional, e.g. a live site, prototype or GitHub repo.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'comingSoon',
              title: 'Coming soon',
              type: 'boolean',
              description: 'Turn on when there is no URL yet: it shows as "Label — Coming soon", not clickable.',
              initialValue: false,
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              hidden: ({ parent }) => parent?.comingSoon === true,
              validation: (rule) =>
                rule.uri({ scheme: ['http', 'https'] }).custom((url, context) => {
                  const parent = context.parent as { comingSoon?: boolean } | undefined
                  return url || parent?.comingSoon ? true : 'Add a URL, or turn on "Coming soon".'
                }),
            }),
          ],
          preview: {
            select: { title: 'label', url: 'url', comingSoon: 'comingSoon' },
            prepare: ({ title, url, comingSoon }) => ({ title, subtitle: comingSoon ? 'Coming soon' : url }),
          },
        }),
      ],
    }),
  ],

  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],

  preview: {
    select: { title: 'title', category: 'category', order: 'order', media: 'thumbnail' },
    prepare: ({ title, category, order, media }) => ({
      title,
      subtitle: [order ? `#${order}` : null, category].filter(Boolean).join(' · '),
      media,
    }),
  },
})
