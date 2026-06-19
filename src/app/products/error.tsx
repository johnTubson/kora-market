"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type ProductsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProductsError({ error, reset }: ProductsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        We couldn&apos;t load the product catalog. Please try again.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link href="/">
          <Button variant="ghost">Back to home</Button>
        </Link>
      </div>
    </Container>
  );
}
