import { defineField, defineType } from 'sanity'

export const archiveProject = defineType({
  name: 'archiveProject',
  title: 'Archive Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(2000).max(2100),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
      description: 'One line.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'altImage',
    }),
    defineField({
      name: 'linkType',
      title: 'Link type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description:
        'Internal path (/work/…) or full URL. Internal hrefs are format-checked here; the query layer must also confirm they match lib/routes.ts (static paths or a published caseStudy slug).',
      validation: (Rule) =>
        Rule.required().custom((href, context) => {
          if (!href) return true
          const parent = context.parent as { linkType?: string } | undefined
          if (parent?.linkType === 'internal' && !href.startsWith('/')) {
            return 'Internal links must start with /'
          }
          if (
            parent?.linkType === 'external' &&
            !/^https?:\/\//.test(href)
          ) {
            return 'External links must start with http:// or https://'
          }
          return true
        }),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
      validation: (Rule) => Rule.integer(),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Year (newest first)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      summary: 'summary',
      media: 'thumbnail',
    },
    prepare({ title, year, summary, media }) {
      return {
        title: title || 'Untitled archive project',
        subtitle: [year, summary].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
