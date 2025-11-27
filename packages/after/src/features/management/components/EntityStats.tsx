import { cn } from "@/lib/utils";
import { entityCopy } from "../constants";
import type { EntityType, StatMetric } from "../types";

interface EntityStatsProps {
  title: string;
  description?: string;
  metrics: StatMetric[];
  entityType: EntityType;
  onEntityChange: (next: EntityType) => void;
  className?: string;
}

type ToneKey = NonNullable<StatMetric["tone"]>;

const toneStyles: Record<ToneKey, { container: string; value: string }> = {
  default: {
    container: "bg-[#e3f2fd] border-[#90caf9]",
    value: "text-[#1976d2]",
  },
  success: {
    container: "bg-[#e8f5e9] border-[#81c784]",
    value: "text-[#388e3c]",
  },
  warning: {
    container: "bg-[#fff3e0] border-[#ffb74d]",
    value: "text-[#f57c00]",
  },
  danger: {
    container: "bg-[#ffebee] border-[#e57373]",
    value: "text-[#d32f2f]",
  },
  muted: {
    container: "bg-[#f5f5f5] border-[#bdbdbd]",
    value: "text-[#424242]",
  },
};

const toggleOptions: { value: EntityType; label: string }[] = [
  { value: "post", label: entityCopy.post.label },
  { value: "user", label: entityCopy.user.label },
];

export const EntityStats = ({
  title,
  description = "",
  metrics,
  entityType,
  onEntityChange,
  className,
}: EntityStatsProps) => {
  if (!metrics.length) return null;

  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-lg font-bold text-[#333333]">{title}</p>
          {description && <p className="text-sm text-[#666666]">{description}</p>}
        </div>
        <div className="flex rounded-[3px] border border-[#999999] bg-[#f5f5f5] p-1">
          {toggleOptions.map((option) => {
            const isActive = option.value === entityType;
            return (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "min-w-[96px] rounded-[3px] px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-[#1976d2] text-white shadow-sm"
                    : "text-[#333333]",
                )}
                onClick={() => {
                  if (isActive) return;
                  onEntityChange(option.value);
                }}
                aria-pressed={isActive}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric, index) => {
          const tone = toneStyles[metric.tone ?? "default"];
          return (
            <div
              key={`${metric.label}-${index}`}
              className={cn(
                "rounded-[3px] border px-4 py-3",
                tone.container,
              )}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-[#666666]">
                {metric.label}
              </p>
              <p
                className={cn(
                  "mt-1 text-2xl font-bold leading-none",
                  tone.value,
                )}
              >
                {metric.value.toLocaleString()}
              </p>
              {metric.helper && (
                <p className="mt-1 text-xs text-[#666666]">{metric.helper}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

