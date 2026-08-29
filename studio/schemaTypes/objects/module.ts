import {BlockContentIcon} from '@sanity/icons/BlockContent'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const courseModule = defineType({
  name: 'module',
  title: 'Module',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'lesson'}]})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
  ],
  preview: {
    select: {title: 'title', lessons: 'lessons'},
    prepare: ({title, lessons}) => {
      const count = Array.isArray(lessons) ? lessons.length : 0
      return {title, subtitle: `${count} ${count === 1 ? 'lesson' : 'lessons'}`}
    },
  },
})
