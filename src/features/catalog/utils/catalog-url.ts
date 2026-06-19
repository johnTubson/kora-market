import { isCategory, type Category } from "@/types";

export type CatalogFilters = {
  category: Category | "all";
  q: string;
};

export function parseCatalogFilters(
  searchParams: URLSearchParams | { get: (key: string) => string | null }
): CatalogFilters {
  const categoryParam = searchParams.get("category");
  const category = isCategory(categoryParam) ? categoryParam : "all";
  const q = searchParams.get("q") ?? "";

  return { category, q };
}

export function buildCatalogHref(filters: CatalogFilters): string {
  const params = new URLSearchParams();

  if (filters.category !== "all") {
    params.set("category", filters.category);
  }
  if (filters.q.trim()) {
    params.set("q", filters.q.trim());
  }

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}
