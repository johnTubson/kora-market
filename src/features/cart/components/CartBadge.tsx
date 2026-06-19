"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";
import {
  selectCartItemCount,
  useCartStore,
} from "@/features/cart/store/cart-store";

function subscribeToCartHydration(onStoreChange: () => void) {
  return useCartStore.persist.onFinishHydration(onStoreChange);
}

function getCartHydrated() {
  return useCartStore.persist.hasHydrated();
}

function getServerHydrated() {
  return false;
}

export type CartBadgeProps = {
  className?: string;
};

export function CartBadge({ className }: CartBadgeProps) {
  const hydrated = useSyncExternalStore(
    subscribeToCartHydration,
    getCartHydrated,
    getServerHydrated
  );
  const itemCount = useCartStore(selectCartItemCount);
  const displayCount = hydrated ? itemCount : 0;

  return (
    <Link
      href="/cart"
      className={cn(
        "focus-ring relative inline-flex min-h-touch min-w-touch items-center justify-center rounded-md px-3 text-sm font-medium hover:bg-muted",
        className
      )}
      aria-label={`Shopping cart, ${displayCount} item${
        displayCount === 1 ? "" : "s"
      }`}
    >
      Cart
      {displayCount > 0 ? (
        <span
          className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground"
          aria-hidden="true"
        >
          {displayCount > 99 ? "99+" : displayCount}
        </span>
      ) : null}
    </Link>
  );
}
