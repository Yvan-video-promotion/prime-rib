import { site } from '../lib/site'

interface EtsyButtonProps {
  children?: React.ReactNode
  variant?: 'solid' | 'outline'
  className?: string
}

/**
 * The single conversion point of the site. Every one of these opens the recipe
 * book page in a new tab.
 */
export default function EtsyButton({
  children = 'Get the recipe',
  variant = 'solid',
  className = '',
}: EtsyButtonProps) {
  const base =
    'group inline-flex items-center gap-3 rounded-full px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300'

  const styles =
    variant === 'solid'
      ? 'bg-ember text-char shadow-[0_18px_40px_-18px_rgba(194,87,31,0.9)] hover:-translate-y-0.5 hover:bg-ember-soft'
      : 'border border-line text-bone hover:border-ember hover:text-ember-soft'

  return (
    <a
      href={site.bookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <span>{children}</span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  )
}
