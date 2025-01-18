-- Filename: create_realist_schema.sql

-- 1. Ensure the UUID extension is available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- (Alternatively, if you prefer the uuid-ossp extension)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

------------------------------------------------------------------------------
-- 2. agent_profiles
--    Stores extra data for users with the AGENT role.
------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_profiles (
    id               UUID             NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id          UUID             NOT NULL,
    license_number   VARCHAR(100),
    brokerage_name   VARCHAR(255),
    created_at       TIMESTAMP        NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMP        NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_agent_profiles_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
);

------------------------------------------------------------------------------
-- 3. contractor_profiles
--    Stores extra data for users with the CONTRACTOR role.
------------------------------------------------------------------------------
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

------------------------------------------------------------------------------
-- 4. services
--    A reference table of service types (e.g., "Plumbing", "Electrical").
------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
    id          UUID          NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL,
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP     NOT NULL DEFAULT NOW()
);

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

------------------------------------------------------------------------------
-- 6. properties
--    Stores property/home details.
------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS properties (
    id              UUID             NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    address_line1   VARCHAR(255)     NOT NULL,
    address_line2   VARCHAR(255),
    city            VARCHAR(100),
    state           VARCHAR(100),
    zip_code        VARCHAR(20),
    latitude        DECIMAL(9,6),
    longitude       DECIMAL(9,6),
    bedrooms        INT,
    bathrooms       DECIMAL(3,1),
    square_footage  INT,
    year_built      INT,
    created_at      TIMESTAMP        NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP        NOT NULL DEFAULT NOW()
);

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

------------------------------------------------------------------------------
-- 9. recommended_upgrades
--    Stores recommended improvements from a given report.
------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS recommended_upgrades (
    id                UUID          NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    report_id         UUID          NOT NULL,
    description       VARCHAR(255)  NOT NULL,
    estimated_cost    DECIMAL(12,2),
    expected_roi_pct  DECIMAL(5,2),
    status            VARCHAR(50)   NOT NULL DEFAULT 'RECOMMENDED',
    created_at        TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMP     NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_recommended_upgrades_report
        FOREIGN KEY (report_id)
        REFERENCES reports (id)
        ON DELETE CASCADE
);

------------------------------------------------------------------------------
-- 10. contractor_reviews
--     Agents/clients can review contractor performance here.
------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contractor_reviews (
    id                   UUID         NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    contractor_profile_id UUID        NOT NULL,
    reviewer_id          UUID         NOT NULL,
    rating               INT          NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text          TEXT,
    created_at           TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMP    NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_contractor_reviews_contractor
        FOREIGN KEY (contractor_profile_id)
        REFERENCES contractor_profiles (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_contractor_reviews_reviewer
        FOREIGN KEY (reviewer_id)
        REFERENCES users (id)
        ON DELETE CASCADE
);

------------------------------------------------------------------------------
-- 11. jobs (Optional)
--     If you want to track actual work/assignments for contractors.
------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS jobs (
    id                    UUID          NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    property_id           UUID          NOT NULL,
    contractor_profile_id UUID          NOT NULL,
    description           VARCHAR(255),
    status               VARCHAR(50)    NOT NULL DEFAULT 'PENDING',
    start_date           DATE,
    end_date             DATE,
    created_at           TIMESTAMP      NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMP      NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_jobs_property
        FOREIGN KEY (property_id)
        REFERENCES properties (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_jobs_contractor
        FOREIGN KEY (contractor_profile_id)
        REFERENCES contractor_profiles (id)
        ON DELETE CASCADE
);

-- End of create_realist_schema.sql