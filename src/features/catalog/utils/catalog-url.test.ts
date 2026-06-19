import { describe, expect, it } from "vitest";

import {
  buildCatalogHref,
  parseCatalogFilters,
} from "@/features/catalog/utils/catalog-url";

describe("catalog-url", () => {
  it("parses empty search params", () => {
    const params = new URLSearchParams();
    expect(parseCatalogFilters(params)).toEqual({ category: "all", q: "" });
  });

  it("parses category and query params", () => {
    const params = new URLSearchParams("category=fashion&q=ankara");
    expect(parseCatalogFilters(params)).toEqual({
      category: "fashion",
      q: "ankara",
    });
  });

  it("ignores invalid category", () => {
    const params = new URLSearchParams("category=invalid&q=test");
    expect(parseCatalogFilters(params)).toEqual({ category: "all", q: "test" });
  });

  it("builds href with filters", () => {
    expect(buildCatalogHref({ category: "fashion", q: "ankara" })).toBe(
      "/products?category=fashion&q=ankara"
    );
  });

  it("builds href without empty query", () => {
    expect(buildCatalogHref({ category: "all", q: "" })).toBe("/products");
    expect(buildCatalogHref({ category: "food", q: "  " })).toBe(
      "/products?category=food"
    );
  });

  it("builds href with query only", () => {
    expect(buildCatalogHref({ category: "all", q: "rice" })).toBe(
      "/products?q=rice"
    );
  });
});
