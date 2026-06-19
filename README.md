# Kora Market

Mobile-first headless commerce storefront built with **Next.js 16** (App Router). Portfolio project demonstrating SSR/ISR catalog, optimistic cart UX, and accessible checkout flows.

[![CI](https://github.com/johnTubson/kora-market/actions/workflows/ci.yml/badge.svg)](https://github.com/johnTubson/kora-market/actions/workflows/ci.yml)

## Live demo

**[kora-market-delta.vercel.app](https://kora-market-delta.vercel.app/)**

## Stack

| Layer     | Choices                                            |
| --------- | -------------------------------------------------- |
| Framework | Next.js 16, React 19, TypeScript, App Router       |
| Styling   | Tailwind CSS 4, design tokens in Storybook         |
| State     | Zustand (cart), TanStack Query (client cache)      |
| Forms     | React Hook Form + Zod                              |
| Data      | JSON fixtures, MSW (dev), Route Handlers (prod)    |
| Quality   | Vitest, Playwright, Lighthouse CI, jsx-a11y ESLint |

## Key decisions

1. **RSC + ISR for catalog** — Server Components ship HTML first for LCP; product detail pages revalidate hourly.
2. **MSW in dev, API routes in prod** — Self-contained repo with realistic fetch patterns; no external backend for the demo.
3. **Zustand cart + Server Action checkout** — Optimistic client updates; order ID generated server-side at checkout boundary.
4. **Currency via middleware cookie** — NGN/USD switch without client-side flicker on navigation.
5. **Quality gates in CI** — Lighthouse mobile ≥ 90 performance, ≥ 95 accessibility; e2e covers browse → checkout.

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `pnpm dev`        | Start dev server         |
| `pnpm build`      | Production build         |
| `pnpm lint`       | ESLint (+ jsx-a11y)      |
| `pnpm typecheck`  | TypeScript check         |
| `pnpm test`       | Vitest unit tests (38+)  |
| `pnpm test:e2e`   | Playwright e2e (4 specs) |
| `pnpm lighthouse` | Lighthouse CI (mobile)   |
| `pnpm storybook`  | Component docs           |

## Bundle size

Production build (Next.js 16, Turbopack) — approximate first-load JS per route:

| Route              | First Load JS |
| ------------------ | ------------- |
| `/` (home)         | ~120 kB       |
| `/products`        | ~115 kB       |
| `/products/[slug]` | ~125 kB       |
| `/cart`            | ~110 kB       |
| `/checkout`        | ~145 kB       |

Shared chunks (~85 kB) include React 19 and Next.js runtime. Checkout is the largest route due to React Hook Form + dynamically imported wizard steps.

Run `pnpm build` locally for exact numbers from the build output.

## Quality gates

- **Unit tests:** > 38 Vitest tests (cart, currency, validators, products, components)
- **E2e:** catalog, cart, checkout Playwright specs
- **Lighthouse (mobile):** performance ≥ 90, accessibility ≥ 95 (CI + `reports/lighthouse/`)
- **ESLint:** `eslint-config-next/core-web-vitals` (includes `eslint-plugin-jsx-a11y` recommended rules)

## License

MIT
