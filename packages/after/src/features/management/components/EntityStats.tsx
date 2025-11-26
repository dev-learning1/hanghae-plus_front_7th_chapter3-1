import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { StatMetric } from "../types";

interface EntityStatsProps {
  title: string;
  description: string;
  metrics: StatMetric[];
}

const toneClass = {
  default: "border-foreground/10 bg-background text-foreground",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  danger: "border-rose-200 bg-rose-50 text-rose-900",
  muted: "border-slate-200 bg-slate-50 text-slate-900",
};

export const EntityStats = ({ title, description, metrics }: EntityStatsProps) => {
  if (!metrics.length) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className={`rounded-xl border px-4 py-3 shadow-xs ${toneClass[metric.tone ?? "default"]}`}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-foreground/70">
                {metric.label}
              </p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">{metric.value.toLocaleString()}</p>
              {metric.helper && (
                <p className="text-muted-foreground mt-1 text-xs">{metric.helper}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

