import Link from "next/link";
import type { COURSE_BY_SLUG_QUERY_RESULT } from "@/sanity.types";
import { Badge } from "@/components/ui/badge";
import { ChevronDownIcon, PlayCircleIcon } from "@/components/ui/icons";
import { formatLessonDuration } from "@/lib/format";
import { lessonHref } from "@/lib/routes";

type Course = NonNullable<COURSE_BY_SLUG_QUERY_RESULT>;

type CourseCurriculumProps = {
  modules: Course["modules"];
};

export function CourseCurriculum({ modules }: CourseCurriculumProps) {
  return (
    <section aria-labelledby="curriculum-heading" className="min-w-0 md:col-span-2">
      <h2 id="curriculum-heading" className="mb-6 text-headline-lg text-on-background">
        Course Curriculum
      </h2>

      <div className="space-y-4">
        {modules.map((module, moduleIndex) => (
          <details
            key={module._key}
            className="group overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-white shadow-sm"
            open={moduleIndex === 0}
          >
            <summary className="flex min-h-24 cursor-pointer list-none items-center justify-between gap-4 bg-surface-container-low/50 p-6 transition-colors hover:bg-surface-container-low [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">
                <span className="mb-1 block text-label-sm uppercase tracking-wider text-primary">
                  Module {moduleIndex + 1}
                </span>
                <span className="block text-headline-md text-on-background">{module.title}</span>
              </span>
              <ChevronDownIcon className="size-6 shrink-0 text-on-surface-variant transition-transform group-open:rotate-180" />
            </summary>

            <ul className="divide-y divide-outline-variant/30 border-t border-outline-variant/30">
              {module.lessons.map((lesson) => (
                <li key={lesson._id}>
                  <Link
                    className="group/lesson flex min-h-16 items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-container-lowest sm:px-6"
                    href={lessonHref(lesson.slug)}
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-container/10 text-primary">
                        <PlayCircleIcon className="size-[18px]" />
                      </span>
                      <span className="min-w-0 text-label-md text-on-background transition-colors group-hover/lesson:text-primary">
                        {lesson.title}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      {lesson.freePreview ? <Badge>Free Preview</Badge> : null}
                      <span className="text-label-sm text-on-surface-variant">
                        {formatLessonDuration(lesson.duration)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
