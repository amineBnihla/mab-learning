import {readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'

const seedPath = fileURLToPath(
  new URL('../../../course-kit/seed.ndjson', import.meta.url),
)
const videosPath = fileURLToPath(
  new URL('../../../course-kit/videos.json', import.meta.url),
)

const expectedCounts = {
  category: 6,
  instructor: 5,
  course: 10,
  lesson: 120,
}

const allowedLevels = new Set(['beginner', 'intermediate', 'advanced'])
const allowedOutcomeIcons = new Set([
  'code',
  'gauge',
  'layers',
  'puzzle',
  'rocket',
  'shield',
  'sparkles',
  'workflow',
])
const allowedResourceTypes = new Set(['pdf', 'link', 'repository', 'code', 'slides'])

const issues = []

function fail(message) {
  issues.push(message)
}

function parseNdjson(source) {
  return source
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line)
      } catch (error) {
        throw new Error(`Invalid NDJSON on line ${index + 1}: ${error.message}`)
      }
    })
}

function walk(value, visitor, context = {inArray: false, path: '$'}) {
  visitor(value, context)

  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      walk(item, visitor, {inArray: true, path: `${context.path}[${index}]`}),
    )
    return
  }

  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      walk(child, visitor, {inArray: false, path: `${context.path}.${key}`})
    }
  }
}

function assertPortableText(value, owner, field) {
  if (!Array.isArray(value) || value.length === 0) {
    fail(`${owner}.${field} must be a non-empty Portable Text array`)
    return
  }

  value.forEach((block, blockIndex) => {
    if (block?._type !== 'block' || !block._key || !Array.isArray(block.children)) {
      fail(`${owner}.${field}[${blockIndex}] is not a valid Portable Text block`)
      return
    }

    if (!Array.isArray(block.markDefs)) {
      fail(`${owner}.${field}[${blockIndex}].markDefs must be an array`)
    }

    block.children.forEach((span, spanIndex) => {
      if (
        span?._type !== 'span' ||
        !span._key ||
        typeof span.text !== 'string' ||
        !Array.isArray(span.marks)
      ) {
        fail(`${owner}.${field}[${blockIndex}].children[${spanIndex}] is invalid`)
      }
    })
  })
}

function assertImage(image, owner, field) {
  const directive = image?._sanityAsset
  if (
    image?._type !== 'image' ||
    typeof directive !== 'string' ||
    !directive.startsWith('image@https://')
  ) {
    fail(`${owner}.${field} must contain an HTTPS Sanity image directive`)
  }

  if (typeof image?.alt !== 'string' || image.alt.trim() === '') {
    fail(`${owner}.${field}.alt is required`)
  }
}

function youtubeId(urlValue) {
  try {
    const url = new URL(urlValue)
    if (!['www.youtube.com', 'youtube.com'].includes(url.hostname)) return undefined
    return url.searchParams.get('v') || undefined
  } catch {
    return undefined
  }
}

const [seedSource, videosSource] = await Promise.all([
  readFile(seedPath, 'utf8'),
  readFile(videosPath, 'utf8'),
])

const documents = parseNdjson(seedSource)
const videos = JSON.parse(videosSource)
const documentsById = new Map()
const slugs = new Set()
const typeCounts = new Map()
const referenceTargets = []
const lessonOwners = new Map()
let imageDirectiveCount = 0

for (const document of documents) {
  const label = document?._id || '<missing-id>'

  if (!document || typeof document !== 'object' || Array.isArray(document)) {
    fail('Every NDJSON line must be a document object')
    continue
  }

  if (typeof document._id !== 'string' || document._id === '') {
    fail('Every document needs a non-empty _id')
  } else if (documentsById.has(document._id)) {
    fail(`Duplicate document ID: ${document._id}`)
  } else {
    documentsById.set(document._id, document)
  }

  typeCounts.set(document._type, (typeCounts.get(document._type) || 0) + 1)

  const slug = document.slug?.current
  if (typeof slug !== 'string' || slug === '') {
    fail(`${label} needs a slug.current value`)
  } else {
    const slugKey = `${document._type}:${slug}`
    if (slugs.has(slugKey)) fail(`Duplicate slug: ${slugKey}`)
    slugs.add(slugKey)
  }

  walk(document, (value, context) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return

    if (context.inArray && value._type && !value._key) {
      fail(`${label}${context.path.slice(1)} is missing _key`)
    }

    if (typeof value._ref === 'string') referenceTargets.push(value._ref)
    if (typeof value._sanityAsset === 'string') imageDirectiveCount += 1
  })

  if (document._type === 'category') {
    if (typeof document.title !== 'string' || typeof document.description !== 'string') {
      fail(`${label} has invalid category content`)
    }
  }

  if (document._type === 'instructor') {
    assertImage(document.photo, label, 'photo')
    assertPortableText(document.bio, label, 'bio')
  }

  if (document._type === 'course') {
    assertImage(document.coverImage, label, 'coverImage')

    if (!allowedLevels.has(document.level)) fail(`${label} has unsupported level ${document.level}`)
    if (!Array.isArray(document.modules) || document.modules.length !== 4) {
      fail(`${label} must contain exactly four modules`)
    }
    if (!Array.isArray(document.learningOutcomes) || document.learningOutcomes.length > 6) {
      fail(`${label} has invalid learning outcomes`)
    }

    for (const outcome of document.learningOutcomes || []) {
      if (!allowedOutcomeIcons.has(outcome.icon)) {
        fail(`${label} uses unsupported outcome icon ${outcome.icon}`)
      }
    }

    const courseLessonRefs = (document.modules || []).flatMap((module) => {
      if (!Array.isArray(module.lessons) || module.lessons.length !== 3) {
        fail(`${label}.${module?._key || 'module'} must contain exactly three lessons`)
      }
      return (module.lessons || []).map((reference) => reference._ref)
    })

    if (courseLessonRefs.length !== 12) fail(`${label} must reference exactly twelve lessons`)
    for (const reference of courseLessonRefs) {
      lessonOwners.set(reference, (lessonOwners.get(reference) || 0) + 1)
    }
  }

  if (document._type === 'lesson') {
    assertImage(document.thumbnail, label, 'thumbnail')
    assertPortableText(document.notes, label, 'notes')

    if (!Number.isInteger(document.duration) || document.duration <= 0) {
      fail(`${label}.duration must be a positive integer`)
    }
    if (!youtubeId(document.videoUrl)) fail(`${label}.videoUrl must be a valid YouTube URL`)
    if (!Array.isArray(document.keyPoints) || document.keyPoints.length > 6) {
      fail(`${label} has invalid key points`)
    }

    for (const resource of document.resources || []) {
      if (!allowedResourceTypes.has(resource.type)) {
        fail(`${label} uses unsupported resource type ${resource.type}`)
      }
      try {
        const resourceUrl = new URL(resource.url)
        if (resourceUrl.protocol !== 'https:') throw new Error('not https')
      } catch {
        fail(`${label} has an invalid resource URL`)
      }
    }
  }
}

for (const [type, expected] of Object.entries(expectedCounts)) {
  const actual = typeCounts.get(type) || 0
  if (actual !== expected) fail(`Expected ${expected} ${type} documents, found ${actual}`)
}

if (documents.length !== 141) fail(`Expected 141 documents, found ${documents.length}`)
if (referenceTargets.length !== 140) {
  fail(`Expected 140 references, found ${referenceTargets.length}`)
}
if (imageDirectiveCount !== 135) {
  fail(`Expected 135 image directives, found ${imageDirectiveCount}`)
}

for (const reference of referenceTargets) {
  if (!documentsById.has(reference)) fail(`Unresolved reference: ${reference}`)
}

const lessons = documents.filter((document) => document._type === 'lesson')
for (const lesson of lessons) {
  const ownerCount = lessonOwners.get(lesson._id) || 0
  if (ownerCount !== 1) fail(`${lesson._id} is referenced ${ownerCount} times; expected once`)
}

if (!videos || typeof videos !== 'object' || Array.isArray(videos)) {
  fail('videos.json must be an object keyed by lesson slug')
}

const videoEntries = Object.entries(videos || {})
if (videoEntries.length !== 120) fail(`Expected 120 video entries, found ${videoEntries.length}`)

const seenVideoIds = new Set()
for (const [lessonSlug, video] of videoEntries) {
  if (seenVideoIds.has(video.id)) fail(`Duplicate video ID: ${video.id}`)
  seenVideoIds.add(video.id)

  const lesson = lessons.find((candidate) => candidate.slug.current === lessonSlug)
  if (!lesson) {
    fail(`Video metadata has no matching lesson: ${lessonSlug}`)
    continue
  }

  if (youtubeId(lesson.videoUrl) !== video.id) {
    fail(`${lessonSlug} has a YouTube ID mismatch`)
  }
  if (lesson.duration !== video.duration) {
    fail(`${lessonSlug} has a duration mismatch`)
  }
}

for (const lesson of lessons) {
  if (!videos[lesson.slug.current]) fail(`${lesson._id} has no video metadata entry`)
}

if (issues.length > 0) {
  console.error(`Seed validation failed with ${issues.length} issue(s):`)
  issues.forEach((issue) => console.error(`- ${issue}`))
  process.exitCode = 1
} else {
  console.log(
    JSON.stringify(
      {
        valid: true,
        documents: documents.length,
        counts: Object.fromEntries(typeCounts),
        references: referenceTargets.length,
        imageDirectives: imageDirectiveCount,
        videos: videoEntries.length,
      },
      null,
      2,
    ),
  )
}
