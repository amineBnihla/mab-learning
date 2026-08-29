import Image from "next/image";
import {
  ClockIcon,
  MedalIcon,
  PlayCircleIcon,
  QuoteIcon,
  SignalIcon,
} from "@/components/ui/icons";

export type SearchResultCardProps = {
  duration?: string;
  imageAlt: string;
  imageSrc: string;
  instructor?: string;
  kind: "Article" | "Course" | "Video";
  level: string;
  meta: string;
  showAws?: boolean;
  showRewards?: boolean;
  snippetAfter: string;
  snippetBefore: string;
  timestamp?: string;
  title: string;
};

export function SearchResultCard({
  duration,
  imageAlt,
  imageSrc,
  instructor,
  kind,
  level,
  meta,
  showAws = false,
  showRewards = false,
  snippetAfter,
  snippetBefore,
  timestamp,
  title,
}: SearchResultCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-transparent bg-surface-white shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-outline-variant/30 hover:shadow-card-hover">
      <div className="relative h-40 overflow-hidden bg-surface-container-lowest">
        <Image
          alt={imageAlt}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) calc(50vw - 52px), 400px"
          src={imageSrc}
        />

        {showRewards && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-sm bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary backdrop-blur-sm">
            <MedalIcon className="size-3" />
            Rewards
          </span>
        )}

        {showAws && (
          <span className="absolute bottom-3 left-3 grid h-7 w-12 place-items-center overflow-hidden rounded-sm bg-white px-2 shadow-sm">
            <Image
              alt="Amazon Web Services"
              className="object-contain"
              height={18}
              src="/images/learning-catalog/aws-logo.jpg"
              width={32}
            />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-secondary-fixed/55 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-on-secondary-fixed">
            {kind}
          </span>
          <span className="text-label-sm text-secondary">• {meta}</span>
        </div>

        <h2 className="mb-2 text-headline-md text-on-background transition-colors group-hover:text-primary">
          {title}
        </h2>

        <blockquote className="relative my-3 border-l-2 border-brand-orange bg-surface-container-lowest p-3 text-sm italic leading-6 text-on-surface-variant">
          {kind === "Course" && (
            <QuoteIcon className="absolute right-2 top-2 size-5 text-outline-variant/50" />
          )}
          {timestamp && (
            <div className="mb-1 flex items-center gap-1 text-xs font-bold text-brand-orange">
              <PlayCircleIcon className="size-4" />
              Timestamp {timestamp}
            </div>
          )}
          <span>{snippetBefore}</span>
          <mark className="rounded-sm bg-tertiary-fixed/55 px-1 font-semibold text-primary">
            machine learning basics
          </mark>
          <span>{snippetAfter}</span>
        </blockquote>

        <footer className="mt-auto flex min-h-9 items-center justify-between gap-4 border-t border-outline-variant/30 pt-4 text-secondary">
          <span className="inline-flex items-center gap-1 text-label-sm">
            <SignalIcon className="size-4" />
            {level}
          </span>

          {duration && (
            <span className="inline-flex items-center gap-1 text-label-sm">
              <ClockIcon className="size-4" />
              {duration}
            </span>
          )}

          {instructor && (
            <span className="inline-flex min-w-0 items-center gap-2 text-label-sm">
              <span className="relative size-5 shrink-0 overflow-hidden rounded-full">
                <Image
                  alt="Dr. Sarah Jenkins"
                  className="object-cover"
                  fill
                  sizes="20px"
                  src="/images/learning-catalog/instructor-sarah.jpg"
                />
              </span>
              <span className="truncate">{instructor}</span>
            </span>
          )}
        </footer>
      </div>
    </article>
  );
}
