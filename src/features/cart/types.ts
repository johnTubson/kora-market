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
};
