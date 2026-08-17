import { defineField, defineType } from 'sanity'

export const PROVENANCE_LIST = [
  { title: 'Actual', value: 'actual' },
  { title: 'Representative', value: 'representative' },
  { title: 'Test data', value: 'test-data' },
] as const

export const altImage = defineType({
  name: 'altImage',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'provenance',
      title: 'Provenance',
      type: 'string',
      options: {
        list: [...PROVENANCE_LIST],
        layout: 'radio',
      },
      initialValue: 'actual',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
