import type { CategoryMeta } from "@/types";

export const CATEGORY_META: CategoryMeta[] = [
  {
    id: "electronics",
    label: "Electronics",
    description: "Phones, audio, and everyday tech",
  },
  {
    id: "fashion",
    label: "Fashion",
    description: "Ankara, kente, and modern African style",
  },
  {
    id: "home",
    label: "Home & Living",
    description: "Handcrafted decor and kitchen essentials",
  },
  {
    id: "food",
    label: "Food & Groceries",
    description: "Pantry staples and local specialties",
  },
];

export function getCategoryLabel(category: CategoryMeta["id"]): string {
  return CATEGORY_META.find((item) => item.id === category)?.label ?? category;
}
