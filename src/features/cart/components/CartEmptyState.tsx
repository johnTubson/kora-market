import Link from "next/link";

import { Button } from "@/components/ui/Button";

export function CartEmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-border px-6 py-16 text-center">
      <h2 className="text-lg font-semibold">Your cart is empty</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Browse the catalog and add items to get started.
      </p>
      <Link href="/products" className="mt-6 inline-block">
        <Button>Browse products</Button>
      </Link>
    </div>
  );
}
