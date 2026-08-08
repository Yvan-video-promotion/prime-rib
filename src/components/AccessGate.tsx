import { useEffect, useState } from 'react'

import { unlockAccess } from '../server/access.functions'

const STORAGE_KEY = 'ember-bone-access'

type GateState = 'checking' | 'locked' | 'unlocked'

/**
 * First-time visitors enter the email they used at checkout; after that the
 * unlock is remembered on the device so the calculator opens straight away.
 */
export default function AccessGate({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState<GateState>('checking')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    try {
      setState(window.localStorage.getItem(STORAGE_KEY) ? 'unlocked' : 'locked')
    } catch {
      // Private browsing with storage disabled — ask every time instead.
      setState('locked')
    }
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return

    setSubmitting(true)
    setError(null)

    try {
      const result = await unlockAccess({ data: { email } })

      if (!result.ok) {
        setError(result.error ?? 'Something went wrong. Try again.')
        return
      }

      try {
        window.localStorage.setItem(STORAGE_KEY, email.trim().toLowerCase())
      } catch {
        // Not fatal — the gate simply reappears next visit.
      }
      setState('unlocked')
    } catch {
      setError('We could not reach the server. Check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (state === 'checking') return <GateSkeleton />
  if (state === 'unlocked') return <>{children}</>

  return (
    <div className="mx-auto max-w-xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="eyebrow">Premium interactive feature</p>
      <h1 className="mt-5 font-display text-4xl leading-[1.05] text-bone sm:text-5xl">
        Unlock the
        <br />
        Roast Calculator
      </h1>
      <p className="mt-6 leading-relaxed text-smoke">
        Enter the same email address you used to complete your Etsy purchase.
        This verifies the purchase and opens the premium interactive features.
        You only need to do this once on this device.
      </p>

      <form onSubmit={handleSubmit} className="mt-10" noValidate>
        <label
          htmlFor="access-email"
          className="block text-[0.7rem] uppercase tracking-[0.22em] text-smoke"
        >
          Etsy purchase email
        </label>
        <input
          id="access-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (error) setError(null)
          }}
          placeholder="you@example.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'access-error' : undefined}
          className={`mt-3 w-full rounded-xl border bg-surface px-4 py-3.5 text-bone placeholder:text-smoke/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ember-soft/60 ${
            error ? 'border-rare' : 'border-line'
          }`}
        />

        {error ? (
          <p
            id="access-error"
            role="alert"
            className="mt-3 flex items-start gap-2 text-sm text-ember-soft"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M12 8v5M12 16.5v.01" />
              <circle cx="12" cy="12" r="9" />
            </svg>
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting || email.trim().length === 0}
          className="mt-6 w-full rounded-full bg-ember px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-char transition-all duration-300 hover:bg-ember-soft disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? 'Verifying…' : 'Open the calculator'}
        </button>
      </form>

      <p className="mt-6 text-xs leading-relaxed text-smoke/80">
        Your email is used only as described in the shop's applicable privacy
        policy. The downloadable PDF does not require verification — it is
        available directly from your Etsy account.
      </p>
    </div>
  )
}

/** Matches the shape of the form so the page does not jump when it resolves. */
function GateSkeleton() {
  return (
    <div className="mx-auto max-w-xl animate-pulse px-5 py-20 sm:px-8 sm:py-28">
      <div className="h-3 w-44 rounded bg-surface-2" />
      <div className="mt-7 h-11 w-4/5 rounded bg-surface-2" />
      <div className="mt-3 h-11 w-3/5 rounded bg-surface-2" />
      <div className="mt-8 space-y-3">
        <div className="h-4 w-full rounded bg-surface" />
        <div className="h-4 w-11/12 rounded bg-surface" />
        <div className="h-4 w-2/3 rounded bg-surface" />
      </div>
      <div className="mt-12 h-14 w-full rounded-xl bg-surface-2" />
      <div className="mt-6 h-14 w-full rounded-full bg-surface" />
    </div>
  )
}
