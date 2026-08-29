import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { CourseCurriculum } from "@/components/course/course-curriculum";
import { CourseHero } from "@/components/course/course-hero";
import { CourseMetrics } from "@/components/course/course-metrics";
import { CourseSidebar } from "@/components/course/course-sidebar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { lessonHref } from "@/lib/routes";
import { CACHE_TAGS, sanityFetch } from "@/sanity/lib/fetch";
import {
  COURSE_BY_SLUG_QUERY,
  COURSE_SLUGS_QUERY,
} from "@/sanity/lib/queries";

const courseTags = [
  CACHE_TAGS.course,
  CACHE_TAGS.lesson,
  CACHE_TAGS.instructor,
  CACHE_TAGS.category,
];

const getCourse = cache((slug: string) =>
  sanityFetch({
    query: COURSE_BY_SLUG_QUERY,
    params: { slug },
    tags: courseTags,
  }),
);

export async function generateStaticParams() {
  const courses = await sanityFetch({
    query: COURSE_SLUGS_QUERY,
    tags: [CACHE_TAGS.course],
  });

  return courses.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return { title: "Course not found — Vertex" };
  }

  return {
    title: `${course.title} — Vertex`,
    description: course.summary,
  };
}

export default async function CoursePage({
  params,
}: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) notFound();

  const firstLesson = course.modules[0]?.lessons[0];
  const firstLessonUrl = firstLesson?.slug
    ? lessonHref(firstLesson.slug)
    : undefined;

  return (
    <div className="flex min-h-screen flex-col bg-background pt-16">
      <SiteHeader activeItem="Learn" />

      <main className="vertex-container flex-1 py-8">
        <CourseHero course={course} firstLessonHref={firstLessonUrl} />

        <CourseMetrics
          durationSeconds={course.durationSeconds}
          level={course.level}
          moduleCount={course.modules.length}
          studentCount={course.studentCount}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <CourseCurriculum modules={course.modules} />
          <CourseSidebar
            instructor={course.instructor}
            outcomes={course.learningOutcomes}
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
