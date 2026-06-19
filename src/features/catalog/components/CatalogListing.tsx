"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { ActiveFilters } from "@/features/catalog/components/ActiveFilters";
import { CatalogSearchForm } from "@/features/catalog/components/CatalogSearchForm";
import { CategoryChips } from "@/features/catalog/components/CategoryChips";
import { ProductGrid } from "@/features/catalog/components/ProductGrid";
import { parseCatalogFilters } from "@/features/catalog/utils/catalog-url";
import { cn } from "@/lib/cn";
import type { Category, Product } from "@/types";

export type CatalogListingProps = {
  products: Product[];
};

export function CatalogListing({ products }: CatalogListingProps) {
  const searchParams = useSearchParams();
  const { category, q: urlQuery } = parseCatalogFilters(searchParams);
  const [isPending, setIsPending] = useState(false);
  const [liveQuery, setLiveQuery] = useState(urlQuery);
  const filteredProducts = filterProducts(products, category, liveQuery);

  return (
    <div className="space-y-6">
      <div
        className={cn(isPending && "opacity-80 transition-opacity")}
        aria-busy={isPending || undefined}
      >
        <CatalogSearchForm
          category={category}
          urlQuery={urlQuery}
          resultCount={filteredProducts.length}
          isPending={isPending}
          onPendingChange={setIsPending}
          onQueryChange={setLiveQuery}
        />

        <ActiveFilters className="mt-4" />
      </div>

      <CategoryChips />

      {filteredProducts.length > 0 ? (
        <ProductGrid
          products={filteredProducts}
          priorityFirst
          priorityCount={1}
        />
      ) : (
        <div className="rounded-lg border border-dashed border-border px-6 py-16 text-center">
          <h2 className="text-lg font-semibold">No products found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {liveQuery
              ? `No results for "${liveQuery}". Try a different search term or category.`
              : "No products in this category yet."}
          </p>
        </div>
      )}
    </div>
  );
}

function filterProductsByCategory(
  products: Product[],
  category: Category | "all"
): Product[] {
  if (category === "all") return products;
  return products.filter((product) => product.category === category);
}

function filterProducts(
  products: Product[],
  category: Category | "all",
  query: string
): Product[] {
  const byCategory = filterProductsByCategory(products, category);
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return byCategory;

  return byCategory.filter(
    (product) =>
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery)
  );
}

export { filterProductsByCategory, filterProducts };
