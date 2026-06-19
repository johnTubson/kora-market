import { beforeEach, describe, expect, it } from "vitest";

import { useCartStore } from "@/features/cart/store/cart-store";

describe("cart-store", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it("adds items through the store", () => {
    useCartStore.getState().addItem({
      productId: "1",
      slug: "ankara-print-dress",
      name: "Ankara Print Dress",
      priceNGN: 24500,
      image: "/image.jpg",
      variantId: "m",
      variantName: "Size M",
    });

    expect(useCartStore.getState().itemCount()).toBe(1);
    expect(useCartStore.getState().subtotal()).toBe(24500);
  });

  it("updates and removes items", () => {
    useCartStore.getState().addItem({
      productId: "1",
      slug: "ankara-print-dress",
      name: "Ankara Print Dress",
      priceNGN: 24500,
      image: "/image.jpg",
      variantId: "m",
      variantName: "Size M",
      quantity: 2,
    });

    const id = useCartStore.getState().items[0]?.id;
    expect(id).toBeDefined();

    useCartStore.getState().updateQty(id!, 4);
    expect(useCartStore.getState().itemCount()).toBe(4);

    useCartStore.getState().removeItem(id!);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("clears the cart", () => {
    useCartStore.getState().addItem({
      productId: "1",
      slug: "ankara-print-dress",
      name: "Ankara Print Dress",
      priceNGN: 24500,
      image: "/image.jpg",
      variantId: "m",
      variantName: "Size M",
    });

    useCartStore.getState().clear();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
