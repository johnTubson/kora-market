"use client";

import { useCurrency } from "@/providers/currency-provider";
import { cn } from "@/lib/cn";
import type { CurrencyCode } from "@/types";

const options: { value: CurrencyCode; label: string }[] = [
  { value: "NGN", label: "₦ NGN" },
  { value: "USD", label: "$ USD" },
];

export type CurrencySwitcherProps = {
  className?: string;
};

export function CurrencySwitcher({ className }: CurrencySwitcherProps) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      className={cn(
        "inline-flex rounded-md border border-border p-0.5",
        className
      )}
      role="group"
      aria-label="Currency"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={currency === option.value}
          onClick={() => setCurrency(option.value)}
          className={cn(
            "focus-ring min-h-touch rounded px-2.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm",
            currency === option.value
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
