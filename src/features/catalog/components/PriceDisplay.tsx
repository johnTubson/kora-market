"use client";

import { useCurrency } from "@/providers/currency-provider";

export type PriceDisplayProps = {
  amountNGN: number;
  className?: string;
};

export function PriceDisplay({ amountNGN, className }: PriceDisplayProps) {
  const { formatPrice } = useCurrency();
  return <span className={className}>{formatPrice(amountNGN)}</span>;
}
