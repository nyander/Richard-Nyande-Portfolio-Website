import { defineField, defineType } from 'sanity'

import { statusField } from '../constants/status'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'brief', title: 'Reframing' },
    { name: 'modules', title: 'Product modules' },
    { name: 'dives', title: 'Deep dives' },
    { name: 'build', title: 'Design to code' },
    { name: 'outcome', title: 'Outcome' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'hero',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'hero',
      validation: (Rule) => Rule.required().integer().min(2000).max(2100),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero images',
      type: 'array',
      group: 'hero',
      of: [{ type: 'altImage' }],
    }),
    statusField({ group: 'hero' }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      group: 'hero',
      description: 'Lower numbers appear first.',
      initialValue: 0,
      validation: (Rule) => Rule.integer(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on home',
      type: 'boolean',
      group: 'hero',
      initialValue: false,
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live site URL',
      type: 'url',
      group: 'hero',
      description: 'Optional public URL. Shown in the case study header as Live site.',
    }),
    defineField({
      name: 'liveNote',
      title: 'Live site note',
      type: 'string',
      group: 'hero',
      description:
        'Optional access note under the live link, e.g. login required or available upon request.',
    }),
    defineField({
      name: 'walkthroughUrl',
      title: 'Walkthrough URL',
      type: 'url',
      group: 'hero',
      description: 'Optional YouTube or video URL, shown under the hero.',
    }),
    defineField({
      name: 'walkthroughTitle',
      title: 'Walkthrough title',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'contextFacts',
      title: 'Context facts',
      type: 'array',
      group: 'hero',
      of: [{ type: 'contextFact' }],
    }),
    defineField({
      name: 'reframing',
      title: 'Reframing / brief',
      type: 'reframing',
      group: 'brief',
    }),
    defineField({
      name: 'productModules',
      title: 'Product modules',
      type: 'productModulesSection',
      group: 'modules',
    }),
    defineField({
      name: 'deepDives',
      title: 'Deep dives',
      type: 'deepDivesSection',
      group: 'dives',
    }),
    defineField({
      name: 'designToCode',
      title: 'Design to code',
      type: 'designToCode',
      group: 'build',
    }),
    defineField({
      name: 'outcomeStatus',
      title: 'Outcome',
      type: 'outcomeStatus',
      group: 'outcome',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description:
        'Search result snippet. Keep under 160 characters. Falls back to Summary if empty.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'altImage',
      group: 'seo',
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
      status: 'status',
      media: 'heroImages.0',
    },
    prepare({ title, year, status, media }) {
      return {
        title: title || 'Untitled case study',
        subtitle: [year, status].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
