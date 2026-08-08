/**
 * Pure timing maths for the reverse-sear prime rib method.
 *
 * The method is fixed — 225°F low roast, a rest while the oven climbs, then a
 * short blast at 500°F — so everything can be derived backwards from the time
 * the roast is meant to reach the table.
 */

export type DonenessId = 'rare' | 'medium-rare' | 'medium' | 'medium-well'

export interface DonenessSpec {
  id: DonenessId
  label: string
  /** Internal temperature to pull the roast out of the low oven. */
  pullTemp: number
  /** Where it lands after carryover and the high-heat finish. */
  finalTemp: number
  /** Minutes per pound in a 225°F oven, boneless. */
  minutesPerPound: number
  /** Doneness of the interior, in plain words. */
  note: string
  /** Swatch approximating the colour of the cooked interior. */
  swatch: string
}

export const DONENESS: DonenessSpec[] = [
  {
    id: 'rare',
    label: 'Rare',
    pullTemp: 115,
    finalTemp: 125,
    minutesPerPound: 26,
    note: 'Cool crimson centre, very soft bite',
    swatch: '#9E2B25',
  },
  {
    id: 'medium-rare',
    label: 'Medium rare',
    pullTemp: 122,
    finalTemp: 132,
    minutesPerPound: 29,
    note: 'Warm red centre — the steakhouse standard',
    swatch: '#B24236',
  },
  {
    id: 'medium',
    label: 'Medium',
    pullTemp: 130,
    finalTemp: 140,
    minutesPerPound: 33,
    note: 'Rosy pink through, firmer slice',
    swatch: '#C4675A',
  },
  {
    id: 'medium-well',
    label: 'Medium well',
    pullTemp: 138,
    finalTemp: 148,
    minutesPerPound: 37,
    note: 'Faint blush at the centre only',
    swatch: '#CE8E7C',
  },
]

/** Fixed stages of the method, in minutes. */
export const LOW_OVEN_TEMP = 225
export const FINISH_OVEN_TEMP = 500
export const REST_MINUTES = 30
export const SEAR_MINUTES = 8
export const CARVE_REST_MINUTES = 10
export const TEMPER_MINUTES = 120
export const BRINE_MINUTES = 24 * 60

/** Bone-in roasts shield the meat and run longer than the same weight boneless. */
const BONE_IN_FACTOR = 1.08

export const MIN_WEIGHT = 3
export const MAX_WEIGHT = 20

export interface PlanInput {
  weightLb: number
  doneness: DonenessId
  boneIn: boolean
  serveAt: Date
}

export interface PlanStage {
  key: string
  at: Date
  title: string
  detail: string
  /** Marks the stages that happen well before cooking day. */
  ahead?: boolean
}

export interface RoastPlan {
  spec: DonenessSpec
  weightLb: number
  boneIn: boolean
  /** Minutes in the 225°F oven, rounded to something a cook can act on. */
  roastMinutes: number
  /** Oven-in through to the table. */
  totalMinutes: number
  ovenInAt: Date
  serveAt: Date
  stages: PlanStage[]
  servingsLow: number
  servingsHigh: number
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

const addMinutes = (date: Date, minutes: number) =>
  new Date(date.getTime() + minutes * 60_000)

/** Rounds to the nearest 5 minutes — oven timing is never precise to the minute. */
const roundTo5 = (n: number) => Math.max(5, Math.round(n / 5) * 5)

export function getDoneness(id: DonenessId): DonenessSpec {
  return DONENESS.find((d) => d.id === id) ?? DONENESS[1]
}

export function buildPlan({
  weightLb,
  doneness,
  boneIn,
  serveAt,
}: PlanInput): RoastPlan {
  const spec = getDoneness(doneness)
  const weight = clamp(weightLb, MIN_WEIGHT, MAX_WEIGHT)

  const roastMinutes = roundTo5(
    weight * spec.minutesPerPound * (boneIn ? BONE_IN_FACTOR : 1),
  )

  const totalMinutes =
    roastMinutes + REST_MINUTES + SEAR_MINUTES + CARVE_REST_MINUTES

  const carveAt = addMinutes(serveAt, -CARVE_REST_MINUTES)
  const searAt = addMinutes(carveAt, -SEAR_MINUTES)
  const pullAt = addMinutes(searAt, -REST_MINUTES)
  const ovenInAt = addMinutes(pullAt, -roastMinutes)
  const temperAt = addMinutes(ovenInAt, -TEMPER_MINUTES)
  const brineAt = addMinutes(ovenInAt, -BRINE_MINUTES)

  // A bone-in roast feeds roughly one person per pound; boneless goes further.
  const perPerson = boneIn ? 1 : 0.72
  const servings = weight / perPerson

  return {
    spec,
    weightLb: weight,
    boneIn,
    roastMinutes,
    totalMinutes,
    ovenInAt,
    serveAt,
    servingsLow: Math.max(2, Math.floor(servings)),
    servingsHigh: Math.max(3, Math.ceil(servings * 1.25)),
    stages: [
      {
        key: 'brine',
        at: brineAt,
        title: 'Dry brine',
        detail:
          'Salt the roast generously on every surface and set it uncovered on a rack in the fridge for a full 24 hours.',
        ahead: true,
      },
      {
        key: 'temper',
        at: temperAt,
        title: 'Out of the fridge',
        detail:
          'Let the roast sit at room temperature for 2 hours so the centre is not fighting the oven. Pat the surface dry.',
        ahead: true,
      },
      {
        key: 'oven-in',
        at: ovenInAt,
        title: `Into the oven at ${LOW_OVEN_TEMP}°F`,
        detail: `Fat cap up on a rack over the bones. ${formatDuration(roastMinutes)} is the estimate — the thermometer decides.`,
      },
      {
        key: 'pull',
        at: pullAt,
        title: `Pull at ${spec.pullTemp}°F`,
        detail: `Take it out the moment the centre reads ${spec.pullTemp}°F. Tent loosely and turn the oven up to ${FINISH_OVEN_TEMP}°F.`,
      },
      {
        key: 'sear',
        at: searAt,
        title: `Back in at ${FINISH_OVEN_TEMP}°F`,
        detail: `${SEAR_MINUTES} minutes, uncovered, until the crust is dark and crackling. Do not walk away.`,
      },
      {
        key: 'carve',
        at: carveAt,
        title: 'Rest, then carve',
        detail: `${CARVE_REST_MINUTES} minutes on the board. Free the bones in one cut, then slice across the grain.`,
      },
      {
        key: 'serve',
        at: serveAt,
        title: 'On the table',
        detail: `Roughly ${spec.finalTemp}°F at the centre, with the au jus hot and the plates warm.`,
      },
    ],
  }
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  if (h === 0) return `${m} min`
  if (m === 0) return `${h} hr`
  return `${h} hr ${m} min`
}

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
})

const dayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
})

export function formatTime(date: Date): string {
  return timeFormatter.format(date)
}

/** "Sat" / "the day before" style hint so 3am oven-in times are not a surprise. */
export function formatDayHint(date: Date, reference: Date): string {
  const startOf = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  const diff = Math.round(
    (startOf(date) - startOf(reference)) / (24 * 60 * 60 * 1000),
  )
  if (diff === 0) return 'same day'
  if (diff === -1) return 'the night before'
  if (diff < -1) return `${Math.abs(diff)} days before`
  return dayFormatter.format(date)
}

/**
 * Turns a `<input type="date">` + `<input type="time">` pair into a local Date.
 * Returns null when either half is missing or unparseable.
 */
export function toLocalDate(dateValue: string, timeValue: string): Date | null {
  if (!dateValue || !timeValue) return null
  const [y, m, d] = dateValue.split('-').map(Number)
  const [hh, mm] = timeValue.split(':').map(Number)
  if ([y, m, d, hh, mm].some((n) => Number.isNaN(n))) return null
  const date = new Date(y, m - 1, d, hh, mm, 0, 0)
  return Number.isNaN(date.getTime()) ? null : date
}
