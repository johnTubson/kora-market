import { describe, expect, it } from "vitest";

import type { CartItem } from "@/features/cart/types";
import {
  addItemToCart,
  clearCart,
  createCartItemId,
  getCartItemCount,
  getCartSubtotal,
  getLineTotal,
  removeItemFromCart,
  updateItemQty,
} from "@/features/cart/utils/cart-utils";

const baseInput = {
  productId: "1",
  slug: "ankara-print-dress",
  name: "Ankara Print Dress",
  priceNGN: 24500,
  image: "/image.jpg",
  variantId: "m",
  variantName: "Size M",
};

const sampleItem: CartItem = {
  id: createCartItemId("1", "m"),
  ...baseInput,
  quantity: 2,
};

describe("cart-utils", () => {
  it("creates stable cart item ids", () => {
    expect(createCartItemId("1", "m")).toBe("1:m");
  });

  it("adds a new item to the cart", () => {
    const items = addItemToCart([], baseInput);

    expect(items).toHaveLength(1);
    expect(items[0]?.quantity).toBe(1);
    expect(items[0]?.name).toBe("Ankara Print Dress");
  });

  it("merges quantity when adding the same variant", () => {
    const first = addItemToCart([], baseInput);
    const second = addItemToCart(first, { ...baseInput, quantity: 2 });

    expect(second).toHaveLength(1);
    expect(second[0]?.quantity).toBe(3);
  });

  it("adds separate lines for different variants", () => {
    const first = addItemToCart([], baseInput);
    const second = addItemToCart(first, {
      ...baseInput,
      variantId: "l",
      variantName: "Size L",
    });

    expect(second).toHaveLength(2);
  });

  it("removes an item by id", () => {
    const items = removeItemFromCart([sampleItem], sampleItem.id);
    expect(items).toHaveLength(0);
  });

  it("updates item quantity", () => {
    const items = updateItemQty([sampleItem], sampleItem.id, 5);
    expect(items[0]?.quantity).toBe(5);
  });

  it("caps quantity at maxQty", () => {
    const items = addItemToCart([], { ...baseInput, quantity: 10 }, 2);
    expect(items[0]?.quantity).toBe(2);

    const bumped = updateItemQty(items, items[0]!.id, 9, 2);
    expect(bumped[0]?.quantity).toBe(2);
  });

  it("removes item when quantity is zero or less", () => {
    const items = updateItemQty([sampleItem], sampleItem.id, 0);
    expect(items).toHaveLength(0);
  });

  it("clears all cart items", () => {
    expect(clearCart()).toEqual([]);
  });

  it("calculates total item count", () => {
    const items = [
      sampleItem,
      { ...sampleItem, id: "2:l", productId: "2", quantity: 1 },
    ];
    expect(getCartItemCount(items)).toBe(3);
  });

  it("calculates cart subtotal in NGN", () => {
    expect(getCartSubtotal([sampleItem])).toBe(49000);
  });

  it("calculates line total", () => {
    expect(getLineTotal(sampleItem)).toBe(49000);
  });
});
