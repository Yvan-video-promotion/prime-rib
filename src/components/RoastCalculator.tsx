import { useMemo, useState } from 'react'

import {
  DONENESS,
  FINISH_OVEN_TEMP,
  LOW_OVEN_TEMP,
  MAX_WEIGHT,
  MIN_WEIGHT,
  buildPlan,
  formatDayHint,
  formatDuration,
  formatTime,
  toLocalDate,
  type DonenessId,
  type RoastPlan,
} from '../lib/roast'

/** Local-time YYYY-MM-DD, which is what `<input type="date">` expects. */
function toDateValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** Only worth showing when a stage falls on a different day to the meal. */
function offDayHint(at: Date, serveAt: Date): string | undefined {
  const hint = formatDayHint(at, serveAt)
  return hint === 'same day' ? undefined : hint
}

export default function RoastCalculator() {
  // Runs on the client only — the gate above never renders this during SSR.
  const [dateValue, setDateValue] = useState(() => toDateValue(new Date()))
  const [timeValue, setTimeValue] = useState('18:30')
  const [weight, setWeight] = useState(7.5)
  const [doneness, setDoneness] = useState<DonenessId>('medium-rare')
  const [boneIn, setBoneIn] = useState(true)
  const [copied, setCopied] = useState(false)

  const serveAt = useMemo(
    () => toLocalDate(dateValue, timeValue),
    [dateValue, timeValue],
  )

  const plan = useMemo(
    () =>
      serveAt
        ? buildPlan({ weightLb: weight, doneness, boneIn, serveAt })
        : null,
    [serveAt, weight, doneness, boneIn],
  )

  async function copyPlan() {
    if (!plan) return
    const lines = [
      `Prime rib plan — ${plan.weightLb} lb ${plan.boneIn ? 'bone-in' : 'boneless'}, ${plan.spec.label.toLowerCase()}`,
      `Pull at ${plan.spec.pullTemp}°F · about ${formatDuration(plan.roastMinutes)} at ${LOW_OVEN_TEMP}°F`,
      '',
      ...plan.stages.map(
        (stage) =>
          `${formatTime(stage.at)} (${formatDayHint(stage.at, plan.serveAt)}) — ${stage.title}: ${stage.detail}`,
      ),
      '',
      'Times are estimates. Confirm doneness with an instant-read thermometer.',
    ]

    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <header className="max-w-2xl">
        <p className="eyebrow">Premium interactive feature</p>
        <h1 className="mt-5 font-display text-4xl leading-[1.02] text-bone sm:text-5xl">
          The Roast Calculator
        </h1>
        <p className="mt-5 leading-relaxed text-smoke">
          Tell it the roast and the hour you want to sit down. It counts
          backwards through the whole method — brine, temper, low roast, rest,
          finish and carve.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-10">
        {/* ---------------------------------------------------------- inputs */}
        <div className="lg:col-span-5">
          <div className="rounded-[1.75rem] border border-line bg-surface/60 p-6 sm:p-7">
            <Field label="Weight of your roast">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-4xl text-bone tnum">
                  {weight.toFixed(2).replace(/\.?0+$/, '')}
                </span>
                <span className="text-sm text-smoke">pounds</span>
              </div>
              <input
                type="range"
                min={MIN_WEIGHT}
                max={MAX_WEIGHT}
                step={0.25}
                value={weight}
                onChange={(event) => setWeight(Number(event.target.value))}
                aria-label="Weight of your roast in pounds"
                className="mt-4 w-full accent-[var(--color-ember)]"
              />
              <div className="mt-1.5 flex justify-between font-mono text-[0.65rem] text-smoke/70">
                <span>{MIN_WEIGHT} lb</span>
                <span>{MAX_WEIGHT} lb</span>
              </div>
            </Field>

            <Divider />

            <Field label="Bone">
              <div className="grid grid-cols-2 gap-2">
                <Choice
                  active={boneIn}
                  onClick={() => setBoneIn(true)}
                  title="Bone-in"
                  subtitle="On the rack"
                />
                <Choice
                  active={!boneIn}
                  onClick={() => setBoneIn(false)}
                  title="Boneless"
                  subtitle="Tied roast"
                />
              </div>
            </Field>

            <Divider />

            <Field label="How you like it">
              <div className="space-y-2">
                {DONENESS.map((spec) => {
                  const active = spec.id === doneness
                  return (
                    <button
                      key={spec.id}
                      type="button"
                      onClick={() => setDoneness(spec.id)}
                      aria-pressed={active}
                      className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                        active
                          ? 'border-ember bg-ember/10'
                          : 'border-line hover:border-smoke/50'
                      }`}
                    >
                      <span
                        className="h-7 w-7 shrink-0 rounded-full border border-line"
                        style={{ backgroundColor: spec.swatch }}
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <span className="block text-sm text-bone">
                          {spec.label}
                        </span>
                        <span className="block truncate text-xs text-smoke">
                          {spec.note}
                        </span>
                      </span>
                      <span className="ml-auto font-mono text-xs text-ember-soft tnum">
                        {spec.pullTemp}°F
                      </span>
                    </button>
                  )
                })}
              </div>
            </Field>

            <Divider />

            <Field label="When you want to serve">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={dateValue}
                  onChange={(event) => setDateValue(event.target.value)}
                  aria-label="Date you want to serve"
                  className="rounded-xl border border-line bg-char px-3.5 py-3 font-mono text-sm text-bone [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-ember-soft/60"
                />
                <input
                  type="time"
                  value={timeValue}
                  onChange={(event) => setTimeValue(event.target.value)}
                  aria-label="Time you want to serve"
                  className="rounded-xl border border-line bg-char px-3.5 py-3 font-mono text-sm text-bone [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-ember-soft/60"
                />
              </div>
            </Field>
          </div>
        </div>

        {/* --------------------------------------------------------- results */}
        <div className="lg:col-span-7">
          {plan ? (
            <div className="space-y-8">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-char-deep p-6 ember-glow sm:p-8">
                <div className="relative grid grid-cols-2 gap-6 sm:grid-cols-4">
                  <Stat label="Pull at" value={`${plan.spec.pullTemp}°F`} />
                  <Stat
                    label="Time in oven"
                    value={formatDuration(plan.roastMinutes)}
                  />
                  <Stat
                    label="Oven in"
                    value={formatTime(plan.ovenInAt)}
                    hint={offDayHint(plan.ovenInAt, plan.serveAt)}
                  />
                  <Stat
                    label="On the table"
                    value={formatTime(plan.serveAt)}
                    hint={`≈ ${plan.spec.finalTemp}°F`}
                  />
                </div>

                <div className="relative mt-8 h-px hairline" />

                <div className="relative mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-smoke">
                  <span>
                    {plan.weightLb} lb {plan.boneIn ? 'bone-in' : 'boneless'} ·{' '}
                    {plan.spec.label.toLowerCase()}
                  </span>
                  <span>
                    Serves roughly {plan.servingsLow}–{plan.servingsHigh}
                  </span>
                  <span>
                    {LOW_OVEN_TEMP}°F, then {FINISH_OVEN_TEMP}°F
                  </span>
                  <button
                    type="button"
                    onClick={copyPlan}
                    className="ml-auto rounded-full border border-line px-4 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-bone transition-colors hover:border-ember hover:text-ember-soft"
                  >
                    {copied ? 'Copied' : 'Copy plan'}
                  </button>
                </div>
              </div>

              <Timeline plan={plan} />

              <p className="text-xs leading-relaxed text-smoke/80">
                Ovens and cuts of meat vary. These times are helpful estimates —
                internal temperature is the most dependable result for any beef
                roast, so confirm doneness with a calibrated instant-read
                thermometer before the roast comes out.
              </p>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  )
}

function Timeline({ plan }: { plan: RoastPlan }) {
  return (
    <ol className="relative border-l border-line pl-7">
      {plan.stages.map((stage) => {
        const hint = offDayHint(stage.at, plan.serveAt)
        return (
          <li key={stage.key} className="relative pb-8 last:pb-0">
            <span
              className={`absolute -left-[2.05rem] top-1.5 h-3 w-3 rounded-full border-2 ${
                stage.ahead
                  ? 'border-line bg-char'
                  : 'border-ember bg-ember shadow-[0_0_0_5px_rgba(194,87,31,0.14)]'
              }`}
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-mono text-lg text-bone tnum">
                {formatTime(stage.at)}
              </span>
              {hint ? (
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ember-soft/80">
                  {hint}
                </span>
              ) : null}
            </div>
            <h3 className="mt-1 font-display text-xl text-bone">
              {stage.title}
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-smoke">
              {stage.detail}
            </p>
          </li>
        )
      })}
    </ol>
  )
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-[22rem] flex-col items-start justify-center rounded-[1.75rem] border border-dashed border-line bg-surface/30 p-8">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-8 w-8 text-line"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5.5l3.5 2" />
      </svg>
      <p className="mt-5 font-display text-2xl text-bone">
        Pick a serving time
      </p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-smoke">
        Choose the date and hour you want the roast on the table and the full
        schedule appears here.
      </p>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-smoke">
        {label}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function Divider() {
  return <div className="my-7 h-px bg-line/60" />
}

function Choice({
  active,
  onClick,
  title,
  subtitle,
}: {
  active: boolean
  onClick: () => void
  title: string
  subtitle: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
        active ? 'border-ember bg-ember/10' : 'border-line hover:border-smoke/50'
      }`}
    >
      <span className="block text-sm text-bone">{title}</span>
      <span className="block text-xs text-smoke">{subtitle}</span>
    </button>
  )
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <div>
      <p className="text-[0.62rem] uppercase tracking-[0.2em] text-smoke">
        {label}
      </p>
      <p className="mt-1.5 font-mono text-2xl leading-tight text-ember-soft tnum sm:text-[1.7rem]">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 font-mono text-[0.65rem] text-smoke/70">{hint}</p>
      ) : null}
    </div>
  )
}
