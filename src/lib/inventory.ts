import { getProducts } from "@/lib/products";
import type { Product } from "@/types";

export type StockConflict = {
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  requested: number;
  available: number;
};

export type CartStockLine = {
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  quantity: number;
};

/** Process-local reservations for the demo (survives within one Node process). */
const reservations = new Map<string, number>();

export function stockKey(productId: string, variantId: string): string {
  return `${productId}:${variantId}`;
}

export function getCatalogStockQty(
  productId: string,
  variantId: string,
  catalog: Product[] = getProducts()
): number {
  const product = catalog.find((item) => item.id === productId);
  const variant = product?.variants.find((item) => item.id === variantId);
  return variant?.stockQty ?? 0;
}

export function getAvailableQty(
  productId: string,
  variantId: string,
  catalog: Product[] = getProducts()
): number {
  const base = getCatalogStockQty(productId, variantId, catalog);
  const reserved = reservations.get(stockKey(productId, variantId)) ?? 0;
  return Math.max(0, base - reserved);
}

export function assertCartAvailable(
  lines: CartStockLine[],
  catalog: Product[] = getProducts()
): StockConflict[] {
  const conflicts: StockConflict[] = [];

  for (const line of lines) {
    const available = getAvailableQty(line.productId, line.variantId, catalog);
    if (line.quantity > available) {
      conflicts.push({
        productId: line.productId,
        variantId: line.variantId,
        name: line.name,
        variantName: line.variantName,
        requested: line.quantity,
        available,
      });
    }
  }

  return conflicts;
}

/**
 * Reserve stock for an order. Returns conflicts without mutating if any line fails.
 * When forceFail is true (demo/e2e), every line is treated as unavailable.
 */
export function reserveStock(
  lines: CartStockLine[],
  options: { forceFail?: boolean; catalog?: Product[] } = {}
): { ok: true } | { ok: false; conflicts: StockConflict[] } {
  const catalog = options.catalog ?? getProducts();

  if (options.forceFail) {
    return {
      ok: false,
      conflicts: lines.map((line) => ({
        productId: line.productId,
        variantId: line.variantId,
        name: line.name,
        variantName: line.variantName,
        requested: line.quantity,
        available: 0,
      })),
    };
  }

  const conflicts = assertCartAvailable(lines, catalog);
  if (conflicts.length > 0) {
    return { ok: false, conflicts };
  }

  for (const line of lines) {
    const key = stockKey(line.productId, line.variantId);
    const current = reservations.get(key) ?? 0;
    reservations.set(key, current + line.quantity);
  }

  return { ok: true };
}

export function resetReservations(): void {
  reservations.clear();
}

export function getReservedQty(productId: string, variantId: string): number {
  return reservations.get(stockKey(productId, variantId)) ?? 0;
}
