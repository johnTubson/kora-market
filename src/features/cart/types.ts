export type CartItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  priceNGN: number;
  image: string;
  variantId: string;
  variantName: string;
  quantity: number;
  /** Optional stock cap from catalog (demo inventory). */
  maxQty?: number;
};

export type AddToCartInput = {
  productId: string;
  slug: string;
  name: string;
  priceNGN: number;
  image: string;
  variantId: string;
  variantName: string;
  quantity?: number;
  maxQty?: number;
};
