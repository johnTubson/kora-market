"use server";

import { redirect } from "next/navigation";

import { reserveStock, type StockConflict } from "@/lib/inventory";
import {
  createOrderRecord,
  generateOrderId,
  maskCardNumber,
} from "@/lib/orders";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/validators";

export type CreateOrderResult =
  | { error: string; code?: undefined; conflicts?: undefined }
  | { error: string; code: "OUT_OF_STOCK"; conflicts: StockConflict[] };

export async function createOrder(
  data: CheckoutFormValues
): Promise<CreateOrderResult | undefined> {
  const result = checkoutSchema.safeParse(data);

  if (!result.success) {
    return {
      error: result.error.issues[0]?.message ?? "Invalid checkout data",
    };
  }

  const payload = result.data;
  const lines = payload.items.map((item) => ({
    productId: item.productId,
    variantId: item.variantId,
    name: item.name,
    variantName: item.variantName,
    quantity: item.quantity,
  }));

  const reservation = reserveStock(lines, {
    forceFail: payload.forceStockFail === true,
  });

  if (!reservation.ok) {
    const labels = reservation.conflicts
      .map(
        (conflict) =>
          `${conflict.name} (${conflict.variantName}): ${conflict.available} left, ${conflict.requested} requested`
      )
      .join("; ");

    return {
      error: `Some items are no longer available: ${labels}. Update your cart and try again.`,
      code: "OUT_OF_STOCK",
      conflicts: reservation.conflicts,
    };
  }

  const orderId = generateOrderId();
  const totalNGN = payload.items.reduce(
    (sum, item) => sum + item.priceNGN * item.quantity,
    0
  );

  createOrderRecord({
    id: orderId,
    currency: payload.currency,
    items: payload.items.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      name: item.name,
      variantName: item.variantName,
      quantity: item.quantity,
      priceNGN: item.priceNGN,
    })),
    totalNGN,
    address: payload.address,
    paymentMethod: payload.payment.method,
    paymentMask:
      payload.payment.method === "card"
        ? maskCardNumber(payload.payment.cardNumber)
        : null,
  });

  redirect(`/checkout/success?orderId=${orderId}`);
}
