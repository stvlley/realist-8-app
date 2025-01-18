import { pgTable, uuid, varchar, decimal, timestamp } from 'drizzle-orm/pg-core';
import { reports } from './reports';

export const recommendedUpgrades = pgTable('recommended_upgrades', {
  id: uuid('id').primaryKey().defaultRandom(),
  reportId: uuid('report_id').references(() => reports.id, { onDelete: 'cascade' }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  estimatedCost: decimal('estimated_cost', { precision: 12, scale: 2 }),
  expectedRoiPct: decimal('expected_roi_pct', { precision: 5, scale: 2 }),
  status: varchar('status', { length: 50 }).notNull().default('RECOMMENDED'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}); 