import { defineField } from 'sanity'

export const STATUS_LIST = [
  { title: 'Shipped', value: 'shipped' },
  { title: 'In progress', value: 'in-progress' },
  { title: 'Concept', value: 'concept' },
] as const

export type StatusValue = (typeof STATUS_LIST)[number]['value']

export function statusField(
  spec: { name?: string; title?: string; group?: string } = {}
) {
  return defineField({
    name: spec.name ?? 'status',
    title: spec.title ?? 'Status',
    type: 'string',
    options: {
      list: [...STATUS_LIST],
      layout: 'radio',
    },
    validation: (Rule) => Rule.required(),
    group: spec.group,
  })
}
