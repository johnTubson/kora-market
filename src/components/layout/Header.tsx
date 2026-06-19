import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { CurrencySwitcher } from "@/components/layout/CurrencySwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  // { href: "/cart", label: "Cart" },
];

export type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        className
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="focus-ring rounded-md text-lg font-bold text-primary"
        >
          Kora Market
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring min-h-touch inline-flex items-center rounded-md px-3 text-sm font-medium text-foreground hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CurrencySwitcher />
          <Link
            href="/cart"
            className="focus-ring relative hidden min-h-touch min-w-touch items-center justify-center rounded-md px-3 text-sm font-medium hover:bg-muted md:inline-flex"
            aria-label="Shopping cart"
          >
            Cart
            <span className="sr-only">0 items</span>
          </Link>
          <MobileNav links={navLinks} />
        </div>
      </Container>
    </header>
  );
}
