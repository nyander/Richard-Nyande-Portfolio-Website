import { defineField, defineType } from 'sanity'

import { statusField } from '../constants/status'

export const productModule = defineType({
  name: 'productModule',
  title: 'Product module',
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
      title: 'Short label (pill / tab)',
      type: 'string',
      description:
        'Optional short label used for the pill strip. Falls back to the full title if left blank.',
    }),
    defineField({
      name: 'teaser',
      title: 'Teaser',
      type: 'text',
      rows: 2,
    }),
    statusField(),
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'restrictedPortableText',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'restrictedPortableText',
    }),
    defineField({
      name: 'screenshot',
      title: 'Screenshot',
      type: 'altImage',
      description: 'Shown in the sticky visual panel when this module is open.',
    }),
    defineField({
      name: 'before',
      title: 'Before',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'after',
      title: 'After',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'beforeAfterImages',
      title: 'Before / after images',
      type: 'beforeAfterPair',
      description: 'Shown under the before/after lists inside "Find out more".',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
    },
  },
})
