

import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const agentProfiles = pgTable('agent_profiles', {
    id: uuid('id').primaryKey().defaultRandom(),
    user_id: uuid('user_id').notNull(),
    license_number: varchar('license_number', { length: 100 }),
    brokerage_name: varchar('brokerage_name', { length: 255 }),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
});