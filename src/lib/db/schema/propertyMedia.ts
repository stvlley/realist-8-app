import { pgTable, uuid, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { properties } from './properties';

export const propertyMedia = pgTable('property_media', {
  id: uuid('id').defaultRandom().primaryKey(),
  propertyId: uuid('property_id').references(() => properties.id).notNull(),
  mediaUrl: text('media_url').notNull(),
  mediaType: varchar('media_type', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type PropertyMedia = typeof propertyMedia.$inferSelect;
export type NewPropertyMedia = typeof propertyMedia.$inferInsert; 