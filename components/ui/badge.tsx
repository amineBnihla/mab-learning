import type { HTMLAttributes } from "react";

type BadgeTone = "warm" | "neutral";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

const toneClasses: Record<BadgeTone, string> = {
  warm: "bg-primary-fixed text-on-primary-fixed-variant",
  neutral: "bg-surface-container text-brand-navy",
};

export function Badge({
  className = "",
  tone = "warm",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-label-sm ${toneClasses[tone]} ${className}`}
      {...props}
    />
  );
}
