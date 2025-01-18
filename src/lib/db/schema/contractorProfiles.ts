/*
CREATE TABLE IF NOT EXISTS contractor_profiles (
    id               UUID             NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id          UUID             NOT NULL,
    company_name     VARCHAR(255),
    average_rating   DECIMAL(2,1),
    created_at       TIMESTAMP        NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMP        NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_contractor_profiles_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
);
*/
import { pgTable, uuid, varchar, decimal, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const contractorProfiles = pgTable('contractor_profiles', {
    id: uuid('id').primaryKey().defaultRandom(),
    
    // The actual user record for the contractor:
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),

    // NEW FIELD: The agent (or user) who submitted the contractor:
    submittedBy: uuid('submitted_by')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),

    companyName: varchar('company_name', { length: 255 }),
    averageRating: decimal('average_rating', { precision: 2, scale: 1 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
