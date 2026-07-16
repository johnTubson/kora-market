import { afterEach, describe, expect, it } from "vitest";

import {
  createOrderRecord,
  getOrderById,
  maskCardNumber,
  resetOrders,
} from "@/lib/orders";

afterEach(() => {
  resetOrders();
});

describe("orders", () => {
  it("masks card numbers to last four digits", () => {
    expect(maskCardNumber("4242424242424242")).toBe("4242");
    expect(maskCardNumber("4242 4242 4242 4242")).toBe("4242");
    expect(maskCardNumber(undefined)).toBeNull();
  });

  it("creates and retrieves an order", () => {
    const order = createOrderRecord({
      id: "KM-TEST",
      currency: "NGN",
      items: [
        {
          productId: "6",
          variantId: "m",
          name: "Ankara Print Dress",
          variantName: "M",
          quantity: 1,
          priceNGN: 24500,
        },
      ],
      totalNGN: 24500,
      address: {
        fullName: "Amina Okafor",
        email: "amina@example.com",
        phone: "+2348000000000",
        street: "12 Marina Road",
        city: "Lagos",
        state: "Lagos",
      },
      paymentMethod: "card",
      paymentMask: "4242",
    });

    expect(getOrderById("KM-TEST")).toEqual(order);
    expect(getOrderById("missing")).toBeUndefined();
  });
});
