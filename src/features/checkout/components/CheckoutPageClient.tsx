"use client";

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
        <CheckoutWizard />
      </div>
    </Container>
  );
}
