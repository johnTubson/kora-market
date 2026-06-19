import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <Container className="relative grid min-h-[420px] items-center gap-8 py-12 md:grid-cols-2 md:py-16">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider opacity-90">
            Mobile-first commerce
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Shop local. Ship fast. Pay your way.
          </h1>
          <p className="mt-4 max-w-lg text-base opacity-90 sm:text-lg">
            Discover handcrafted goods, everyday essentials, and emerging-market
            favorites — optimized for slow connections and small screens.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products">
              <Button variant="secondary" size="lg">
                Browse catalog
              </Button>
            </Link>
            <Link href="/products?category=fashion">
              <Button
                variant="ghost"
                size="lg"
                className="text-primary-foreground hover:bg-primary-hover/20"
              >
                Shop fashion
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-md md:max-w-none">
          <Image
            src="https://picsum.photos/seed/kora-market-hero/900/700"
            alt="Vibrant market stall with colorful goods"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
      </Container>
    </section>
  );
}
