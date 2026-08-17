import { defineField, defineType } from 'sanity'

export const decisionItem = defineType({
  name: 'decisionItem',
  title: 'Decision',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detail',
      title: 'Detail',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'detail',
    },
  },
})
