import productsData from "@/mocks/data/products.json";
import type { Category, Product } from "@/types";

const products = productsData as Product[];

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((product) => product.featured).slice(0, limit);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((product) => product.category === category);
}

export function getAllProductSlugs(): string[] {
  return products.map((product) => product.slug);
}

export function searchProducts(
  query: string,
  category?: Category | "all"
): Product[] {
  const normalizedQuery = query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory =
      !category || category === "all" || product.category === category;
    const matchesQuery =
      !normalizedQuery ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
}
