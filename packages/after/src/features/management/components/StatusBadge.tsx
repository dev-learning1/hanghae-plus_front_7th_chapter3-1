import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      tone: {
        primary: "bg-primary/10 text-primary",
        success: "bg-emerald-100 text-emerald-700",
        warning: "bg-amber-100 text-amber-700",
        danger: "bg-rose-100 text-rose-700",
        neutral: "bg-slate-100 text-slate-700",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

export type StatusBadgeTone = NonNullable<VariantProps<typeof badgeVariants>["tone"]>;

interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
  label: string;
}

export const StatusBadge = ({ label, tone }: StatusBadgeProps) => {
  return <span className={badgeVariants({ tone })}>{label}</span>;
};

