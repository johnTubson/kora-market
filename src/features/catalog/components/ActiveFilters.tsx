"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { getCategoryLabel } from "@/features/catalog/constants";
import {
  buildCatalogHref,
  parseCatalogFilters,
} from "@/features/catalog/utils/catalog-url";
import { cn } from "@/lib/cn";
import type { Category } from "@/types";

export type ActiveFiltersProps = {
  className?: string;
};

function FilterPill({
  label,
  onDismiss,
}: {
  label: string;
  onDismiss: () => void;
}) {
  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className="gap-1.5 rounded-full"
      onClick={onDismiss}
      aria-label={`Remove filter: ${label}`}
    >
      <span>{label}</span>
      <span aria-hidden="true">×</span>
    </Button>
  );
}

export function ActiveFilters({ className }: ActiveFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { category, q } = parseCatalogFilters(searchParams);

  const hasActiveFilters = category !== "all" || q.trim().length > 0;

  if (!hasActiveFilters) {
    return null;
  }

  function navigate(next: { category?: Category | "all"; q?: string }) {
    router.replace(
      buildCatalogHref({
        category: next.category ?? category,
        q: next.q ?? q,
      })
    );
  }

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2 text-sm", className)}
      aria-label="Active filters"
    >
      <span className="text-muted-foreground">Active:</span>
      {q.trim() ? (
        <FilterPill
          label={`Search: "${q.trim()}"`}
          onDismiss={() => navigate({ q: "" })}
        />
      ) : null}
      {category !== "all" ? (
        <FilterPill
          label={`Category: ${getCategoryLabel(category)}`}
          onDismiss={() => navigate({ category: "all" })}
        />
      ) : null}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-primary"
        onClick={() => router.replace("/products")}
      >
        Clear all
      </Button>
    </div>
  );
}
