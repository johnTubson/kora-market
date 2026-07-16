# Changelog

All notable changes to Kora Market are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.2.0] - 2026-07-16

### Added

- Variant `stockQty` inventory with in-memory reservation at place-order
- Persisted order records (`GET /api/orders/:orderId`) rendered on success page
- Structured `OUT_OF_STOCK` conflicts with `role="alert"` and Update cart CTA
- Cart quantity capped to available stock
- Unit tests for inventory/orders; Playwright OOS checkout path (`?forceStockFail=1`)

### Changed

- `createOrder` Server Action re-checks stock before redirect
- Architecture docs: removed stale TanStack Query claims; ADR-005 inventory reservation
- ROADMAP Phase 0 checkboxes marked complete

## [1.1.0] - 2026-06-19

### Added

- Debounced live catalog search with URL-synced filters (`router.replace`, 300ms debounce)
- `ActiveFilters` bar with dismissible search/category pills and Clear all
- Explicit Search submit button and in-input Clear control on catalog search
- Currency proxy wired via `src/proxy.ts` (Next.js 16 proxy; seeds cookie on first visit)
- SEO: `metadataBase`, Open Graph/Twitter defaults, per-route metadata, `sitemap.ts`, `robots.ts`, Product JSON-LD on PDP
- Branded `error.tsx` boundaries for `/cart` and `/checkout`
- `ConfirmDialog` for clear-cart confirmation
- Skip-to-content link and `id="main"` landmark
- Mobile-visible cart badge at all breakpoints
- Cart page hydration gate to prevent empty-cart flash on reload
- Nav `aria-current="page"` on desktop and mobile
- Unit tests for catalog URL utils and `ActiveFilters`
- Playwright mobile viewport test for category filtering
- Lighthouse CI extended to PDP and `/cart`

### Changed

- Header shows cart badge at all breakpoints (not desktop-only)
- Product card links include visible keyboard focus ring
- Footer links point to GitHub and mailto instead of `#` placeholders
- Products listing skeleton uses accessible `Skeleton` labels
- README rewritten as engineering case study with architecture diagram and trade-offs
- Removed unused `api.ts`, `QueryProvider`, and `@tanstack/react-query` dependency
- Checkout form tracks address/payment only; cart items read from store at review and submit
- Reduced `useEffect` usage across the codebase (14 → 6); replaced dialog/mobile-nav focus effects with `autoFocus`, ref callbacks, and event handlers

### Fixed

- Catalog search losing focus mid-typing when debounced URL updated (removed remount `key` pattern)
- Catalog search `FormEvent` type (was incorrectly typed as `ChangeEvent`)
- `.gitignore` no longer blocks `.env.example` from being tracked
- Playwright catalog tests: search button strict-mode collision with Clear button

## [1.0.0] - 2026-06-19

### Added

- Mobile-first storefront: home, product catalog, product detail (ISR), cart, and 3-step checkout
- Design system primitives with Storybook (`Button`, `Input`, `Card`, `Badge`, `Skeleton`, `Toast`, layout components)
- Zustand cart with optimistic add-to-cart, session persistence, and header badge
- Multi-step checkout with React Hook Form, Zod validation, and `createOrder` Server Action
- NGN/USD currency switcher via middleware cookie
- MSW mock API for development; Route Handlers serve JSON fixtures in production
- Vitest unit/component tests (38+), Playwright e2e (catalog, cart, checkout)
- Lighthouse CI in GitHub Actions (mobile performance ≥ 90, accessibility ≥ 95)
- ESLint jsx-a11y rules, reduced-motion support, accessible form error messaging

### Quality

- Lighthouse (mobile): home performance 93 / a11y 100; `/products` performance 90 / a11y 98
- First-load JS: ~110–145 kB per route (see README bundle table)
- Full checkout completable in ≤ 5 taps from cart on 375px viewport

[Unreleased]: https://github.com/johnTubson/kora-market/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/johnTubson/kora-market/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/johnTubson/kora-market/releases/tag/v1.0.0
