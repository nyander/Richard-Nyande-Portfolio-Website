import { defineField, defineType } from 'sanity'

export const deepDive = defineType({
  name: 'deepDive',
  title: 'Deep dive',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortLabel',
      title: 'Short label (tab)',
      type: 'string',
      description:
        'Optional short label used for the tab strip. Falls back to the full title if left blank.',
    }),
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'restrictedPortableText',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'attributedQuote',
    }),
    defineField({
      name: 'contribution',
      title: 'Contribution',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'constraints',
      title: 'Constraints',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'decisions',
      title: 'Decisions',
      type: 'array',
      of: [{ type: 'decisionItem' }],
    }),
    defineField({
      name: 'beforeAfter',
      title: 'Before / after',
      type: 'beforeAfterPair',
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'restrictedPortableText',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'contribution',
    },
  },
})
