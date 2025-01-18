import { pgTable, uuid, varchar, date, timestamp } from 'drizzle-orm/pg-core';
import { properties } from './properties';
import { contractorProfiles } from './contractorProfiles';

export const jobs = pgTable('jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id')
    .notNull()
    .references(() => properties.id, { onDelete: 'cascade' }),
  contractorProfileId: uuid('contractor_profile_id')
    .notNull()
    .references(() => contractorProfiles.id, { onDelete: 'cascade' }),
  description: varchar('description', { length: 255 }),
  status: varchar('status', { length: 50 }).notNull().default('PENDING'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert; 