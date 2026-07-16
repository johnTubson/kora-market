"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/features/catalog/components/PriceDisplay";
import { getLineTotal } from "@/features/cart/utils/cart-utils";
import type { CartItem } from "@/features/cart/types";
import { useCartStore } from "@/features/cart/store/cart-store";

export type CartLineItemProps = {
  item: CartItem;
};

export function CartLineItem({ item }: CartLineItemProps) {
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const atMax =
    item.maxQty !== undefined && item.quantity >= item.maxQty;

  return (
    <li className="flex gap-4 border-b border-border py-4 last:border-b-0">
      <Link
        href={`/products/${item.slug}`}
        className="focus-ring relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Link
            href={`/products/${item.slug}`}
            className="focus-ring font-medium hover:text-primary"
          >
            {item.name}
          </Link>
          <p className="text-sm text-muted-foreground">{item.variantName}</p>
          <p className="mt-1 text-sm font-semibold text-primary">
            <PriceDisplay amountNGN={getLineTotal(item)} />
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="inline-flex items-center rounded-md border border-border"
            role="group"
            aria-label={`Quantity for ${item.name}`}
          >
            <button
              type="button"
              onClick={() => updateQty(item.id, item.quantity - 1)}
              className="focus-ring min-h-touch min-w-touch px-3 text-lg"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span
              className="min-w-8 text-center text-sm font-medium"
              aria-live="polite"
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQty(item.id, item.quantity + 1)}
              className="focus-ring min-h-touch min-w-touch px-3 text-lg disabled:opacity-40"
              aria-label="Increase quantity"
              disabled={atMax}
            >
              +
            </button>
          </div>
          {item.maxQty !== undefined ? (
            <p className="sr-only">
              Maximum available: {item.maxQty}
            </p>
          ) : null}

          <Button
            variant="ghost"
            className="min-h-touch"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name} from cart`}
          >
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}
