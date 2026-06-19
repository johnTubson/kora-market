import { Suspense } from "react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { CategoryChips } from "@/features/catalog/components/CategoryChips";
import { HeroBanner } from "@/features/catalog/components/HeroBanner";
import { ProductGrid } from "@/features/catalog/components/ProductGrid";
import { getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const featuredProducts = getFeaturedProducts(8);

  return (
    <>
      <HeroBanner />

      <Container className="py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Shop by category</h2>
            <p className="mt-1 text-muted-foreground">
              Browse electronics, fashion, home goods, and pantry staples.
            </p>
          </div>
        </div>

        <Suspense fallback={<CategoryChipsSkeleton />}>
          <CategoryChips className="mt-6" />
        </Suspense>
      </Container>

      <Container className="pb-16">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Featured products</h2>
          <Link href="/products">
            <Button variant="ghost">View all</Button>
          </Link>
        </div>
        <div className="mt-6">
          <ProductGrid
            products={featuredProducts}
            priorityFirst
            priorityCount={1}
          />
        </div>
      </Container>
    </>
  );
}

function CategoryChipsSkeleton() {
  return (
    <div className="mt-6 flex gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-10 w-24 shrink-0 rounded-full"
          label="Loading category"
        />
      ))}
    </div>
  );
}
