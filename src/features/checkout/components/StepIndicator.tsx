"use client";

import { cn } from "@/lib/cn";

const STEPS = [
  { id: 1, label: "Address" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Review" },
] as const;

export type StepIndicatorProps = {
  currentStep: number;
  className?: string;
};

export function StepIndicator({ currentStep, className }: StepIndicatorProps) {
  return (
    <nav aria-label="Checkout progress" className={cn("w-full", className)}>
      <ol className="flex items-center justify-between gap-2">
        {STEPS.map((step, index) => {
          const isComplete = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <li
              key={step.id}
              className="flex flex-1 items-center gap-2 last:flex-none"
            >
              <div className="flex min-w-0 flex-col items-center gap-1 sm:flex-row sm:gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors motion-safe:duration-200",
                    isComplete && "bg-primary text-primary-foreground",
                    isCurrent &&
                      "bg-primary text-primary-foreground ring-2 ring-ring ring-offset-2 ring-offset-background",
                    !isComplete &&
                      !isCurrent &&
                      "bg-muted text-muted-foreground"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isComplete ? "✓" : step.id}
                </span>
                <span
                  className={cn(
                    "truncate text-xs font-medium sm:text-sm",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 ? (
                <div
                  className={cn(
                    "hidden h-0.5 flex-1 sm:block motion-safe:transition-colors motion-safe:duration-200",
                    isComplete ? "bg-primary" : "bg-border"
                  )}
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
