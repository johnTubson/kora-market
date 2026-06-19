"use client";

import { useEffect, type ReactNode } from "react";

import { useCartStore } from "@/features/cart/store/cart-store";

export function CartProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return children;
}
