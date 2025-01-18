/*
------------------------------------------------------------------------------
-- 5. contractor_services
--    Many-to-many link between contractor_profiles and services.
------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contractor_services (
    id                   UUID          NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    contractor_profile_id UUID         NOT NULL,
    service_id           UUID          NOT NULL,
    created_at           TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMP     NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_contractor_services_contractor
        FOREIGN KEY (contractor_profile_id)
        REFERENCES contractor_profiles (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_contractor_services_service
        FOREIGN KEY (service_id)
        REFERENCES services (id)
        ON DELETE CASCADE
);

*/ 

import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { contractorProfiles } from './contractorProfiles';
import { services } from './services';

export const contractorServices = pgTable('contractor_services', {
  id: uuid('id').defaultRandom().primaryKey(),
  contractorProfileId: uuid('contractor_profile_id')
    .notNull()
    .references(() => contractorProfiles.id, { onDelete: 'cascade' }),
  serviceId: uuid('service_id')
    .notNull()
    .references(() => services.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}); 