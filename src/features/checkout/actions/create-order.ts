"use server";

import { redirect } from "next/navigation";

import { checkoutSchema, type CheckoutFormValues } from "@/lib/validators";

function generateOrderId(): string {
  const suffix = Date.now().toString(36).toUpperCase();
  return `KM-${suffix}`;
}

export async function createOrder(
  data: CheckoutFormValues
): Promise<{ error: string } | undefined> {
  const result = checkoutSchema.safeParse(data);

  if (!result.success) {
    return {
      error: result.error.issues[0]?.message ?? "Invalid checkout data",
    };
  }

  const orderId = generateOrderId();
  redirect(`/checkout/success?orderId=${orderId}`);
}
