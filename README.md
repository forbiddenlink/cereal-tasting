# The Sommelier's Spoon

> *"Nostalgia. Distilled."*  
> Satirical luxury cereal tasting — breakfast treated like fine wine.

**Live demo:** [cereal-tasting.vercel.app](https://cereal-tasting.vercel.app)  
**Repo:** [github.com/forbiddenlink/cereal-tasting](https://github.com/forbiddenlink/cereal-tasting)

---

## What it is

A React portfolio piece with a noir-nostalgia cellar of **15 vintage cereals**, milk pairings, a soul quiz, printable/downloadable sommelier certificates, and a mock tasting flight (cart) complete with Jacques Flakémont commentary.

### Routes

| Route | Experience |
|---|---|
| `/` | The Cellar — filter, sort, duel, cereal of the day |
| `/pairings/` | Milk × cereal synergy calculator (shareable URL) |
| `/quiz/` | Soul quiz with `?result=` deep links |
| `/certificate/` | Fake certification + **PNG download** / print |
| `/about/` | House lore + lab equipment |
| `/contact/` | Real GitHub CTAs (no fake `.example` inboxes) |

### Highlights

- Tasting flight cart with sog clock, named flights, printable menu, milk-pour on add
- Command palette (`⌘K`), Konami egg, 404 pantry mini-game
- Prerendered static HTML for SEO, unified `cereal-tasting.vercel.app` canonicals
- Reduced-motion aware Framer Motion; focus traps on overlays

---

## Stack

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4** + custom CSS layers / tokens
- **Framer Motion** for interaction
- **React Router 7** SPA with route prerender script
- Optional **PostHog** (`VITE_POSTHOG_KEY`)

---

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm test         # vitest
pnpm lint         # eslint
pnpm build        # tsc + vite + prerender
pnpm preview
```

Node **22** recommended (see CI). Copy `.env.example` if you want analytics.

---

## Project layout

```
src/
  components/   # cards, cart, flight menu, toasts, milk pour…
  pages/        # Home, Pairings, Quiz, Certificate, About, Contact…
  data/         # cereals, milks, Jacques copy
  utils/        # soul match, certificate PNG, motion helpers
  hooks/        # focus trap, Konami, crumb trail
public/cereals/ # 15 box art assets
scripts/prerender-routes.mjs
```

---

## Design tokens (abbrev.)

| Token | Role |
|---|---|
| void / merlot | noir cellar grounds |
| gold / gold-dim | foil luxury |
| cream | body text |
| slime / berry / zap | satirical neon accents |

Typography: **Playfair Display** (display) · **JetBrains Mono** (specs)

---

## License

MIT — satirical portfolio project. No real cereal was auctioned.
