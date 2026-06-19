import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductDetailLoading() {
  return (
    <Container className="py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton
          className="aspect-square w-full rounded-lg"
          label="Loading product image"
        />
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" label="Loading category" />
          <Skeleton className="h-9 w-3/4" label="Loading title" />
          <Skeleton className="h-8 w-32" label="Loading price" />
          <Skeleton className="h-24 w-full" label="Loading description" />
          <Skeleton className="h-11 w-40" label="Loading button" />
        </div>
      </div>
    </Container>
  );
}
