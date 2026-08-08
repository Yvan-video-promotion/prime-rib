import { createFileRoute } from '@tanstack/react-router'

import AccessGate from '../components/AccessGate'
import RoastCalculator from '../components/RoastCalculator'
import { site } from '../lib/site'

export const Route = createFileRoute('/calculator')({
  head: () => ({
    meta: [
      { title: `Roast Calculator — ${site.name}` },
      {
        name: 'description',
        content:
          'Enter your roast weight and preferred doneness for a personalised oven schedule, pull temperature, cooking duration and the exact time to put the roast in.',
      },
    ],
  }),
  component: CalculatorPage,
})

function CalculatorPage() {
  return (
    <main className="min-h-[70vh]">
      <AccessGate>
        <RoastCalculator />
      </AccessGate>
    </main>
  )
}
