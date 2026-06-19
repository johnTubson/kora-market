"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { formatPrice } from "@/lib/currency";
import type { CurrencyCode } from "@/types";

const CURRENCY_COOKIE = "kora-currency";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountNGN: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function setCurrencyCookie(currency: CurrencyCode) {
  document.cookie = `${CURRENCY_COOKIE}=${currency};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

export function CurrencyProvider({
  children,
  initialCurrency,
}: {
  children: ReactNode;
  initialCurrency: CurrencyCode;
}) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(initialCurrency);

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next);
    setCurrencyCookie(next);
  }, []);

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      formatPrice: (amountNGN: number) => formatPrice(amountNGN, currency),
    }),
    [currency, setCurrency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}
