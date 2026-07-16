import { afterEach, describe, expect, it } from "vitest";

import {
  assertCartAvailable,
  getAvailableQty,
  getReservedQty,
  reserveStock,
  resetReservations,
} from "@/lib/inventory";
import type { Product } from "@/types";

const catalog: Product[] = [
  {
    id: "1",
    slug: "earbuds",
    name: "Earbuds",
    description: "Test",
    category: "electronics",
    priceNGN: 1000,
    images: ["/a.webp"],
    inStock: true,
    variants: [
      { id: "white", name: "White", inStock: true, stockQty: 2 },
      { id: "black", name: "Black", inStock: true, stockQty: 10 },
    ],
  },
];

afterEach(() => {
  resetReservations();
});

describe("inventory", () => {
  it("reports catalog availability", () => {
    expect(getAvailableQty("1", "white", catalog)).toBe(2);
  });

  it("detects oversell conflicts", () => {
    const conflicts = assertCartAvailable(
      [
        {
          productId: "1",
          variantId: "white",
          name: "Earbuds",
          variantName: "White",
          quantity: 3,
        },
      ],
      catalog
    );

    expect(conflicts).toHaveLength(1);
    expect(conflicts[0]?.available).toBe(2);
  });

  it("reserves stock and reduces availability", () => {
    const first = reserveStock(
      [
        {
          productId: "1",
          variantId: "white",
          name: "Earbuds",
          variantName: "White",
          quantity: 2,
        },
      ],
      { catalog }
    );

    expect(first).toEqual({ ok: true });
    expect(getReservedQty("1", "white")).toBe(2);
    expect(getAvailableQty("1", "white", catalog)).toBe(0);

    const second = reserveStock(
      [
        {
          productId: "1",
          variantId: "white",
          name: "Earbuds",
          variantName: "White",
          quantity: 1,
        },
      ],
      { catalog }
    );

    expect(second.ok).toBe(false);
    if (!second.ok) {
      expect(second.conflicts[0]?.available).toBe(0);
    }
  });

  it("forceFail returns conflicts without reserving", () => {
    const result = reserveStock(
      [
        {
          productId: "1",
          variantId: "black",
          name: "Earbuds",
          variantName: "Black",
          quantity: 1,
        },
      ],
      { forceFail: true, catalog }
    );

    expect(result.ok).toBe(false);
    expect(getReservedQty("1", "black")).toBe(0);
  });
});
