import { defineField, defineType } from 'sanity'

export const beforeAfterPair = defineType({
  name: 'beforeAfterPair',
  title: 'Before / after',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'before',
      title: 'Before',
      type: 'altImage',
    }),
    defineField({
      name: 'after',
      title: 'After',
      type: 'altImage',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      caption: 'caption',
      media: 'after',
    },
    prepare({ title, caption, media }) {
      return {
        title: title || caption || 'Before / after',
        media,
      }
    },
  },
})
