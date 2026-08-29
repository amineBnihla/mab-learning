import Image from "next/image";
import Link from "next/link";
import type { COURSE_BY_SLUG_QUERY_RESULT } from "@/sanity.types";
import { ArrowRightIcon } from "@/components/ui/icons";
import { instructorHref } from "@/lib/routes";
import { urlFor } from "@/sanity/lib/image";

type Course = NonNullable<COURSE_BY_SLUG_QUERY_RESULT>;

type CourseSidebarProps = {
  instructor: Course["instructor"];
  outcomes: Course["learningOutcomes"];
};

export function CourseSidebar({ instructor, outcomes }: CourseSidebarProps) {
  const photoAsset = instructor.photo.asset;
  const photoUrl = photoAsset
    ? urlFor(instructor.photo).width(192).height(192).fit("crop").url()
    : undefined;
  const lqip = photoAsset?.metadata?.lqip;

  return (
    <aside className="space-y-6 md:col-span-1">
      <section className="rounded-xl border border-outline-variant/30 bg-surface-white p-6 shadow-sm">
        <h2 className="mb-4 text-headline-md text-on-background">Instructor</h2>
        <div className="mb-4 flex items-center gap-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-surface-container">
            {photoUrl ? (
              <Image
                alt={instructor.photo.alt}
                blurDataURL={lqip ?? undefined}
                className="object-cover"
                fill
                placeholder={lqip ? "blur" : "empty"}
                sizes="64px"
                src={photoUrl}
                unoptimized
              />
            ) : null}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-on-background">{instructor.name}</h3>
            {instructor.expertise?.[0] ? (
              <p className="text-label-sm text-on-surface-variant">{instructor.expertise[0]}</p>
            ) : null}
          </div>
        </div>

        {instructor.bioText ? (
          <p className="mb-4 whitespace-pre-line text-sm leading-6 text-on-surface-variant">
            {instructor.bioText}
          </p>
        ) : null}

        <Link
          className="inline-flex items-center gap-1 text-label-md text-primary hover:underline"
          href={instructorHref(instructor.slug)}
        >
          View Profile
          <ArrowRightIcon className="size-4" />
        </Link>
      </section>

      {outcomes?.length ? (
        <section className="rounded-xl border border-outline-variant/30 bg-surface-white p-6 shadow-sm">
          <h2 className="mb-4 text-headline-md text-on-background">Skills you will gain</h2>
          <ul className="flex flex-wrap gap-2">
            {outcomes.map((outcome) => (
              <li
                key={outcome._key}
                className="rounded-full bg-surface-container px-3 py-1 text-label-sm text-on-surface-variant"
              >
                {outcome.title}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}
