import type { HTMLAttributes, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export type CourseCardProps = HTMLAttributes<HTMLElement> & {
  category: string;
  description: string;
  duration: string;
  level: string;
  media?: ReactNode;
  title: string;
};

export function CourseCard({
  category,
  className = "",
  description,
  duration,
  level,
  media,
  title,
  ...props
}: CourseCardProps) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-lg bg-surface-white shadow-card transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-card-hover ${className}`}
      {...props}
    >
      <div className="relative min-h-48 overflow-hidden rounded-t-lg bg-[linear-gradient(135deg,var(--color-brand-navy)_0%,var(--color-secondary)_55%,var(--color-brand-orange)_145%)]">
        {media ?? (
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute -right-8 -top-14 size-40 rounded-full border border-white/15" />
            <div className="absolute right-9 top-9 size-24 rounded-full bg-white/10 backdrop-blur-glass" />
            <div className="absolute bottom-8 left-8 h-1.5 w-24 rounded-full bg-brand-orange" />
            <div className="absolute bottom-14 left-8 h-1.5 w-40 rounded-full bg-white/70" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-stack-md p-6">
        <Badge>{category}</Badge>
        <div className="space-y-stack-sm">
          <h3 className="text-headline-md text-brand-navy">{title}</h3>
          <p className="text-body-md text-secondary">{description}</p>
        </div>
      </div>
      <footer className="flex flex-wrap items-center gap-x-5 gap-y-2 bg-background px-6 py-4 text-label-md text-secondary">
        <span className="inline-flex items-center gap-2">
          <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 7v5l3 2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          </svg>
          {duration}
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="size-2 rounded-full bg-brand-orange" />
          {level}
        </span>
      </footer>
    </article>
  );
}
