import { Suspense } from "react";

import { CheckoutSuccessClient } from "@/features/checkout/components/CheckoutSuccessClient";

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <CheckoutSuccessClient />
    </Suspense>
  );
}
