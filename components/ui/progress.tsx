import type { HTMLAttributes } from "react";

export type ProgressProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  label?: string;
  showValue?: boolean;
  value: number;
};

export function Progress({
  className = "",
  label,
  showValue = true,
  value,
  ...props
}: ProgressProps) {
  const normalizedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={className} {...props}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-4 text-label-md text-brand-navy">
          <span>{label ?? "Progress"}</span>
          {showValue && <span>{normalizedValue}%</span>}
        </div>
      )}
      <div
        aria-label={label ?? "Learning progress"}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={normalizedValue}
        className="h-2.5 overflow-hidden rounded-full bg-primary-fixed"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-brand-orange transition-[width] duration-300"
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  );
}
