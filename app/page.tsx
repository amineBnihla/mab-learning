import { CatalogSearch } from "@/components/catalog/catalog-search";
import {
  SearchResultCard,
  type SearchResultCardProps,
} from "@/components/catalog/search-result-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const results = [
  {
    duration: "37 hrs",
    imageAlt: "A glowing artificial intelligence brain above a processor",
    imageSrc: "/images/learning-catalog/machine-learning-course.jpg",
    kind: "Course",
    level: "Intermediate",
    meta: "4 Modules",
    showAws: true,
    showRewards: true,
    snippetAfter: " required to understand complex neural networks…”",
    snippetBefore: "“…this module covers the ",
    title: "AWS: Becoming a Machine Learning Engineer",
  },
  {
    imageAlt: "An isometric data center connected by glowing data streams",
    imageSrc: "/images/learning-catalog/supervised-learning-video.jpg",
    instructor: "Dr. Sarah Jenkins",
    kind: "Video",
    level: "Beginner",
    meta: "12 mins",
    snippetAfter: ", specifically focusing on classification algorithms.”",
    snippetBefore: "“We will now dive into ",
    timestamp: "04:12",
    title: "Introduction to Supervised Learning",
  },
  {
    imageAlt: "A laptop, coffee, and notebook arranged on a study desk",
    imageSrc: "/images/learning-catalog/data-pipelines-article.jpg",
    kind: "Article",
    level: "Intermediate",
    meta: "5 min read",
    snippetAfter: " is essential before constructing scalable data pipelines in the cloud.”",
    snippetBefore: "“A solid grasp of ",
    title: "Understanding Data Pipelines",
  },
] satisfies readonly SearchResultCardProps[];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-surface pt-16">
      <SiteHeader />

      <main className="vertex-container flex flex-1 flex-col gap-8 py-8">
        <CatalogSearch />

        <section id="catalog-results" aria-labelledby="results-heading">
          <div className="mb-6">
            <h1 id="results-heading" className="text-headline-lg-mobile text-on-background md:text-headline-lg">
              Search Results
            </h1>
            <p className="mt-1 text-body-md text-secondary">
              Found 24 results for &quot;machine learning basics&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result) => (
              <SearchResultCard key={result.title} {...result} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
