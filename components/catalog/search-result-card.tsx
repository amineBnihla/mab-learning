import Image from "next/image";
import Link from "next/link";
import { ClockIcon, QuoteIcon, SignalIcon } from "@/components/ui/icons";

export type SearchResultCardProps = {
  description: string;
  duration: string;
  href: string;
  imageAlt: string;
  imageBlurDataUrl?: string;
  imageSrc: string;
  instructor: string;
  level: string;
  meta: string;
  title: string;
};

export function SearchResultCard({
  description,
  duration,
  href,
  imageAlt,
  imageBlurDataUrl,
  imageSrc,
  instructor,
  level,
  meta,
  title,
}: SearchResultCardProps) {
  return (
    <Link
      aria-label={`View course: ${title}`}
      className="group block h-full rounded-md"
      href={href}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-md border border-transparent bg-surface-white shadow-card transition-[border-color,box-shadow,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-outline-variant/30 group-hover:shadow-card-hover">
        <div className="relative h-40 overflow-hidden bg-surface-container-lowest">
          <Image
            alt={imageAlt}
            blurDataURL={imageBlurDataUrl}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            placeholder={imageBlurDataUrl ? "blur" : "empty"}
            sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) calc(50vw - 52px), 400px"
            src={imageSrc}
            unoptimized
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-secondary-fixed/55 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-on-secondary-fixed">
              Course
            </span>
            <span className="text-label-sm text-secondary">• {meta}</span>
          </div>

          <h2 className="mb-2 text-headline-md text-on-background transition-colors group-hover:text-primary">
            {title}
          </h2>

          <blockquote className="relative my-3 border-l-2 border-brand-orange bg-surface-container-lowest p-3 text-sm italic leading-6 text-on-surface-variant">
            <QuoteIcon className="absolute right-2 top-2 size-5 text-outline-variant/50" />
            <p className="pr-5">{description}</p>
          </blockquote>

          <footer className="mt-auto flex min-h-9 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-outline-variant/30 pt-4 text-secondary">
            <span className="inline-flex items-center gap-1 text-label-sm">
              <SignalIcon className="size-4" />
              {level}
            </span>
            <span className="inline-flex items-center gap-1 text-label-sm">
              <ClockIcon className="size-4" />
              {duration}
            </span>
            <span className="min-w-0 truncate text-label-sm">{instructor}</span>
          </footer>
        </div>
      </article>
    </Link>
  );
}
