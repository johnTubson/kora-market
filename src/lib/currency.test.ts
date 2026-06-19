import { describe, expect, it } from "vitest";

import {
  convertFromNGN,
  formatMoney,
  formatPrice,
  isCurrencyCode,
  toMoney,
} from "@/lib/currency";

describe("currency", () => {
  it("validates currency codes", () => {
    expect(isCurrencyCode("NGN")).toBe(true);
    expect(isCurrencyCode("USD")).toBe(true);
    expect(isCurrencyCode("EUR")).toBe(false);
  });

  it("converts NGN to USD", () => {
    expect(convertFromNGN(1500, "USD")).toBe(1);
    expect(convertFromNGN(24500, "USD")).toBe(16.33);
  });

  it("keeps NGN amounts unchanged", () => {
    expect(convertFromNGN(24500, "NGN")).toBe(24500);
  });

  it("builds money objects", () => {
    expect(toMoney(24500, "USD")).toEqual({
      amount: 16.33,
      currency: "USD",
    });
  });

  it("formats NGN prices", () => {
    expect(formatMoney({ amount: 24500, currency: "NGN" })).toMatch(/24,500/);
  });

  it("formats USD prices", () => {
    expect(formatMoney({ amount: 16.33, currency: "USD" })).toBe("$16.33");
  });

  it("formats price from NGN base amount", () => {
    expect(formatPrice(24500, "NGN")).toMatch(/24,500/);
    expect(formatPrice(24500, "USD")).toBe("$16.33");
  });
});
