"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { PriceDisplay } from "@/features/catalog/components/PriceDisplay";
import { ProductGallery } from "@/features/catalog/components/ProductGallery";
import { VariantSelector } from "@/features/catalog/components/VariantSelector";
import { AddToCartButton } from "@/features/cart/components/AddToCartButton";
import { getCategoryLabel } from "@/features/catalog/constants";
import type { Product } from "@/types";

export type ProductDetailClientProps = {
  product: Product;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const defaultVariant =
    product.variants.find((variant) => variant.inStock)?.id ??
    product.variants[0]?.id ??
    "";
  const defaultVariantName =
    product.variants.find((variant) => variant.id === defaultVariant)?.name ??
    "Default";

  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const selectedVariantMeta = product.variants.find(
    (variant) => variant.id === selectedVariant,
  );
  const variantInStock = selectedVariantMeta?.inStock;
  const variantName = selectedVariantMeta?.name ?? defaultVariantName;

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

        <p className="leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {product.variants.length > 0 ? (
          <VariantSelector
            variants={product.variants}
            value={selectedVariant}
            onChange={setSelectedVariant}
          />
        ) : null}

        <AddToCartButton
          product={product}
          variantId={selectedVariant || "default"}
          variantName={variantName}
          disabled={!product.inStock || variantInStock === false}
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
}
