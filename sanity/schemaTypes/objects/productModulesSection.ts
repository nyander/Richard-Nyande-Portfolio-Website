import { defineField, defineType } from 'sanity'

import { sectionChromeFields } from '../constants/sectionChrome'

export const productModulesSection = defineType({
  name: 'productModulesSection',
  title: 'Product modules',
  type: 'object',
  fields: [
    ...sectionChromeFields(),
    defineField({
      name: 'items',
      title: 'Modules',
      type: 'array',
      of: [{ type: 'productModule' }],
    }),
  ],
})
