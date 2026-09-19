# Cereal Tasting (The Sommelier's Spoon)

Satirical luxury cereal tasting portfolio piece: a noir-nostalgia cellar of 15 vintage cereals,
milk pairings, a soul quiz, printable/downloadable sommelier certificates, and a mock tasting
flight (cart). Live at [cereal-tasting.vercel.app](https://cereal-tasting.vercel.app).

## Stack

React 19, TypeScript, Vite 8, Tailwind CSS v4 (custom layers/tokens), Framer Motion, React
Router 7 (SPA with a prerender script for SEO), pnpm. Optional PostHog analytics.

## Commands

```bash
pnpm install
pnpm dev            # http://localhost:5173
pnpm test           # vitest run
pnpm test:watch
pnpm lint           # eslint .
pnpm biome:check
pnpm biome:fix
pnpm biome:format
pnpm build          # tsc -b && vite build && node scripts/prerender-routes.mjs
pnpm preview
```

Node 22 recommended (matches CI). Both ESLint and Biome are configured; `pnpm lint` runs
ESLint, and the three `biome:` scripts above run Biome separately.

## Routes

- `/` - the Cellar (filter, sort, duel, cereal of the day)
- `/pairings/` - milk x cereal synergy calculator (shareable URL)
- `/quiz/` - soul quiz with `?result=` deep links
- `/certificate/` - fake certification, PNG download / print
- `/about/`, `/contact/`, `/privacy-policy`

## Layout

- `src/components/` - cards, cart, flight menu, toasts, milk pour overlay
- `src/pages/` - `Home`, `PairingGuide`, `Quiz`, `Certificate`, `About`, `Contact`, `NotFound`,
  `PrivacyPolicy`
- `src/data/` - cereal/milk data, Jacques Flakémont copy
- `src/utils/` - soul match, certificate PNG generation, motion helpers
- `src/hooks/` - focus trap, Konami code, crumb trail
- `src/contexts/` - `ToastContext`
- `public/cereals/` - box art assets
- `scripts/prerender-routes.mjs` - static HTML prerender for SEO, run as part of `pnpm build`

## Environment variables

- `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST` (optional; PostHog is skipped entirely if the key is
  unset). See `src/main.tsx`.

## Conventions

- Reduced-motion aware Framer Motion; focus traps on overlays (`src/hooks/useFocusTrap.ts`)
- `pnpm-lock.yaml` carries a large `pnpm.overrides` block in `package.json` pinning transitive
  deps (rollup, vite, react-router, babel, postcss, browserslist, etc.) for security advisories
- CSP and security headers are set in `vercel.json`, not in app code
- `/contact/` uses real GitHub CTAs, no placeholder `.example` inboxes (deliberate per README)

## CI

`.github/workflows/`: `ci.yml`, `codeql.yml`, `ally-a11y.yml` (accessibility), `scorecard.yml`,
`verify-overrides.yml` (checks the `pnpm.overrides` pins), plus dependabot automerge/resync.
