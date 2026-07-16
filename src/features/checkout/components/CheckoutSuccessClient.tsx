"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/Button";
import { useCartStore } from "@/features/cart/store/cart-store";
import { PriceDisplay } from "@/features/catalog/components/PriceDisplay";
import { cn } from "@/lib/cn";
import type { OrderRecord } from "@/lib/orders";

type CheckoutSuccessClientProps = {
  orderId: string | null;
  order: OrderRecord | null;
};

export function CheckoutSuccessClient({
  orderId,
  order,
}: CheckoutSuccessClientProps) {
  const clear = useCartStore((state) => state.clear);

  useEffect(() => {
    if (orderId) clear();
  }, [clear, orderId]);

  if (!orderId) {
    return (
      <Container className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
        <h1 className="text-3xl font-bold">Nothing to show here</h1>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          We couldn&apos;t find an order for this page. Head back to your cart
          to continue checkout.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/cart"
            className={cn(buttonVariants({ variant: "primary" }))}
          >
            Back to cart
          </Link>
          <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
            Back to home
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-success/10 px-4 py-2 text-sm font-medium text-success">
        Order confirmed
      </div>
      <h1 className="mt-6 text-3xl font-bold">Thank you for your order!</h1>
      <p className="mt-3 text-muted-foreground">
        Order ID:{" "}
        <span className="font-mono font-semibold text-foreground">
          {orderId}
        </span>
      </p>

      {order ? (
        <div className="mt-6 w-full max-w-md rounded-lg border border-border p-4 text-left">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Order summary
          </h2>
          <ul className="mt-3 divide-y divide-border">
            {order.items.map((item) => (
              <li
                key={`${item.productId}:${item.variantId}`}
                className="flex items-center justify-between gap-3 py-2 text-sm"
              >
                <span>
                  {item.name}{" "}
                  <span className="text-muted-foreground">
                    ({item.variantName} × {item.quantity})
                  </span>
                </span>
                <span className="font-medium text-primary">
                  <PriceDisplay amountNGN={item.priceNGN * item.quantity} />
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold">
            <span>Total</span>
            <span className="text-primary">
              <PriceDisplay amountNGN={order.totalNGN} />
            </span>
          </p>
          {order.paymentMask ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Charged to card ending •••• {order.paymentMask}
            </p>
          ) : null}
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground" role="status">
          Order placed — summary unavailable in this session.
        </p>
      )}

      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        This is a demo checkout — no real payment was processed. Stock was
        reserved and your cart has been cleared.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/products"
          className={cn(buttonVariants({ variant: "primary" }))}
        >
          Continue shopping
        </Link>
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
          Back to home
        </Link>
      </div>
    </Container>
  );
}
