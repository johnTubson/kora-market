import type { AddToCartInput, CartItem } from "@/features/cart/types";

export function createCartItemId(productId: string, variantId: string): string {
  return `${productId}:${variantId}`;
}

export function addItemToCart(
  items: CartItem[],
  input: AddToCartInput,
  maxQty?: number,
): CartItem[] {
  const id = createCartItemId(input.productId, input.variantId);
  const quantity = input.quantity ?? 1;
  const existing = items.find((item) => item.id === id);
  const cap = maxQty ?? Number.POSITIVE_INFINITY;

  if (existing) {
    return items.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.min(item.quantity + quantity, cap),
            maxQty: maxQty ?? item.maxQty,
          }
        : item,
    );
  }

  return [
    ...items,
    {
      id,
      productId: input.productId,
      slug: input.slug,
      name: input.name,
      priceNGN: input.priceNGN,
      image: input.image,
      variantId: input.variantId,
      variantName: input.variantName,
      quantity: Math.min(quantity, cap),
      maxQty,
    },
  ];
}

export function removeItemFromCart(items: CartItem[], id: string): CartItem[] {
  return items.filter((item) => item.id !== id);
}

export function updateItemQty(
  items: CartItem[],
  id: string,
  quantity: number,
  maxQty?: number,
): CartItem[] {
  if (quantity <= 0) {
    return removeItemFromCart(items, id);
  }

  return items.map((item) => {
    if (item.id !== id) return item;
    const cap = maxQty ?? item.maxQty ?? Number.POSITIVE_INFINITY;
    return {
      ...item,
      quantity: Math.min(quantity, cap),
      maxQty: maxQty ?? item.maxQty,
    };
  });
}

export function clearCart(): CartItem[] {
  return [];
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + item.priceNGN * item.quantity,
    0,
  );
}

export function getLineTotal(item: CartItem): number {
  return item.priceNGN * item.quantity;
}
