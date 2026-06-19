import { Suspense } from "react";

import { Container } from "@/components/layout/Container";
import { CatalogListing } from "@/features/catalog/components/CatalogListing";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { getProducts } from "@/lib/products";

export default function ProductsPage() {
  const products = getProducts();

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All products</h1>
        <p className="mt-2 text-muted-foreground">
          {products.length} items across electronics, fashion, home, and food.
        </p>
      </div>

      <Suspense fallback={<CatalogListingSkeleton />}>
        <CatalogListing products={products} />
      </Suspense>
    </Container>
  );
}

function CatalogListingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-11 w-full max-w-md animate-pulse rounded-md bg-muted" />
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-24 shrink-0 animate-pulse rounded-full bg-muted"
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}
