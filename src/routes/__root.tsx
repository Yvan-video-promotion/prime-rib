import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'

import { site } from '../lib/site'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${site.name} — ${site.tagline}` },
      { name: 'description', content: site.description },
      { name: 'theme-color', content: '#13100e' },
      { property: 'og:title', content: `${site.name} — ${site.tagline}` },
      { property: 'og:description', content: site.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/images/roast-hero.jpg' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=Karla:wght@300..700&family=IBM+Plex+Mono:wght@400;500&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="grain">
        <SiteHeader />
        {children}
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-char/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link to="/" className="group flex items-baseline gap-3">
          <span className="font-display text-xl leading-none text-bone">
            {site.name}
          </span>
          <span className="hidden text-[0.7rem] uppercase tracking-[0.28em] text-smoke sm:inline">
            {site.tagline}
          </span>
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <Link
            to="/"
            hash="method"
            className="hidden text-smoke transition-colors hover:text-bone sm:inline"
          >
            The method
          </Link>
          <Link
            to="/calculator"
            className="text-smoke transition-colors hover:text-bone"
            activeProps={{ className: 'text-bone' }}
          >
            Roast calculator
          </Link>
          <a
            href={site.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ember px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-char transition-transform hover:-translate-y-0.5 hover:bg-ember-soft active:translate-y-0"
          >
            Get the recipe PDF
          </a>
        </nav>
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-line/70 bg-char-deep">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-display text-2xl text-bone">
              Prepare it slowly. Finish it boldly. Carve it proudly.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-smoke">
              Thank you for supporting this digital recipe collection. I hope
              the guide brings a little steakhouse confidence to your table.
            </p>
            <a
              href={site.etsyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ember/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-ember-soft transition-colors hover:bg-ember hover:text-char"
            >
              View the listing on Etsy
            </a>
          </div>

          <div className="text-xs leading-relaxed text-smoke">
            <p className="eyebrow mb-3">Photography</p>
            <p>
              Roast photographs by Sharon Chen (
              <a
                className="underline decoration-line underline-offset-2 hover:text-bone"
                href="https://creativecommons.org/licenses/by/2.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY 2.0
              </a>
              ), P1898 (
              <a
                className="underline decoration-line underline-offset-2 hover:text-bone"
                href="https://creativecommons.org/licenses/by/4.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY 4.0
              </a>
              ) and GRALISTAIR (
              <a
                className="underline decoration-line underline-offset-2 hover:text-bone"
                href="https://creativecommons.org/licenses/by-sa/4.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY-SA 4.0
              </a>
              ), via Wikimedia Commons.
            </p>
            <p className="mt-4">
              Cooking times are estimates. Always confirm doneness with a
              calibrated instant-read thermometer and follow current food-safety
              guidance for beef.
            </p>
          </div>
        </div>

        <div className="mt-12 h-px hairline" />
        <p className="mt-6 text-xs text-smoke/70">
          {site.name} · Digital product — nothing is shipped.
        </p>
      </div>
    </footer>
  )
}

function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-5 sm:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl text-bone">
        That page went cold.
      </h1>
      <p className="mt-4 text-smoke">
        The roast is still on. Head back to the front of house.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-ember px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-char transition-colors hover:bg-ember-soft"
      >
        Back home
      </Link>
    </main>
  )
}
