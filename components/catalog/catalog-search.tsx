import { FilterChip } from "@/components/catalog/filter-chip";
import { ArrowRightIcon, SearchIcon } from "@/components/ui/icons";

export function CatalogSearch() {
  return (
    <section aria-label="Search learning catalog" className="rounded-md bg-surface-white p-6 shadow-card">
      <form action="/" method="get" role="search">
        <label className="sr-only" htmlFor="catalog-search">
          What do you want to learn today?
        </label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-6 -translate-y-1/2 text-secondary" />
          <input
            className="h-14 w-full rounded-control border border-accent-blue-soft bg-surface px-12 pr-16 text-body-md text-on-background outline-none transition-[border-color,box-shadow] placeholder:text-secondary/70 focus:border-brand-navy focus:ring-3 focus:ring-brand-navy/10"
            defaultValue="machine learning basics"
            id="catalog-search"
            name="q"
            type="search"
          />
          <button
            aria-label="Search"
            className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-control bg-brand-orange text-white transition-colors hover:bg-primary"
            type="submit"
          >
            <ArrowRightIcon className="size-5" />
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-label-md text-secondary">Filters:</span>
        <FilterChip aria-label="Filter by topic">Topic</FilterChip>
        <FilterChip aria-label="Filter by level">Level</FilterChip>
        <FilterChip aria-label="Filter by duration">Duration</FilterChip>
      </div>
    </section>
  );
}
