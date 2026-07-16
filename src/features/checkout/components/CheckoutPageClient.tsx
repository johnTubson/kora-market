import { Suspense } from "react";

import { Container } from "@/components/layout/Container";
import { CheckoutWizard } from "@/features/checkout/components/CheckoutWizard";

export function CheckoutPageClient() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="mt-2 text-muted-foreground">
        Complete your order in three quick steps.
      </p>
      <div className="mt-8">
        <Suspense
          fallback={
            <div
              className="space-y-4"
              aria-busy="true"
              aria-label="Loading checkout"
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-11 animate-pulse rounded-md bg-muted motion-reduce:animate-none"
                />
              ))}
            </div>
          }
        >
          <CheckoutWizard />
        </Suspense>
      </div>
    </Container>
  );
}
