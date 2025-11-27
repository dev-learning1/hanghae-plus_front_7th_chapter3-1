import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

const alertVariants = cva(
  "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg",
  {
    variants: {
      variant: {
        info: "border-sky-200 bg-sky-50 text-sky-900",
        success: "border-emerald-200 bg-emerald-50 text-emerald-900",
        error: "border-rose-200 bg-rose-50 text-rose-900",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

interface InlineAlertProps extends VariantProps<typeof alertVariants> {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const InlineAlert = ({ title, children, variant, onClose }: InlineAlertProps) => (
  <div className="fixed inset-x-0 top-6 z-50 flex justify-center px-4">
    <div className="pointer-events-none w-full max-w-lg">
      <div className={`${alertVariants({ variant })} pointer-events-auto`} role="status">
        <div className="flex-1 space-y-1">
          {title && <p className="text-sm font-semibold">{title}</p>}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="알림 닫기"
            className="pointer-events-auto rounded-full p-1 text-current transition hover:bg-black/10"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  </div>
);

