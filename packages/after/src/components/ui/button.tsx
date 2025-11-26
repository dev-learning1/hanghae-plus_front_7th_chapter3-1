import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const primaryStyles =
  "bg-[#1976d2] text-white border-[#1565c0] hover:bg-[#1565c0]"
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[3px] border text-[14px] leading-[1.5] font-normal transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none",
  {
    variants: {
      variant: {
        default: primaryStyles,
        primary: primaryStyles,
        secondary:
          "bg-[#f5f5f5] text-[#333333] border-[#dddddd] hover:bg-[#e0e0e0]",
        danger:
          "bg-[#d32f2f] text-white border-[#c62828] hover:bg-[#c62828]",
        destructive:
          "bg-[#d32f2f] text-white border-[#c62828] hover:bg-[#c62828]",
        success:
          "bg-[#388e3c] text-white border-[#2e7d32] hover:bg-[#2e7d32]",
        outline:
          "bg-white text-[#333333] border-[#dddddd] hover:bg-[#f5f5f5]",
        ghost:
          "bg-transparent text-[#1976d2] border-transparent hover:bg-[#e3f2fd]",
        link: "bg-transparent border-transparent text-[#1976d2] underline-offset-4 hover:underline",
      },
      size: {
        sm: "px-3 py-1.5 text-[13px]",
        md: "px-5 py-2.5",
        lg: "px-6 py-3 text-[15px]",
        icon: "p-0 size-9",
        "icon-sm": "p-0 size-8",
        "icon-lg": "p-0 size-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
