import type { ButtonHTMLAttributes } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";

export function FilterChip({
  children,
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-expanded="false"
      className={`inline-flex min-h-9 items-center gap-1 rounded-full border border-outline-variant/60 bg-surface-container-low px-3.5 py-1.5 text-label-sm text-on-surface transition-colors hover:bg-surface-container ${className}`}
      type={type}
      {...props}
    >
      {children}
      <ChevronDownIcon className="size-4" />
    </button>
  );
}
