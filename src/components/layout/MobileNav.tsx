"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

export type NavLink = {
  href: string;
  label: string;
};

export type MobileNavProps = {
  links: NavLink[];
  className?: string;
};

export function MobileNav({ links, className }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    }
  }, [open]);

  return (
    <div className={cn("relative md:hidden", className)}>
      <button
        ref={buttonRef}
        type="button"
        className="focus-ring inline-flex min-h-touch min-w-touch items-center justify-center rounded-md border border-border px-3 text-sm font-medium"
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-foreground/20"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-nav-menu"
            ref={menuRef}
            aria-label="Mobile navigation"
            className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-border bg-background p-2 shadow-md"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring flex min-h-touch items-center rounded-md px-3 text-sm font-medium hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : null}
    </div>
  );
}
