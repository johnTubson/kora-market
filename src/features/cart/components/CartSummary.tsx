"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/features/catalog/components/PriceDisplay";
import {
  selectCartSubtotal,
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

export function CartSummary() {
  const router = useRouter();
  const hydrated = useSyncExternalStore(
    subscribeToCartHydration,
    getCartHydrated,
    getServerHydrated
  );
  const subtotal = useCartStore(selectCartSubtotal);
  const itemCount = useCartStore((state) => state.itemCount());
  const clear = useCartStore((state) => state.clear);

  function handleCheckout() {
    if (hydrated && itemCount === 0) {
      return;
    }
    router.push("/checkout");
  }

  return (
    <aside className="rounded-lg border border-border bg-muted/30 p-6">
      <h2 className="text-lg font-semibold">Order summary</h2>
      <dl className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-semibold text-primary">
            <PriceDisplay amountNGN={subtotal} />
          </dd>
        </div>
      </dl>
      <p className="mt-2 text-xs text-muted-foreground">
        Shipping and taxes calculated at checkout.
      </p>
      <div className="mt-6 flex flex-col gap-2">
        <Button
          className="w-full"
          disabled={!hydrated || itemCount === 0}
          onClick={handleCheckout}
        >
          Proceed to checkout
        </Button>
        <Button variant="ghost" size="sm" onClick={clear}>
          Clear cart
        </Button>
        <Link
          href="/products"
          className="text-center text-sm text-primary hover:underline"
        >
          Continue shopping
        </Link>
      </div>
    </aside>
  );
}
