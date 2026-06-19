import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const errorId = error && inputId ? `${inputId}-error` : undefined;
    const hintId = hint && inputId ? `${inputId}-hint` : undefined;
    const describedBy =
      [errorId, hintId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "focus-ring min-h-touch w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        />
        {hint && !error ? (
          <p id={hintId} className="text-xs text-muted-foreground">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p id={errorId} className="text-xs text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
