import { defineField, defineType } from 'sanity'

import { sectionChromeFields } from '../constants/sectionChrome'

export const outcomeStatus = defineType({
  name: 'outcomeStatus',
  title: 'Outcome',
  type: 'object',
  fields: [
    ...sectionChromeFields(),
    defineField({
      name: 'statusSummary',
      title: 'Status summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'whatsNext',
      title: "What's next",
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'quotes',
      title: 'Attributed quotes',
      type: 'array',
      of: [{ type: 'attributedQuote' }],
    }),
    defineField({
      name: 'evidence',
      title: 'Evidence points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'reflection',
      title: 'Reflection',
      type: 'restrictedPortableText',
    }),
  ],
})
