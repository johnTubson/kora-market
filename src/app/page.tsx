import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Container className="py-12">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">
              Phase 1 — Design System
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome to Kora Market
            </h1>
            <p className="mt-4 text-muted-foreground">
              Mobile-first commerce demo. UI primitives and layout components
              are ready — run{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                pnpm storybook
              </code>{" "}
              to explore the design system.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-lg gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Design tokens</CardTitle>
                <CardDescription>
                  Emerald primary, amber secondary, 44px touch targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" disabled>
                  Catalog coming in Phase 2
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
