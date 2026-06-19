"use client";

import { cn } from "@/lib/cn";
import type { ProductVariant } from "@/types";

export type VariantSelectorProps = {
  variants: ProductVariant[];
  value: string;
  onChange: (variantId: string) => void;
};

export function VariantSelector({
  variants,
  value,
  onChange,
}: VariantSelectorProps) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-foreground">Variant</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            disabled={!variant.inStock}
            aria-pressed={value === variant.id}
            onClick={() => onChange(variant.id)}
            className={cn(
              "focus-ring min-h-touch rounded-md border px-4 py-2 text-sm font-medium transition-colors",
              value === variant.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:bg-muted",
              !variant.inStock && "cursor-not-allowed opacity-50 line-through"
            )}
          >
            {variant.name}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
