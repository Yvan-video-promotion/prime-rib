import { Link, createFileRoute } from '@tanstack/react-router'

import EtsyButton from '../components/EtsyButton'
import { site } from '../lib/site'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main>
      <Hero />
      <SpecStrip />
      <Method />
      <CalculatorBand />
      <Included />
      <Access />
      <Notices />
      <ClosingCta />
    </main>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden ember-glow">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-24">
        <div className="lg:col-span-7 lg:pr-6">
          <p className="eyebrow rise" style={{ animationDelay: '80ms' }}>
            Digital recipe book · Printable guide
          </p>

          <h1
            className="rise mt-6 font-display text-[3.1rem] leading-[0.94] text-bone sm:text-[4.4rem] lg:text-[5.2rem]"
            style={{ animationDelay: '160ms' }}
          >
            Saturday night
            <br />
            <span className="text-ember-soft">prime rib</span>,
            <br />
            in your kitchen.
          </h1>

          <div
            className="sweep mt-8 h-px w-40 bg-ember/70"
            style={{ animationDelay: '420ms' }}
          />

          <p
            className="rise mt-8 max-w-xl text-lg leading-relaxed text-smoke"
            style={{ animationDelay: '300ms' }}
          >
            A 24-hour dry brine. A long, patient roast at 225°F. A blistering
            finish that builds the crust. And a bone-broth au jus poured at the
            table. The whole steakhouse method, rebuilt for a home oven and a
            single roast.
          </p>

          <div
            className="rise mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: '400ms' }}
          >
            <EtsyButton />
            <Link
              to="/calculator"
              className="inline-flex items-center gap-3 rounded-full border border-line px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-bone transition-colors hover:border-ember hover:text-ember-soft"
            >
              Try the roast calculator
            </Link>
          </div>

          <p
            className="rise mt-6 text-xs text-smoke/80"
            style={{ animationDelay: '480ms' }}
          >
            Downloadable PDF · Interactive web app · No physical item is mailed
          </p>
        </div>

        <figure
          className="rise relative lg:col-span-5"
          style={{ animationDelay: '260ms' }}
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-line/80 shadow-[0_50px_90px_-40px_rgba(0,0,0,0.95)]">
            <img
              src="/images/roast-hero.jpg"
              alt="A herb-crusted standing rib roast on a dark platter, ringed with roasted carrots, potatoes and onion"
              width={1000}
              height={664}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-char via-char/25 to-transparent" />
          </div>

          <figcaption className="absolute -bottom-5 -left-4 max-w-[15rem] rounded-2xl border border-line bg-surface/95 px-5 py-4 backdrop-blur sm:-left-8">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ember-soft">
              Pull at 122°F
            </p>
            <p className="mt-2 text-sm leading-snug text-smoke">
              Medium rare, edge to edge — no grey band under the crust.
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

const SPECS = [
  { value: '24 hr', label: 'Dry brine' },
  { value: '225°F', label: 'Low roast' },
  { value: '500°F', label: 'Crust finish' },
  { value: '30 min', label: 'The rest' },
]

function SpecStrip() {
  return (
    <section className="border-y border-line/70 bg-surface/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-5 sm:px-8 md:grid-cols-4">
        {SPECS.map((spec) => (
          <div
            key={spec.label}
            className="border-l border-line/40 py-8 pl-5 first:border-l-0 md:pl-7"
          >
            <p className="font-mono text-2xl text-bone tnum">{spec.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-smoke">
              {spec.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

const STEPS = [
  {
    n: '01',
    title: 'Dry brine, a full day ahead',
    body: 'Coarse salt on every surface, then uncovered on a rack in the fridge for 24 hours. The salt draws moisture out, then carries seasoning back in. The surface dries, which is exactly what a crust needs.',
  },
  {
    n: '02',
    title: 'Low and slow at 225°F',
    body: 'A gentle oven cooks the roast almost uniformly from edge to centre, so you get one colour through the slice instead of a grey ring around a pink core. This is the part that takes patience, and it is the part that matters most.',
  },
  {
    n: '03',
    title: 'Rest while the oven climbs',
    body: 'Out at the pull temperature, tented loosely, while the oven races to 500°F. The interior evens out and carryover does its quiet work. Nothing is lost during this half hour.',
  },
  {
    n: '04',
    title: 'The blistering finish',
    body: 'Eight minutes at full heat, uncovered. The dried, salted surface seizes into a dark, crackling armour. This is the difference between a roast and a roast worth remembering.',
  },
  {
    n: '05',
    title: 'Bone-broth au jus',
    body: 'The bones and the fond in the pan become a savoury jus with real body — not a thickened gravy, and not a bouillon cube. It is poured hot over the carved slices.',
  },
  {
    n: '06',
    title: 'Carve it like the dining room',
    body: 'Free the bones in a single cut along the rack, then slice across the grain to the thickness you want. Warm plates, jus on the side, horseradish within reach.',
  },
]

function Method() {
  return (
    <section id="method" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">The method</p>
              <h2 className="mt-5 font-display text-4xl leading-[1.05] text-bone sm:text-5xl">
                Six moves,
                <br />
                in order,
                <br />
                every time.
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-smoke">
                Nothing here depends on a professional oven or a chef's
                intuition. It depends on doing a small number of things in the
                right order, with a thermometer in your hand.
              </p>

              <figure className="mt-10 overflow-hidden rounded-2xl border border-line/80">
                <img
                  src="/images/roast-crust.jpg"
                  alt="A whole roasted rib of beef resting on a board, its surface deeply browned and crusted"
                  width={1280}
                  height={747}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </figure>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {STEPS.map((step, i) => (
              <li
                key={step.n}
                className="border-t border-line/60 py-8 first:border-t-0 first:pt-0"
                style={{ marginLeft: `${(i % 3) * 0.9}rem` }}
              >
                <div className="flex gap-6">
                  <span className="mt-1 font-mono text-sm text-ember tnum">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-bone">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-lg leading-relaxed text-smoke">
                      {step.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function CalculatorBand() {
  return (
    <section className="relative overflow-hidden border-y border-line/70 bg-surface/50 ember-glow">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-6">
          <p className="eyebrow">Included with your purchase</p>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] text-bone sm:text-5xl">
            The interactive
            <br />
            Roast Calculator
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-smoke">
            Enter the weight of your roast and how you like it cooked. You get
            back a full oven schedule counted backwards from the moment you want
            to sit down — pull temperature, estimated duration, and the exact
            time the roast goes in.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-smoke">
            {[
              'Your personalised oven schedule, hour by hour',
              'The recommended pull temperature for your doneness',
              'Approximate cooking duration for your weight',
              'The exact clock time to put the roast in the oven',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              to="/calculator"
              className="inline-flex items-center gap-3 rounded-full bg-ember px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-char transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember-soft"
            >
              Open the calculator
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-6">
          <div className="rounded-[1.75rem] border border-line bg-char-deep/80 p-7 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-smoke">
              Sample plan · 7.5 lb bone-in · medium rare
            </p>
            <div className="mt-6 grid grid-cols-2 gap-5">
              <Readout label="Pull at" value="122°F" />
              <Readout label="Time in oven" value="3 hr 55 min" />
              <Readout label="Oven in" value="1:17 pm" />
              <Readout label="On the table" value="6:00 pm" />
            </div>
            <div className="mt-7 h-px hairline" />
            <p className="mt-5 text-xs leading-relaxed text-smoke">
              Ovens and cuts vary. Times are estimates — internal temperature is
              the dependable measure for any beef roast, so keep a calibrated
              instant-read thermometer nearby.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-smoke">
        {label}
      </p>
      <p className="mt-1.5 font-mono text-2xl text-ember-soft tnum">{value}</p>
    </div>
  )
}

const INCLUDED = [
  {
    title: 'A downloadable PDF recipe book',
    body: 'The complete method, start to slice, written to be read in a kitchen. Print it or keep it on a screen.',
  },
  {
    title: 'Access to the interactive web app',
    body: 'This site, unlocked with the email address you used at checkout — no account, no password to remember.',
  },
  {
    title: 'The interactive Roast Calculator',
    body: 'Weight and doneness in, a personalised cooking plan out, recalculated as often as you like.',
  },
  {
    title: 'Carving, serving and timing guidance',
    body: 'How to hold the roast, how thick to slice, and how to land everything on the table at once.',
  },
  {
    title: 'Something to come back to',
    body: 'Revisit it every holiday, every birthday, every excuse for a large piece of beef.',
  },
]

function Included() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Your purchase includes</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] text-bone sm:text-5xl">
              What lands in
              <br />
              your hands
            </h2>
            <figure className="mt-10 overflow-hidden rounded-2xl border border-line/80">
              <img
                src="/images/roast-plated.jpg"
                alt="A thick cut of rare prime rib plated in a steakhouse, with a gravy boat of au jus and horseradish alongside"
                width={1280}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <figcaption className="border-t border-line/60 bg-surface/60 px-5 py-3 text-xs text-smoke">
                One cut, one jus, one very quiet table.
              </figcaption>
            </figure>
          </div>

          <dl className="lg:col-span-7 lg:pt-14">
            {INCLUDED.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 border-t border-line/60 py-7 first:border-t-0 first:pt-0"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 shrink-0 text-brass"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
                <div>
                  <dt className="font-display text-xl text-bone">
                    {item.title}
                  </dt>
                  <dd className="mt-2 max-w-lg leading-relaxed text-smoke">
                    {item.body}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Access() {
  return (
    <section className="border-y border-line/70 bg-surface/40 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">Accessing the web app</p>
          <h2 className="mt-5 font-display text-3xl leading-tight text-bone">
            One email, once.
          </h2>
        </div>
        <div className="grid gap-8 text-sm leading-relaxed text-smoke sm:grid-cols-2 lg:col-span-8">
          <p>
            First-time visitors enter the same email address used to complete
            the Etsy purchase. That is what verifies the purchase and opens the
            premium interactive features. Your email is used only as described
            in the shop's applicable privacy policy.
          </p>
          <p>
            The downloadable PDF needs no verification at all — it comes
            straight from your Etsy account. Email verification applies only to
            first-time access to the interactive web app on this site.
          </p>
        </div>
      </div>
    </section>
  )
}

const NOTICES = [
  {
    title: 'This is a digital product',
    body: 'No physical cookbook, printed recipe book, or other item is mailed. Once payment clears, the PDF is available to download through your Etsy account.',
  },
  {
    title: 'Download on a browser',
    body: 'Etsy digital purchases sometimes need to be downloaded through a web browser rather than the Etsy mobile app.',
  },
  {
    title: 'A note on cooking times',
    body: 'Roast size, shape, starting temperature, bone structure and oven performance all move the clock. Every time given here is an estimate.',
  },
  {
    title: 'Trust the thermometer',
    body: 'Use a properly calibrated instant-read meat thermometer and follow current food-safety guidance when preparing and serving beef.',
  },
]

function Notices() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow">Good to know</p>
        <div className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {NOTICES.map((notice) => (
            <div key={notice.title} className="border-t border-line/60 pt-6">
              <h3 className="font-display text-lg text-bone">
                {notice.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-smoke">
                {notice.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/roast-crust.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-char/88" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <p className="eyebrow">Prepare it slowly. Finish it boldly.</p>
        <h2 className="mt-6 font-display text-4xl leading-[1.05] text-bone sm:text-6xl">
          Carve it proudly.
        </h2>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-smoke">
          The complete guide, the printable PDF, and the Roast Calculator — for
          your own kitchen, or as a gift for the prime rib lover who already has
          the good knife.
        </p>
        <div className="mt-10 flex justify-center">
          <EtsyButton>Get {site.name} on Etsy</EtsyButton>
        </div>
      </div>
    </section>
  )
}
