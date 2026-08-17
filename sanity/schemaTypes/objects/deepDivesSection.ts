import { defineField, defineType } from 'sanity'

import { sectionChromeFields } from '../constants/sectionChrome'

export const deepDivesSection = defineType({
  name: 'deepDivesSection',
  title: 'Deep dives',
  type: 'object',
  fields: [
    ...sectionChromeFields(),
    defineField({
      name: 'items',
      title: 'Deep dives',
      type: 'array',
      of: [{ type: 'deepDive' }],
    }),
  ],
})
