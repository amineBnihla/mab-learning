import type { ComponentType, SVGProps } from "react";
import {
  BooksIcon,
  ClockIcon,
  SignalIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { formatCount, formatDuration, formatLevel } from "@/lib/format";

type Metric = {
  label: string;
  value: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type CourseMetricsProps = {
  durationSeconds: number;
  level: string;
  moduleCount: number;
  studentCount: number | null;
};

export function CourseMetrics({
  durationSeconds,
  level,
  moduleCount,
  studentCount,
}: CourseMetricsProps) {
  const metrics: Metric[] = [
    { label: "Duration", value: formatDuration(durationSeconds), icon: ClockIcon },
    { label: "Level", value: formatLevel(level), icon: SignalIcon },
    {
      label: "Modules",
      value: `${moduleCount} ${moduleCount === 1 ? "Module" : "Modules"}`,
      icon: BooksIcon,
    },
  ];

  if (studentCount !== null) {
    metrics.push({
      label: "Students",
      value: formatCount(studentCount),
      icon: UsersIcon,
    });
  }

  return (
    <section aria-label="Course details" className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <article
            key={metric.label}
            className="flex min-h-28 items-start gap-4 rounded-control border border-outline-variant/30 bg-surface-white p-6"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-control bg-secondary-fixed/50 text-secondary">
              <Icon className="size-6" />
            </span>
            <span>
              <span className="mb-1 block text-label-sm uppercase tracking-wider text-on-surface-variant">
                {metric.label}
              </span>
              <span className="block text-headline-md text-on-background">{metric.value}</span>
            </span>
          </article>
        );
      })}
    </section>
  );
}
