import 'server-only'

import type {QueryParams} from 'next-sanity'

import {client} from './client'

type SanityFetchOptions<QueryString extends string> = {
  query: QueryString
  params?: QueryParams
  tags?: string[]
  revalidate?: number | false
}

export const CACHE_TAGS = {
  course: 'course',
  lesson: 'lesson',
  instructor: 'instructor',
  category: 'category',
} as const

export function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  tags = [],
  revalidate = tags.length > 0 ? false : 3600,
}: SanityFetchOptions<QueryString>) {
  return client.fetch(query, params, {
    next: {
      tags,
      revalidate,
    },
  })
}
