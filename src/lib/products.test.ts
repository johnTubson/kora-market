import { describe, expect, it } from "vitest";

import {
  getFeaturedProducts,
  getProducts,
  getProductBySlug,
  getProductsByCategory,
  searchProducts,
} from "@/lib/products";

describe("products", () => {
  it("returns at least 12 catalog products", () => {
    expect(getProducts().length).toBeGreaterThanOrEqual(12);
  });

  it("returns featured products only", () => {
    const featured = getFeaturedProducts();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((product) => product.featured)).toBe(true);
  });

  it("finds product by slug", () => {
    const product = getProductBySlug("ankara-print-dress");
    expect(product?.name).toBe("Ankara Print Dress");
  });

  it("returns undefined for unknown slug", () => {
    expect(getProductBySlug("missing-product")).toBeUndefined();
  });

  it("filters by category", () => {
    const fashion = getProductsByCategory("fashion");
    expect(fashion.every((product) => product.category === "fashion")).toBe(
      true,
    );
    expect(fashion.length).toBeGreaterThan(0);
  });

  it("searches products by name", () => {
    const results = searchProducts("ankara");
    expect(results.some((product) => product.slug === "ankara-print-dress")).toBe(
      true,
    );
  });

  it("filters search results by category", () => {
    const results = searchProducts("", "electronics");
    expect(
      results.every((product) => product.category === "electronics"),
    ).toBe(true);
  });
});
