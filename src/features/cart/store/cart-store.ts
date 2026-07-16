import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AddToCartInput, CartItem } from "@/features/cart/types";
import {
  addItemToCart,
  clearCart,
  getCartItemCount,
  getCartSubtotal,
  removeItemFromCart,
  updateItemQty,
} from "@/features/cart/utils/cart-utils";

type CartState = {
  items: CartItem[];
  addItem: (input: AddToCartInput) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  clear: () => void;
  itemCount: () => number;
  subtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (input) =>
        set((state) => ({
          items: addItemToCart(state.items, input, input.maxQty),
        })),
      removeItem: (id) =>
        set((state) => ({ items: removeItemFromCart(state.items, id) })),
      updateQty: (id, quantity) =>
        set((state) => {
          const current = state.items.find((item) => item.id === id);
          return {
            items: updateItemQty(state.items, id, quantity, current?.maxQty),
          };
        }),
      clear: () => set({ items: clearCart() }),
      itemCount: () => getCartItemCount(get().items),
      subtotal: () => getCartSubtotal(get().items),
    }),
    {
      name: "kora-cart",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export function selectCartItemCount(state: CartState): number {
  return getCartItemCount(state.items);
}

export function selectCartSubtotal(state: CartState): number {
  return getCartSubtotal(state.items);
}
