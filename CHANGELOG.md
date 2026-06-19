# Changelog

All notable changes to Kora Market are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.0] - 2026-06-19

### Added

- Mobile-first storefront: home, product catalog, product detail (ISR), cart, and 3-step checkout
- Design system primitives with Storybook (`Button`, `Input`, `Card`, `Badge`, `Skeleton`, `Toast`, layout components)
- Zustand cart with optimistic add-to-cart, session persistence, and header badge
- Multi-step checkout with React Hook Form, Zod validation, and `createOrder` Server Action
- NGN/USD currency switcher via middleware cookie
- MSW mock API for development; Route Handlers serve JSON fixtures in production
- TanStack Query provider for client-side data patterns
- Vitest unit/component tests (38+), Playwright e2e (catalog, cart, checkout)
- Lighthouse CI in GitHub Actions (mobile performance ≥ 90, accessibility ≥ 95)
- ESLint jsx-a11y rules, reduced-motion support, accessible form error messaging

### Quality

- Lighthouse (mobile): home performance 93 / a11y 100; `/products` performance 90 / a11y 98
- First-load JS: ~110–145 kB per route (see README bundle table)
- Full checkout completable in ≤ 5 taps from cart on 375px viewport

[1.0.0]: https://github.com/johnTubson/kora-market/releases/tag/v1.0.0
