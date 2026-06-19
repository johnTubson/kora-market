import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";

export default function ProductNotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Container className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-2 max-w-md text-muted-foreground">
            This item may have been removed or the link is incorrect.
          </p>
          <Link href="/products" className="mt-6">
            <Button>Back to catalog</Button>
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
