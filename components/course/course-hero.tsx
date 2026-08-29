import Image from "next/image";
import Link from "next/link";
import type { COURSE_BY_SLUG_QUERY_RESULT } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import {
  BookmarkIcon,
  GraduationCapIcon,
  PlayCircleIcon,
} from "@/components/ui/icons";

type Course = NonNullable<COURSE_BY_SLUG_QUERY_RESULT>;

type CourseHeroProps = {
  course: Pick<Course, "title" | "summary" | "coverImage">;
  firstLessonHref?: string;
};

const primaryActionClasses =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-control border border-brand-orange bg-brand-orange px-6 py-3 text-label-md text-white shadow-md transition-colors hover:border-primary hover:bg-primary";

export function CourseHero({ course, firstLessonHref }: CourseHeroProps) {
  const imageAsset = course.coverImage.asset;
  const imageUrl = imageAsset
    ? urlFor(course.coverImage).width(960).height(720).fit("crop").url()
    : undefined;
  const lqip = imageAsset?.metadata?.lqip;

  return (
    <section className="mb-8 flex flex-col items-center gap-8 rounded-xl border border-outline-variant/30 bg-surface-container-low p-8 shadow-sm md:flex-row md:p-12">
      <div className="min-w-0 flex-1">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-fixed px-3 py-1 text-label-sm text-on-secondary-fixed">
          <GraduationCapIcon className="size-4" />
          Learning Path
        </span>

        <h1 className="mb-4 text-headline-lg-mobile text-on-background md:text-display-lg">
          {course.title}
        </h1>
        <p className="mb-6 max-w-2xl text-body-lg text-on-surface-variant">
          {course.summary}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          {firstLessonHref ? (
            <Link className={primaryActionClasses} href={firstLessonHref}>
              <PlayCircleIcon className="size-5" />
              Start Learning
            </Link>
          ) : (
            <span aria-disabled="true" className={`${primaryActionClasses} opacity-45`}>
              <PlayCircleIcon className="size-5" />
              Start Learning
            </span>
          )}

          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-control border border-outline-variant bg-surface-white px-6 py-3 text-label-md text-on-surface transition-colors hover:bg-surface-container"
            type="button"
          >
            <BookmarkIcon className="size-5" />
            Save for later
          </button>
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-control bg-surface-container shadow-md md:w-1/3">
        {imageUrl ? (
          <Image
            alt={course.coverImage.alt}
            blurDataURL={lqip ?? undefined}
            className="object-cover"
            fill
            placeholder={lqip ? "blur" : "empty"}
            priority
            sizes="(min-width: 768px) 33vw, 100vw"
            src={imageUrl}
            unoptimized
          />
        ) : null}
        <div className="absolute inset-0 grid place-items-center bg-black/20">
          {firstLessonHref ? (
            <Link
              aria-label={`Start ${course.title}`}
              className="grid size-16 place-items-center rounded-full text-white/90 transition-transform hover:scale-105"
              href={firstLessonHref}
            >
              <PlayCircleIcon className="size-16" />
            </Link>
          ) : (
            <PlayCircleIcon className="size-16 text-white/70" />
          )}
        </div>
      </div>
    </section>
  );
}
