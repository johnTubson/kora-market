import type { CurrencyCode, Money } from "@/types";

export const NGN_TO_USD_RATE = 1500;

export const CURRENCY_COOKIE = "kora-currency";

export function isCurrencyCode(
  value: string | undefined
): value is CurrencyCode {
  return value === "NGN" || value === "USD";
}

export function convertFromNGN(
  amountNGN: number,
  currency: CurrencyCode
): number {
  if (currency === "NGN") return amountNGN;
  return Math.round((amountNGN / NGN_TO_USD_RATE) * 100) / 100;
}

export function toMoney(amountNGN: number, currency: CurrencyCode): Money {
  return {
    amount: convertFromNGN(amountNGN, currency),
    currency,
  };
}

export function formatMoney(money: Money): string {
  if (money.currency === "NGN") {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(money.amount);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(money.amount);
}

export function formatPrice(amountNGN: number, currency: CurrencyCode): string {
  return formatMoney(toMoney(amountNGN, currency));
}
