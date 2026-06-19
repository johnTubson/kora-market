"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/cn";
import { CATEGORY_META } from "@/features/catalog/constants";
import type { Category } from "@/types";

export type CategoryChipsProps = {
  className?: string;
  basePath?: string;
};

export function CategoryChips({
  className,
  basePath = "/products",
}: CategoryChipsProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "all";

  const chips: { id: Category | "all"; label: string }[] = [
    { id: "all", label: "All" },
    ...CATEGORY_META.map((category) => ({
      id: category.id,
      label: category.label,
    })),
  ];

  return (
    <ul
      className={cn("flex gap-2 overflow-x-auto pb-1", className)}
      aria-label="Product categories"
    >
      {chips.map((chip) => {
        const params = new URLSearchParams(searchParams.toString());
        if (chip.id === "all") {
          params.delete("category");
        } else {
          params.set("category", chip.id);
        }
        const href = params.toString()
          ? `${basePath}?${params.toString()}`
          : basePath;
        const isActive = activeCategory === chip.id;

        return (
          <li key={chip.id} className="shrink-0">
            <Link
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "focus-ring inline-flex min-h-touch items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted"
              )}
            >
              {chip.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
