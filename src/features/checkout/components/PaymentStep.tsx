"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import type { CheckoutFormValues } from "@/lib/validators";

const paymentMethods = [
  { value: "card", label: "Debit / Credit card" },
  { value: "bank_transfer", label: "Bank transfer" },
  { value: "mobile_money", label: "Mobile money" },
];

export function PaymentStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  const method = watch("payment.method");
  const paymentErrors = errors.payment;

  return (
    <fieldset className="space-y-4">
      <legend className="sr-only">Payment method</legend>
      <Select
        label="Payment method"
        options={paymentMethods}
        error={paymentErrors?.method?.message}
        {...register("payment.method")}
      />

      {method === "card" ? (
        <div
          className={cn(
            "space-y-4 rounded-lg border border-border p-4 motion-safe:transition-opacity motion-safe:duration-200"
          )}
        >
          <Input
            label="Name on card"
            autoComplete="cc-name"
            error={paymentErrors?.cardName?.message}
            {...register("payment.cardName")}
          />
          <Input
            label="Card number"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="4242 4242 4242 4242"
            error={paymentErrors?.cardNumber?.message}
            {...register("payment.cardNumber")}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Expiry"
              placeholder="MM/YY"
              autoComplete="cc-exp"
              error={paymentErrors?.expiry?.message}
              {...register("payment.expiry")}
            />
            <Input
              label="CVV"
              inputMode="numeric"
              autoComplete="cc-csc"
              error={paymentErrors?.cvv?.message}
              {...register("payment.cvv")}
            />
          </div>
        </div>
      ) : (
        <p className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
          {method === "bank_transfer"
            ? "You will receive bank transfer instructions after placing your order."
            : "You will receive a mobile money prompt after placing your order."}
        </p>
      )}
    </fieldset>
  );
}
