"use client";

import { MswProvider } from "@/providers/msw-provider";
import { CurrencyProvider } from "@/providers/currency-provider";
import type { CurrencyCode } from "@/types";

type AppProvidersProps = {
  children: React.ReactNode;
  initialCurrency: CurrencyCode;
};

export function AppProviders({ children, initialCurrency }: AppProvidersProps) {
  return (
    <MswProvider>
      <CurrencyProvider initialCurrency={initialCurrency}>
        {children}
      </CurrencyProvider>
    </MswProvider>
  );
}
