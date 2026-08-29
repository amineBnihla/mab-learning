import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'PDF', value: 'pdf'},
          {title: 'Link', value: 'link'},
          {title: 'Repository', value: 'repository'},
          {title: 'Code', value: 'code'},
          {title: 'Slides', value: 'slides'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['https']})
          .error('Enter a secure URL beginning with https://'),
    }),
  ],
  preview: {
    select: {title: 'title', type: 'type'},
    prepare: ({title, type}) => ({title, subtitle: type?.toUpperCase()}),
  },
})
