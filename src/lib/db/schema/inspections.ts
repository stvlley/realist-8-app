/*
------------------------------------------------------------------------------
-- 7. inspections
--    Links to properties and optionally to an inspector (a user) for inspection data.
------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inspections (
    id              UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    property_id     UUID        NOT NULL,
    inspector_id    UUID        NOT NULL,
    inspection_date DATE        NOT NULL,
    overall_rating  INT,        -- 1-5 scale or custom
    report_data     JSONB,      -- Detailed inspection items as JSON
    created_at      TIMESTAMP   NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP   NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_inspections_property
        FOREIGN KEY (property_id)
        REFERENCES properties (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_inspections_inspector
        FOREIGN KEY (inspector_id)
        REFERENCES users (id)
        ON DELETE CASCADE
);

*/ 

import { pgTable, uuid, date, integer, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { properties } from './properties';
import { users } from './users';

export const inspections = pgTable('inspections', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id')
    .notNull()
    .references(() => properties.id, { onDelete: 'cascade' }),
  inspectorId: uuid('inspector_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  inspectionDate: date('inspection_date').notNull(),
  overallRating: integer('overall_rating'),
  reportData: jsonb('report_data'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Inspection = typeof inspections.$inferSelect;
export type NewInspection = typeof inspections.$inferInsert; 