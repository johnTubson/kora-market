"use client";

import { MswProvider } from "@/providers/msw-provider";
import { CartProvider } from "@/providers/cart-provider";
import { CurrencyProvider } from "@/providers/currency-provider";
import { ToastProvider } from "@/components/ui/Toast";
import type { CurrencyCode } from "@/types";

type AppProvidersProps = {
  children: React.ReactNode;
  initialCurrency: CurrencyCode;
};

export function AppProviders({ children, initialCurrency }: AppProvidersProps) {
  return (
    <MswProvider>
      <CurrencyProvider initialCurrency={initialCurrency}>
        <CartProvider>
          <ToastProvider>{children}</ToastProvider>
        </CartProvider>
      </CurrencyProvider>
    </MswProvider>
  );
}
