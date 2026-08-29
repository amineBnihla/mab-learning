import {PlayIcon} from '@sanity/icons/Play'
import {defineArrayMember, defineField, defineType} from 'sanity'

const supportedVideoHosts = [
  'youtube.com',
  'www.youtube.com',
  'youtu.be',
  'vimeo.com',
  'www.vimeo.com',
  'player.vimeo.com',
  'iframe.mediadelivery.net',
  'video.bunnycdn.com',
]

function validateVideoUrl(value: string | undefined) {
  if (!value) return true

  try {
    const url = new URL(value)

    if (url.protocol !== 'https:') {
      return 'Video URL must begin with https://'
    }

    const hostname = url.hostname.toLowerCase()
    const supported = supportedVideoHosts.some(
      (host) => hostname === host || hostname.endsWith(`.${host}`),
    )

    return supported || 'Use a YouTube, Vimeo, or Bunny video URL'
  } catch {
    return 'Enter a valid video URL'
  }
}

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  icon: PlayIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'resources', title: 'Resources'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      group: 'media',
      description: 'A YouTube, Vimeo, or Bunny playback URL.',
      validation: (rule) => rule.required().custom(validateVideoUrl),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      group: 'media',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'freePreview',
      title: 'Free preview',
      type: 'boolean',
      group: 'media',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      title: 'Student count',
      type: 'number',
      group: 'content',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'blockContent',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key points',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.unique().max(6),
    }),
    defineField({
      name: 'proTip',
      title: 'Pro tip',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      group: 'resources',
      of: [defineArrayMember({type: 'resource'})],
      validation: (rule) => rule.max(12),
    }),
  ],
  preview: {
    select: {title: 'title', duration: 'duration', media: 'thumbnail'},
    prepare: ({title, duration, media}) => ({
      title,
      subtitle: duration ? `${duration} seconds` : 'Duration not set',
      media,
    }),
  },
})
