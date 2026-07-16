export type OrderLine = {
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  quantity: number;
  priceNGN: number;
};

export type OrderAddress = {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode?: string;
};

export type OrderRecord = {
  id: string;
  createdAt: string;
  currency: "NGN" | "USD";
  items: OrderLine[];
  totalNGN: number;
  address: OrderAddress;
  paymentMethod: "card" | "bank_transfer" | "mobile_money";
  // Last 4 digits when card; otherwise null
  paymentMask: string | null;
};

const orders = new Map<string, OrderRecord>();

export function generateOrderId(): string {
  const suffix = Date.now().toString(36).toUpperCase();
  return `KM-${suffix}`;
}

export function maskCardNumber(cardNumber: string | undefined): string | null {
  if (!cardNumber) return null;
  const digits = cardNumber.replace(/\s/g, "");
  if (digits.length < 4) return null;
  return digits.slice(-4);
}

export function createOrderRecord(
  input: Omit<OrderRecord, "createdAt"> & { createdAt?: string }
): OrderRecord {
  const record: OrderRecord = {
    ...input,
    createdAt: input.createdAt ?? new Date().toISOString(),
  };
  orders.set(record.id, record);
  return record;
}

export function getOrderById(id: string): OrderRecord | undefined {
  return orders.get(id);
}

export function resetOrders(): void {
  orders.clear();
}

export function listOrders(): OrderRecord[] {
  return Array.from(orders.values());
}
