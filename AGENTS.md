# AGENTS.md

Context for AI agents working on this codebase.

## What this is

A one-product marketing site for a digital prime rib recipe book sold on Etsy,
with a gated interactive Roast Calculator as the "premium" feature the listing
promises. There is no checkout here — every conversion path leads off-site to
the recipe book page (`site.bookUrl`).

Built with TanStack Start (React 19 + TanStack Router), Vite 7, Tailwind CSS 4,
and Netlify Database via Drizzle ORM. Deployed on Netlify.

## Directory structure

```
db/
  schema.ts                  # Drizzle schema — the `members` table
  index.ts                   # Drizzle client bound to the Netlify DB adapter
netlify/database/migrations/ # Generated SQL; Netlify applies these on deploy
public/images/               # Roast photography supplied by the shop owner
src/
  components/
    AccessGate.tsx           # Email unlock wrapper for the calculator
    EtsyButton.tsx           # The single conversion component
    RoastCalculator.tsx      # Inputs + readout + timeline
  lib/
    roast.ts                 # All cooking maths; pure, no React, no I/O
    site.ts                  # Shop name, tagline, recipe book URL
  routes/
    __root.tsx               # HTML shell, fonts, header, footer, 404
    index.tsx                # Landing page (sections are local components)
    calculator.tsx           # /calculator — AccessGate wrapping RoastCalculator
  server/
    access.functions.ts      # `unlockAccess` server function
  styles.css                 # Theme tokens, custom classes, keyframes
drizzle.config.ts            # out: netlify/database/migrations (required)
```

## Non-obvious decisions

**`src/lib/roast.ts` is the source of truth for the method.** Oven temperatures,
minutes-per-pound, pull temperatures, rest lengths and the bone-in multiplier
all live there as named constants. The whole schedule is derived *backwards*
from `serveAt`, so changing a stage length automatically shifts everything
earlier in the timeline. Do not scatter cooking numbers into components.

**The gate is an access record, not authentication.** Real Etsy order
verification is not possible from here, so `unlockAccess` validates the shape of
the address, upserts a `members` row, and grants access. The unlock is then
remembered in `localStorage` under `ember-bone-access`. If the database is
unreachable the server function still returns `ok: true` with `recorded: false`
— a paying customer is never blocked by an infrastructure problem. Keep that
behaviour if you touch it.

**`RoastCalculator` is deliberately client-only.** It reads `new Date()` in a
`useState` initializer, which would produce a hydration mismatch if it were
server-rendered. It is safe today because `AccessGate` renders a skeleton on the
server and only mounts its children after the `useEffect` that reads
`localStorage`. If you ever render the calculator outside the gate, move the
date initialisation into an effect.

**Shop-specific strings live only in `src/lib/site.ts`.** The recipe book URL
appears in the header, several page sections and the footer, but always via
`site.bookUrl` or the `EtsyButton` component. Never hard-code it.

**Photography is supplied by the shop owner**, one image per topic (dinner,
dry brine, oven, recipe guide, carving). If CC-licensed images are ever added
back, a credit in the footer of `src/routes/__root.tsx` becomes a licence
obligation.

## Conventions

- Components are PascalCase; page sections are local function components inside
  the route file rather than separate files, since they are not reused.
- Styling is Tailwind utilities against theme tokens defined in `@theme` in
  `src/styles.css` (`char`, `surface`, `line`, `ember`, `rare`, `brass`, `bone`,
  `smoke`). Do not introduce raw hex values in components — add a token instead.
- Repeated multi-property styles (`eyebrow`, `grain`, `ember-glow`, `hairline`,
  `rise`, `sweep`, `tnum`) are plain classes in `styles.css`. They are unlayered,
  so they intentionally win over Tailwind utilities.
- `tsconfig.json` has `noUnusedLocals` and `noUnusedParameters` on; an unused
  import fails the build.
- Server functions use `.inputValidator(...)`. There is no `.validator(...)` in
  TanStack Start.
- Imports into `db/` use the `.js` extension (`../../db/index.js`), matching the
  Netlify Database convention.

## Database changes

Edit `db/schema.ts`, then:

```bash
npx drizzle-kit generate --name <imperative_snake_case_name>
```

Never run `drizzle-kit migrate` or `push`, and never execute DDL directly.
Netlify applies migrations during the deploy.

## Commands

```bash
pnpm install
netlify dev --port 8889   # preferred: emulates Netlify Database
pnpm build                # production build
```
