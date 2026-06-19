import type { Metadata } from "next";

import { CheckoutPageClient } from "@/features/checkout/components/CheckoutPageClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order with shipping and payment details.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
