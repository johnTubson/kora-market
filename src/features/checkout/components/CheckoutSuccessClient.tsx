"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/Button";
import { useCartStore } from "@/features/cart/store/cart-store";
import { cn } from "@/lib/cn";

export function CheckoutSuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const clear = useCartStore((state) => state.clear);

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-success/10 px-4 py-2 text-sm font-medium text-success">
        Order confirmed
      </div>
      <h1 className="mt-6 text-3xl font-bold">Thank you for your order!</h1>
      {orderId ? (
        <p className="mt-3 text-muted-foreground">
          Order ID:{" "}
          <span className="font-mono font-semibold text-foreground">
            {orderId}
          </span>
        </p>
      ) : null}
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        This is a demo checkout — no real payment was processed. Your cart has
        been cleared.
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
