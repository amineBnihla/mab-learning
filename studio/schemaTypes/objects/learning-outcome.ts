import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {defineField, defineType} from 'sanity'

export const learningOutcome = defineType({
  name: 'learningOutcome',
  title: 'Learning outcome',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Book', value: 'book'},
          {title: 'Brain', value: 'brain'},
          {title: 'Chart', value: 'chart'},
          {title: 'Code', value: 'code'},
          {title: 'Database', value: 'database'},
          {title: 'Lightbulb', value: 'lightbulb'},
          {title: 'Target', value: 'target'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
})
