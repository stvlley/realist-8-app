-- 1) Enable extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- 3) Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name VARCHAR(255)  NOT NULL,
  address           TEXT,
  contact_email     VARCHAR(255),
  phone_number      VARCHAR(20),
  created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4) Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name  VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5) Create service_types table
CREATE TABLE IF NOT EXISTS service_types (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type_name   VARCHAR(255) NOT NULL,
  created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6) Create ai_reports table
CREATE TABLE IF NOT EXISTS ai_reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_name     VARCHAR(255) NOT NULL,
  report_content  TEXT,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7) Create admin_settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_name   VARCHAR(255) NOT NULL,
  setting_value  TEXT NOT NULL,
  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8) Create users table
CREATE TABLE IF NOT EXISTS users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(255) NOT NULL,
  email           VARCHAR(255) UNIQUE NOT NULL,
  password_hash   TEXT NOT NULL,
  role            user_role_enum NOT NULL,  -- If you want to keep the enum role on users
  phone_number    VARCHAR(20),
  organization_id UUID REFERENCES organizations(id),
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 9) Create services table
CREATE TABLE IF NOT EXISTS services (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name VARCHAR(255) NOT NULL,
  description  TEXT,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 10) Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id      UUID REFERENCES users(id),
  address       TEXT NOT NULL,
  property_type VARCHAR(255),
  price         DECIMAL(10,2),
  details       JSON,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 11) Create property_inspection_reports table
CREATE TABLE IF NOT EXISTS property_inspection_reports (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id       UUID REFERENCES properties(id),
  inspection_report JSON,
  created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 12) Create property_media table
CREATE TABLE IF NOT EXISTS property_media (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id  UUID REFERENCES properties(id),
  media_url    TEXT NOT NULL,
  media_type   media_type_enum NOT NULL,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 13) Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id    UUID REFERENCES users(id),
  receiver_id  UUID REFERENCES users(id),
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 14) Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id  UUID REFERENCES conversations(id),
  sender_id        UUID REFERENCES users(id),
  message          TEXT NOT NULL,
  created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 15) Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES users(id),
  property_id  UUID REFERENCES properties(id),
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 16) Create reviews table
-- NOTE: Only referencing properties here (to avoid polymorphic FK issues).
CREATE TABLE IF NOT EXISTS reviews (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id      UUID REFERENCES users(id),
  reviewed_item_id UUID REFERENCES properties(id),
  rating           INT,
  review_text      TEXT,
  created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 17) Create user_roles table (for many-to-many between users and roles)
CREATE TABLE IF NOT EXISTS user_roles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES users(id),
  role_id    UUID REFERENCES roles(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 18) Create permissions table (ties to roles)
CREATE TABLE IF NOT EXISTS permissions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id          UUID REFERENCES roles(id),
  permission_name  VARCHAR(255) NOT NULL,
  created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 19) Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES users(id),
  message    TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 20) Create ai_report_properties table
CREATE TABLE IF NOT EXISTS ai_report_properties (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ai_report_id UUID REFERENCES ai_reports(id),
  property_id  UUID REFERENCES properties(id),
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 21) Create ai_report_services table
CREATE TABLE IF NOT EXISTS ai_report_services (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ai_report_id UUID REFERENCES ai_reports(id),
  service_id   UUID REFERENCES services(id),
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 22) Create ai_report_recipients table
CREATE TABLE IF NOT EXISTS ai_report_recipients (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ai_report_id UUID REFERENCES ai_reports(id),
  recipient_id UUID REFERENCES users(id),
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Done!