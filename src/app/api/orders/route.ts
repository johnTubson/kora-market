import { NextResponse } from "next/server";

import { reserveStock } from "@/lib/inventory";
import {
  createOrderRecord,
  generateOrderId,
  maskCardNumber,
} from "@/lib/orders";
import { checkoutSchema } from "@/lib/validators";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid checkout data" },
      { status: 400 }
    );
  }

  const payload = parsed.data;
  const forceFail =
    payload.forceStockFail === true ||
    new URL(request.url).searchParams.get("forceStockFail") === "1";

  const lines = payload.items.map((item) => ({
    productId: item.productId,
    variantId: item.variantId,
    name: item.name,
    variantName: item.variantName,
    quantity: item.quantity,
  }));

  const reservation = reserveStock(lines, { forceFail });
  if (!reservation.ok) {
    return NextResponse.json(
      {
        error: "OUT_OF_STOCK",
        code: "OUT_OF_STOCK",
        conflicts: reservation.conflicts,
      },
      { status: 409 }
    );
  }

  const orderId = generateOrderId();
  const totalNGN = payload.items.reduce(
    (sum, item) => sum + item.priceNGN * item.quantity,
    0
  );

  const order = createOrderRecord({
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

  return NextResponse.json(order, { status: 201 });
}
