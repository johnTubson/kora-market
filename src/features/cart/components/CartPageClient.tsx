"use client";

import { useSyncExternalStore } from "react";

import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { CartEmptyState } from "@/features/cart/components/CartEmptyState";
import { CartLineItem } from "@/features/cart/components/CartLineItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { useCartStore } from "@/features/cart/store/cart-store";

function subscribeToCartHydration(onStoreChange: () => void) {
  return useCartStore.persist.onFinishHydration(onStoreChange);
}

function getCartHydrated() {
  return useCartStore.persist.hasHydrated();
}

function getServerHydrated() {
  return false;
}

export function CartPageClient() {
  const hydrated = useSyncExternalStore(
    subscribeToCartHydration,
    getCartHydrated,
    getServerHydrated
  );
  const items = useCartStore((state) => state.items);

  if (!hydrated) {
    return (
      <Container className="py-10">
        <Skeleton className="h-9 w-48" label="Loading cart" />
        <Skeleton className="mt-4 h-5 w-64" />
        <div className="mt-10 space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">Your cart</h1>
      <p className="mt-2 text-muted-foreground">
        Review items before checkout.
      </p>

      {items.length === 0 ? (
        <div className="mt-10">
          <CartEmptyState />
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="divide-y divide-border rounded-lg border border-border px-4">
            {items.map((item) => (
              <CartLineItem key={item.id} item={item} />
            ))}
          </ul>
          <CartSummary />
        </div>
      )}
    </Container>
  );
}
