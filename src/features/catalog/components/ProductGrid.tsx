import { ProductCard } from "@/features/catalog/components/ProductCard";
import type { Product } from "@/types";

export type ProductGridProps = {
  products: Product[];
  priorityFirst?: boolean;
};

export function ProductGrid({
  products,
  priorityFirst = false,
}: ProductGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            priority={priorityFirst && index < 4}
          />
        </li>
      ))}
    </ul>
  );
}
