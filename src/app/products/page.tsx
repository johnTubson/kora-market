import { Suspense } from "react";

import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { CatalogListing } from "@/features/catalog/components/CatalogListing";
import { getProducts } from "@/lib/products";

export default function ProductsPage() {
  const products = getProducts();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Container className="py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">All products</h1>
            <p className="mt-2 text-muted-foreground">
              {products.length} items across electronics, fashion, home, and
              food.
            </p>
          </div>

          <Suspense fallback={<ProductsListingSkeleton />}>
            <CatalogListing products={products} />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function ProductsListingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
