import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "outline" | "ghost";
};

const cardVariants = {
  default: "bg-card text-card-foreground shadow-sm border border-border",
  outline: "border border-border bg-transparent",
  ghost: "bg-muted/50",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg", cardVariants[variant], className)}
      {...props}
    />
  )
);

Card.displayName = "Card";

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-4 pb-0", className)}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold leading-tight", className)}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4", className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 p-4 pt-0", className)}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";
