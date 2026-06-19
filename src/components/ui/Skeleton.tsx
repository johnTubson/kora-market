import { cn } from "@/lib/cn";

export type SkeletonProps = {
  className?: string;
  /** Accessible label for screen readers */
  label?: string;
};

export function Skeleton({ className, label = "Loading" }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label={label}
      aria-busy="true"
      className={cn("animate-pulse rounded-md bg-muted", className)}
    />
  );
}

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          label="Loading text"
          className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-border p-4",
        className
      )}
    >
      <Skeleton
        className="aspect-square w-full rounded-md"
        label="Loading image"
      />
      <Skeleton className="h-4 w-2/3" label="Loading title" />
      <Skeleton className="h-4 w-1/3" label="Loading price" />
    </div>
  );
}
