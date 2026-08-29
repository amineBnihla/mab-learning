import {defineQuery} from 'next-sanity'

export const COURSES_LIST_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)]
  | order(popular desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    level,
    price,
    popular,
    studentCount,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {width, height, aspectRatio}
        }
      },
      alt,
      crop,
      hotspot
    },
    instructor->{_id, name, "slug": slug.current},
    category->{_id, title, "slug": slug.current},
    "moduleCount": count(modules),
    "lessonCount": count(modules[].lessons[]),
    "durationSeconds": math::sum(modules[].lessons[]->duration)
  }
`)

export const COURSE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)] | order(slug.current asc) {
    "slug": slug.current
  }
`)

export const COURSE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    level,
    price,
    popular,
    studentCount,
    coverImage {
      asset->{
        _id,
        url,
        metadata {lqip, dimensions {width, height, aspectRatio}}
      },
      alt,
      crop,
      hotspot
    },
    learningOutcomes[] {
      _key,
      icon,
      title,
      description
    },
    instructor->{
      _id,
      name,
      "slug": slug.current,
      expertise,
      "bioText": pt::text(bio),
      photo {
        asset->{_id, url, metadata {lqip, dimensions {width, height, aspectRatio}}},
        alt,
        crop,
        hotspot
      }
    },
    category->{_id, title, "slug": slug.current, description},
    modules[] {
      _key,
      title,
      summary,
      lessons[]->{
        _id,
        title,
        "slug": slug.current,
        duration,
        freePreview,
        studentCount,
        thumbnail {
          asset->{_id, url, metadata {lqip, dimensions {width, height, aspectRatio}}},
          alt,
          crop,
          hotspot
        }
      }
    },
    "lessonCount": count(modules[].lessons[]),
    "durationSeconds": math::sum(modules[].lessons[]->duration)
  }
`)

export const LESSON_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && defined(slug.current)] | order(slug.current asc) {
    "slug": slug.current
  }
`)

export const LESSON_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    duration,
    freePreview,
    studentCount,
    thumbnail {
      asset->{
        _id,
        url,
        metadata {lqip, dimensions {width, height, aspectRatio}}
      },
      alt,
      crop,
      hotspot
    },
    notes[] {
      ...,
      _type == "image" => {
        asset->{_id, url, metadata {lqip, dimensions {width, height, aspectRatio}}}
      }
    },
    keyPoints,
    proTip,
    resources[] {_key, type, title, description, url},
    "course": *[_type == "course" && references(^._id)][0] {
      _id,
      title,
      "slug": slug.current,
      instructor->{
        _id,
        name,
        "slug": slug.current,
        expertise,
        photo {
          asset->{_id, url, metadata {lqip, dimensions {width, height, aspectRatio}}},
          alt,
          crop,
          hotspot
        }
      },
      modules[] {
        _key,
        title,
        lessons[]->{_id, title, "slug": slug.current, duration, freePreview}
      }
    }
  }
`)

export const INSTRUCTORS_LIST_QUERY = defineQuery(/* groq */ `
  *[_type == "instructor" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    expertise,
    photo {
      asset->{_id, url, metadata {lqip, dimensions {width, height, aspectRatio}}},
      alt,
      crop,
      hotspot
    },
    "courseCount": count(*[_type == "course" && instructor._ref == ^._id])
  }
`)

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    expertise,
    bio,
    photo {
      asset->{_id, url, metadata {lqip, dimensions {width, height, aspectRatio}}},
      alt,
      crop,
      hotspot
    },
    "courses": *[_type == "course" && instructor._ref == ^._id]
      | order(popular desc, title asc) {
        _id,
        title,
        "slug": slug.current,
        summary,
        level,
        price,
        popular,
        coverImage {
          asset->{_id, url, metadata {lqip, dimensions {width, height, aspectRatio}}},
          alt,
          crop,
          hotspot
        },
        "moduleCount": count(modules),
        "durationSeconds": math::sum(modules[].lessons[]->duration)
      }
  }
`)

export const CATEGORIES_LIST_QUERY = defineQuery(/* groq */ `
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "courseCount": count(*[_type == "course" && category._ref == ^._id])
  }
`)
