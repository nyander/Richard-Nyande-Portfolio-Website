import { defineField, defineType } from 'sanity'

import { sectionChromeFields } from '../constants/sectionChrome'

export const designToCode = defineType({
  name: 'designToCode',
  title: 'Design to code',
  type: 'object',
  fields: [
    ...sectionChromeFields(),
    defineField({
      name: 'framing',
      title: 'Framing',
      type: 'restrictedPortableText',
    }),
    defineField({
      name: 'decisions',
      title: 'Decisions',
      type: 'array',
      of: [{ type: 'decisionItem' }],
    }),
    defineField({
      name: 'figmaImage',
      title: 'Figma',
      type: 'altImage',
    }),
    defineField({
      name: 'shippedImage',
      title: 'Shipped',
      type: 'altImage',
    }),
    defineField({
      name: 'stackTags',
      title: 'Stack tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
})
