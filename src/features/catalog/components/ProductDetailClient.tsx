"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/features/catalog/components/PriceDisplay";
import { ProductGallery } from "@/features/catalog/components/ProductGallery";
import { VariantSelector } from "@/features/catalog/components/VariantSelector";
import { getCategoryLabel } from "@/features/catalog/constants";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/types";

export type ProductDetailClientProps = {
  product: Product;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const defaultVariant =
    product.variants.find((variant) => variant.inStock)?.id ??
    product.variants[0]?.id ??
    "";
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const variantInStock = product.variants.find(
    (variant) => variant.id === selectedVariant
  )?.inStock;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <ProductGallery product={product} />

      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            {getCategoryLabel(product.category)}
          </p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-bold text-primary">
            <PriceDisplay amountNGN={product.priceNGN} />
          </p>
          {!product.inStock ? (
            <Badge variant="destructive" className="mt-3">
              Out of stock
            </Badge>
          ) : null}
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        {product.variants.length > 0 ? (
          <VariantSelector
            variants={product.variants}
            value={selectedVariant}
            onChange={setSelectedVariant}
          />
        ) : null}

        <Button
          size="lg"
          disabled={!product.inStock || variantInStock === false}
          className="w-full sm:w-auto"
        >
          Add to cart
        </Button>
        <p className="text-xs text-muted-foreground">
          Cart functionality coming soon.
        </p>
      </div>
    </div>
  );
}
