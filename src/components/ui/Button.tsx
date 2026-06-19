import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-ring min-h-touch min-w-touch px-4 py-2 text-sm",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-hover",
        ghost: "bg-transparent text-foreground hover:bg-muted active:bg-muted",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive-hover",
      },
      size: {
        default: "min-h-touch px-4 py-2",
        sm: "min-h-9 min-w-9 px-3 py-1.5 text-xs",
        lg: "min-h-12 px-6 py-3 text-base",
        icon: "min-h-touch min-w-touch p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { buttonVariants };
