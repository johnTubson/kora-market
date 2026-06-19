"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type ProductDetailErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProductDetailError({
  error,
  reset,
}: ProductDetailErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="text-2xl font-bold">Couldn&apos;t load product</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        This product page failed to load. Please try again or browse the
        catalog.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link href="/products">
          <Button variant="ghost">Browse products</Button>
        </Link>
      </div>
    </Container>
  );
}
