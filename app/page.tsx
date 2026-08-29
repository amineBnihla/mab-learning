import { CatalogSearch } from "@/components/catalog/catalog-search";
import { SearchResultCard } from "@/components/catalog/search-result-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { formatDuration, formatLevel } from "@/lib/format";
import { courseHref } from "@/lib/routes";
import { CACHE_TAGS, sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { COURSES_LIST_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  const courses = await sanityFetch({
    query: COURSES_LIST_QUERY,
    tags: [CACHE_TAGS.course, CACHE_TAGS.lesson],
  });

  return (
    <div className="flex min-h-screen flex-col bg-surface pt-16">
      <SiteHeader />

      <main className="vertex-container flex flex-1 flex-col gap-8 py-8">
        <CatalogSearch />

        <section id="catalog-results" aria-labelledby="results-heading">
          <div className="mb-6">
            <h1 id="results-heading" className="text-headline-lg-mobile text-on-background md:text-headline-lg">
              Explore Courses
            </h1>
            <p className="mt-1 text-body-md text-secondary">
              {courses.length} {courses.length === 1 ? "course" : "courses"} available
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const imageAsset = course.coverImage.asset;
              const imageSrc = imageAsset
                ? urlFor(course.coverImage).width(800).height(450).fit("crop").url()
                : undefined;

              if (!imageSrc) return null;

              return (
                <SearchResultCard
                  key={course._id}
                  description={course.summary}
                  duration={formatDuration(course.durationSeconds)}
                  href={courseHref(course.slug)}
                  imageAlt={course.coverImage.alt}
                  imageBlurDataUrl={imageAsset?.metadata?.lqip ?? undefined}
                  imageSrc={imageSrc}
                  instructor={course.instructor.name}
                  level={formatLevel(course.level)}
                  meta={`${course.moduleCount} ${course.moduleCount === 1 ? "Module" : "Modules"}`}
                  title={course.title}
                />
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
