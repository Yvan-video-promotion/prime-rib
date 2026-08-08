import { createServerFn } from '@tanstack/react-start'
import { sql } from 'drizzle-orm'

import { db } from '../../db/index.js'
import { members } from '../../db/schema.js'

/** Deliberately permissive — enough to catch typos, not to police addresses. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export interface UnlockResult {
  ok: boolean
  /** Present when the address was rejected before it reached the database. */
  error?: string
  /** True when this address had already unlocked the app before. */
  returning?: boolean
  /** False when the database was unreachable and access was granted anyway. */
  recorded?: boolean
}

/**
 * Records the email a customer used at checkout and opens the interactive
 * features. If the database is briefly unavailable we still let a paying
 * customer through rather than blocking them on infrastructure.
 */
export const unlockAccess = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }): Promise<UnlockResult> => {
    const email = data.email.trim().toLowerCase()

    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      return {
        ok: false,
        error: 'That does not look like an email address. Check it and try again.',
      }
    }

    try {
      const [row] = await db
        .insert(members)
        .values({ email })
        .onConflictDoUpdate({
          target: members.email,
          set: {
            unlockCount: sql`${members.unlockCount} + 1`,
            lastSeenAt: new Date(),
          },
        })
        .returning({ unlockCount: members.unlockCount })

      return {
        ok: true,
        recorded: true,
        returning: (row?.unlockCount ?? 1) > 1,
      }
    } catch (error) {
      console.error('Could not record calculator access', error)
      return { ok: true, recorded: false }
    }
  })
