import { defineField, defineType } from 'sanity'

import { sectionChromeFields } from '../constants/sectionChrome'

export const reframing = defineType({
  name: 'reframing',
  title: 'Reframing / brief',
  type: 'object',
  fields: [
    ...sectionChromeFields(),
    defineField({
      name: 'initialProposal',
      title: 'Initial proposal',
      type: 'restrictedPortableText',
    }),
    defineField({
      name: 'discovery',
      title: 'Discovery',
      type: 'restrictedPortableText',
    }),
    defineField({
      name: 'productResponse',
      title: 'Product response',
      type: 'restrictedPortableText',
    }),
  ],
})
