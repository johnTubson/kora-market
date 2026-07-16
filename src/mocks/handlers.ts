import { http, HttpResponse } from "msw";

import products from "@/mocks/data/products.json";
import { reserveStock } from "@/lib/inventory";
import {
  createOrderRecord,
  generateOrderId,
  getOrderById,
  maskCardNumber,
} from "@/lib/orders";
import { checkoutSchema } from "@/lib/validators";
import type { Product } from "@/types";

const catalog = products as Product[];

export const handlers = [
  http.get("/api/products", () => HttpResponse.json(catalog)),
  http.get("/api/products/:slug", ({ params }) => {
    const product = catalog.find((item) => item.slug === params.slug);
    return product
      ? HttpResponse.json(product)
      : new HttpResponse(null, { status: 404 });
  }),
  http.get("/api/orders/:orderId", ({ params }) => {
    const order = getOrderById(String(params.orderId));
    return order
      ? HttpResponse.json(order)
      : new HttpResponse(null, { status: 404 });
  }),
  http.post("/api/orders", async ({ request }) => {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return HttpResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid checkout data" },
        { status: 400 }
      );
    }

    const payload = parsed.data;
    const url = new URL(request.url);
    const forceFail =
      payload.forceStockFail === true ||
      url.searchParams.get("forceStockFail") === "1";

    const lines = payload.items.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      name: item.name,
      variantName: item.variantName,
      quantity: item.quantity,
    }));

    const reservation = reserveStock(lines, { forceFail, catalog });
    if (!reservation.ok) {
      return HttpResponse.json(
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

    return HttpResponse.json(order, { status: 201 });
  }),
];
