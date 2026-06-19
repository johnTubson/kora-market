"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/Input";
import { CategoryChips } from "@/features/catalog/components/CategoryChips";
import { ProductGrid } from "@/features/catalog/components/ProductGrid";
import { isCategory, type Category, type Product } from "@/types";

function filterProductsByCategory(
  products: Product[],
  category: Category | "all"
): Product[] {
  if (category === "all") return products;
  return products.filter((product) => product.category === category);
}

export type CatalogListingProps = {
  products: Product[];
};

export function CatalogListing({ products }: CatalogListingProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const category = isCategory(categoryParam) ? categoryParam : "all";

  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const byCategory = filterProductsByCategory(products, category);
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return byCategory;

    return byCategory.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
    );
  }, [products, category, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <Input
          label="Search products"
          type="search"
          placeholder="Search by name or description…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="sm:max-w-md"
        />
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {filteredProducts.length} product
          {filteredProducts.length === 1 ? "" : "s"}
        </p>
      </div>

      <CategoryChips />

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="rounded-lg border border-dashed border-border px-6 py-16 text-center">
          <h2 className="text-lg font-semibold">No products found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {query
              ? `No results for "${query}". Try a different search term or category.`
              : "No products in this category yet."}
          </p>
        </div>
      )}
    </div>
  );
}

// Re-export helper for tests
export { filterProductsByCategory };
