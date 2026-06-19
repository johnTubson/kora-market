import { SkeletonCard } from "@/components/ui/Skeleton";
import { Container } from "@/components/layout/Container";

export default function ProductsLoading() {
  return (
    <Container className="py-10">
      <div className="mb-8 space-y-2">
        <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
        <div className="h-5 w-72 animate-pulse rounded-md bg-muted" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </Container>
  );
}
