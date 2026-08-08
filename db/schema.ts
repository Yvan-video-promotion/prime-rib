import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core'

/**
 * One row per customer who has unlocked the interactive Roast Calculator with
 * the email address they used at checkout. `unlockCount` lets the shop owner
 * see how often the app is being reopened from a new device or browser.
 */
export const members = pgTable('members', {
  id: serial().primaryKey(),
  email: text().notNull().unique(),
  unlockCount: integer('unlock_count').notNull().default(1),
  createdAt: timestamp('created_at').defaultNow(),
  lastSeenAt: timestamp('last_seen_at').defaultNow(),
})
