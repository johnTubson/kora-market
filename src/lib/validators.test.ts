import { describe, expect, it } from "vitest";

import { addressSchema, checkoutSchema, paymentSchema } from "@/lib/validators";

describe("validators", () => {
  const validAddress = {
    fullName: "Amina Okafor",
    email: "amina@example.com",
    phone: "+2348000000000",
    street: "12 Marina Road",
    city: "Lagos",
    state: "Lagos",
  };

  it("validates a complete address", () => {
    const result = addressSchema.safeParse(validAddress);
    expect(result.success).toBe(true);
  });

  it("rejects invalid email in address", () => {
    const result = addressSchema.safeParse({
      ...validAddress,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("validates card payment details", () => {
    const result = paymentSchema.safeParse({
      method: "card",
      cardName: "Amina Okafor",
      cardNumber: "4242424242424242",
      expiry: "12/28",
      cvv: "123",
    });
    expect(result.success).toBe(true);
  });

  it("allows non-card payment without card fields", () => {
    const result = paymentSchema.safeParse({
      method: "mobile_money",
    });
    expect(result.success).toBe(true);
  });

  it("validates full checkout payload", () => {
    const result = checkoutSchema.safeParse({
      address: validAddress,
      payment: {
        method: "bank_transfer",
      },
      items: [
        {
          id: "1:m",
          productId: "1",
          variantId: "m",
          name: "Ankara Print Dress",
          variantName: "Size M",
          quantity: 1,
          priceNGN: 24500,
        },
      ],
      currency: "NGN",
    });
    expect(result.success).toBe(true);
  });
});
