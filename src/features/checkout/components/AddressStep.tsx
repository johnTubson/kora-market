"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/Input";
import type { CheckoutFormInput } from "@/lib/validators";

export function AddressStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormInput>();

  const addressErrors = errors.address;

  return (
    <fieldset className="space-y-4">
      <legend className="sr-only">Delivery address</legend>
      <Input
        label="Full name"
        autoComplete="name"
        error={addressErrors?.fullName?.message}
        {...register("address.fullName")}
      />
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        error={addressErrors?.email?.message}
        {...register("address.email")}
      />
      <Input
        label="Phone"
        type="tel"
        autoComplete="tel"
        error={addressErrors?.phone?.message}
        {...register("address.phone")}
      />
      <Input
        label="Street address"
        autoComplete="street-address"
        error={addressErrors?.street?.message}
        {...register("address.street")}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="City"
          autoComplete="address-level2"
          error={addressErrors?.city?.message}
          {...register("address.city")}
        />
        <Input
          label="State / Region"
          autoComplete="address-level1"
          error={addressErrors?.state?.message}
          {...register("address.state")}
        />
      </div>
      <Input
        label="Postal code (optional)"
        autoComplete="postal-code"
        error={addressErrors?.postalCode?.message}
        {...register("address.postalCode")}
      />
    </fieldset>
  );
}
