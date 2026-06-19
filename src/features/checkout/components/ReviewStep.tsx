"use client";

import { useFormContext } from "react-hook-form";

import { PriceDisplay } from "@/features/catalog/components/PriceDisplay";
import { useCurrency } from "@/providers/currency-provider";
import type { CheckoutFormValues } from "@/lib/validators";

export function ReviewStep() {
  const { watch } = useFormContext<CheckoutFormValues>();
  const { formatPrice } = useCurrency();

  const address = watch("address");
  const payment = watch("payment");
  const items = watch("items");

  const subtotal = items.reduce(
    (total, item) => total + item.priceNGN * item.quantity,
    0
  );

  const paymentLabel =
    payment.method === "card"
      ? "Debit / Credit card"
      : payment.method === "bank_transfer"
      ? "Bank transfer"
      : "Mobile money";

  return (
    <div className="space-y-6">
      <section aria-labelledby="review-address-heading">
        <h2
          id="review-address-heading"
          className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Delivery
        </h2>
        <address className="mt-2 not-italic text-sm leading-relaxed">
          {address.fullName}
          <br />
          {address.street}
          <br />
          {address.city}, {address.state}
          {address.postalCode ? ` ${address.postalCode}` : ""}
          <br />
          {address.phone}
          <br />
          {address.email}
        </address>
      </section>

      <section aria-labelledby="review-payment-heading">
        <h2
          id="review-payment-heading"
          className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Payment
        </h2>
        <p className="mt-2 text-sm">{paymentLabel}</p>
        {payment.method === "card" && payment.cardNumber ? (
          <p className="text-sm text-muted-foreground">
            Card ending •••• {payment.cardNumber.slice(-4)}
          </p>
        ) : null}
      </section>

      <section aria-labelledby="review-items-heading">
        <h2
          id="review-items-heading"
          className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Items ({items.length})
        </h2>
        <ul className="mt-2 divide-y divide-border">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-4 py-3 text-sm"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground">
                  {item.variantName} × {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-primary">
                <PriceDisplay amountNGN={item.priceNGN * item.quantity} />
              </p>
            </li>
          ))}
        </ul>
        <dl className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <dt className="font-medium">Total</dt>
          <dd className="text-lg font-bold text-primary">
            {formatPrice(subtotal)}
          </dd>
        </dl>
      </section>
    </div>
  );
}
