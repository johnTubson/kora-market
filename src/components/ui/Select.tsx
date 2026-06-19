import { forwardRef, type SelectHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, hint, options, placeholder, id, ...props },
    ref
  ) => {
    const selectId =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const errorId = error && selectId ? `${selectId}-error` : undefined;
    const hintId = hint && selectId ? `${selectId}-hint` : undefined;
    const describedBy =
      [errorId, hintId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label ? (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        ) : null}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              "focus-ring min-h-touch w-full appearance-none rounded-md border border-border bg-background px-3 py-2 pr-10 text-sm text-foreground",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            {...props}
          >
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <span
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground"
            aria-hidden="true"
          >
            ▾
          </span>
        </div>
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

Select.displayName = "Select";
