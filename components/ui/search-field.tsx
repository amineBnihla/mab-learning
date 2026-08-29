import type { InputHTMLAttributes } from "react";

export type SearchFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: string;
  hideLabel?: boolean;
};

export function SearchField({
  className = "",
  hideLabel = false,
  label,
  ...props
}: SearchFieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className={hideLabel ? "sr-only" : "mb-2 block text-label-md text-brand-navy"}>
        {label}
      </span>
      <span className="flex min-h-14 items-center gap-3 rounded-control border border-accent-blue-soft bg-surface-white px-4 shadow-card transition-[border-color,box-shadow] duration-200 focus-within:border-brand-navy focus-within:ring-3 focus-within:ring-brand-navy/10">
        <svg
          aria-hidden="true"
          className="size-5 shrink-0 text-secondary"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
        <input
          aria-label={hideLabel ? label : undefined}
          className="min-w-0 flex-1 border-0 bg-transparent text-body-md text-brand-navy outline-none placeholder:text-secondary/70"
          type="search"
          {...props}
        />
      </span>
    </label>
  );
}
