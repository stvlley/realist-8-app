/*
------------------------------------------------------------------------------
-- 8. reports
--    AI-driven reports created by an agent for a client/property.
------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reports (
    id             UUID          NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    agent_id       UUID          NOT NULL,
    client_id      UUID          NOT NULL,
    property_id    UUID          NOT NULL,
    title          VARCHAR(255)  NOT NULL,
    content        TEXT,
    created_at     TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMP     NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_reports_agent
        FOREIGN KEY (agent_id)
        REFERENCES users (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_reports_client
        FOREIGN KEY (client_id)
        REFERENCES users (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_reports_property
        FOREIGN KEY (property_id)
        REFERENCES properties (id)
        ON DELETE CASCADE
);
*/ 

import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { properties } from './properties';

export const reports = pgTable('reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  agentId: uuid('agent_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  clientId: uuid('client_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  propertyId: uuid('property_id').references(() => properties.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}); 