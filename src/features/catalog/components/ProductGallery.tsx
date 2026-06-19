"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/cn";
import type { Product } from "@/types";

export type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = product.images[activeIndex] ?? product.images[0];

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={activeImage}
          alt={`${product.name} — image ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {product.images.length > 1 ? (
        <ul className="flex gap-2 overflow-x-auto" aria-label="Product images">
          {product.images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                aria-label={`View image ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "focus-ring relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2",
                  activeIndex === index
                    ? "border-primary"
                    : "border-transparent"
                )}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
