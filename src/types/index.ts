export const CATEGORIES = ["electronics", "fashion", "home", "food"] as const;

export type Category = (typeof CATEGORIES)[number];

export function isCategory(
  value: string | null | undefined
): value is Category {
  return CATEGORIES.includes(value as Category);
}

export type CurrencyCode = "NGN" | "USD";

export type Money = {
  amount: number;
  currency: CurrencyCode;
};

export type ProductVariant = {
  id: string;
  name: string;
  inStock: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: Category;
  priceNGN: number;
  images: string[];
  featured?: boolean;
  variants: ProductVariant[];
  inStock: boolean;
};

export type CategoryMeta = {
  id: Category;
  label: string;
  description: string;
};
