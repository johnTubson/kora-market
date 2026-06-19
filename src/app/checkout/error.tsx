"use client";

import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type CheckoutErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function CheckoutError({ reset }: CheckoutErrorProps) {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        We couldn&apos;t load checkout. Please try again.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link href="/cart">
          <Button variant="ghost">Back to cart</Button>
        </Link>
      </div>
    </Container>
  );
}
