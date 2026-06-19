import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <a
        href="#main"
        className="focus-ring sr-only fixed left-4 top-4 z-50 rounded-md bg-background px-4 py-2 text-sm font-medium shadow-md focus:not-sr-only"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
