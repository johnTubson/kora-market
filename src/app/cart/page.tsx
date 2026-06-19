import type { Metadata } from "next";

import { CartPageClient } from "@/features/cart/components/CartPageClient";

export const metadata: Metadata = {
  title: "Your cart",
  description: "Review items in your cart before checkout.",
};

export default function CartPage() {
  return <CartPageClient />;
}
