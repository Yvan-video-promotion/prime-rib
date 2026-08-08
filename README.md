# Ember &amp; Bone — The Prime Rib Method

A promotional site for a digital prime rib recipe book sold on Etsy, plus the
premium interactive **Roast Calculator** that comes with the purchase.

The landing page walks through the method — a 24-hour dry brine, a low-and-slow
roast at 225°F, a rest, a blistering 500°F finish and a bone-broth au jus — and
every call to action opens the Etsy listing. The calculator turns a roast weight
and a preferred doneness into a full oven schedule counted backwards from the
moment dinner is meant to be on the table.

## Features

- **Landing page** with hero photography, the six-step method, an itemised list
  of what the purchase includes, and the shop's digital-product and food-safety
  notices.
- **Buy buttons** throughout the page and in the header, all pointing at the
  Etsy listing.
- **Roast Calculator** (`/calculator`): weight, bone-in or boneless, doneness
  and serving time in; pull temperature, estimated oven time, oven-in time and a
  full brine-to-carve timeline out. The plan can be copied to the clipboard.
- **Email unlock** for first-time visitors, matching the shop's access policy.
  The address is recorded in Netlify Database and the unlock is remembered on
  the device.

## Tech stack

| Layer      | Technology                                  |
| ---------- | ------------------------------------------- |
| Framework  | TanStack Start (React 19, TanStack Router)   |
| Build      | Vite 7                                      |
| Styling    | Tailwind CSS 4                              |
| Data       | Netlify Database (Postgres) with Drizzle ORM |
| Hosting    | Netlify                                     |

## Running locally

```bash
pnpm install
netlify dev --port 8889
```

`netlify dev` is preferred over `pnpm dev` because the Roast Calculator's unlock
step writes to Netlify Database, which needs the Netlify environment to be
emulated. The site itself renders fine under `pnpm dev` — the unlock step simply
grants access without recording anything if the database cannot be reached.

## Configuration

Shop-specific values live in a single file, `src/lib/site.ts`:

- `name` and `tagline` — used in the header, footer and page titles
- `etsyUrl` — the listing every buy button opens

Changing the Etsy link or renaming the site is a one-line edit there.

## Database

The schema lives in `db/schema.ts` and migrations are generated into
`netlify/database/migrations/`, where Netlify applies them automatically during
a deploy. After changing the schema:

```bash
npx drizzle-kit generate --name <describe_the_change>
```

Never apply migrations by hand.

## Photography

Roast photographs come from Wikimedia Commons: Sharon Chen (CC BY 2.0), P1898
(CC BY 4.0) and GRALISTAIR (CC BY-SA 4.0). Credits are shown in the site footer,
as the licences require. Replace them with the shop's own photography and update
the footer credits accordingly.
