import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";

const footerLinks = [
  { href: "/products", label: "Shop" },
  { href: "#", label: "About" },
  { href: "#", label: "Contact" },
];

export type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn("mt-auto border-t border-border bg-muted/30", className)}
    >
      <Container className="py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-bold text-primary">Kora Market</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Mobile-first commerce demo for emerging markets. Fast, accessible,
              and built for low-bandwidth connections.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-2 sm:flex-row sm:gap-6">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="focus-ring inline-flex min-h-touch items-center text-sm text-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-8 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kora Market. Portfolio demo project.
        </p>
      </Container>
    </footer>
  );
}
