import type { Metadata } from "next";

import { CheckoutSuccessClient } from "@/features/checkout/components/CheckoutSuccessClient";
import { getOrderById } from "@/lib/orders";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your Kora Market order was placed successfully.",
  robots: { index: false, follow: false },
};

type CheckoutSuccessPageProps = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { orderId } = await searchParams;
  const order = orderId ? getOrderById(orderId) ?? null : null;

  return <CheckoutSuccessClient orderId={orderId ?? null} order={order} />;
}
