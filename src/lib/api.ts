import type { Product } from "@/types";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${getBaseUrl()}/api/products`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json() as Promise<Product[]>;
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  const response = await fetch(`${getBaseUrl()}/api/products/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Product not found: ${slug}`);
  }

  return response.json() as Promise<Product>;
}
