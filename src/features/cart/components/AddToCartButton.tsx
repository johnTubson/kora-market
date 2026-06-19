"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useCartStore } from "@/features/cart/store/cart-store";
import type { Product } from "@/types";

export type AddToCartButtonProps = {
  product: Product;
  variantId: string;
  variantName: string;
  disabled?: boolean;
  className?: string;
};

export function AddToCartButton({
  product,
  variantId,
  variantName,
  disabled,
  className,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { showToast } = useToast();
  const [adding, setAdding] = useState(false);

  function handleAddToCart() {
    setAdding(true);

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      priceNGN: product.priceNGN,
      image: product.images[0],
      variantId,
      variantName,
      quantity: 1,
    });

    showToast({
      title: "Added to cart",
      description: `${product.name} (${variantName})`,
      variant: "primary",
    });

    setAdding(false);
  }

  return (
    <Button
      size="lg"
      disabled={disabled || adding}
      onClick={handleAddToCart}
      className={className}
    >
      Add to cart
    </Button>
  );
}
