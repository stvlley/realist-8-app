import { pgTable, uuid, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { userRolesJoin } from "./userRolesJoin"; // Corrected import path

export const userRoles = pgTable(
  "user_roles",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`), // Uses gen_random_uuid() from pgcrypto
    name: varchar("name", { length: 100 }).notNull(), // e.g., 'admin', 'editor'
    description: text("description"),
    is_system: boolean("is_system").default(false).notNull(), // Distinguishes system vs. user roles
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  }
);

// Define relations
export const rolesRelations = relations(userRoles, ({ many }) => ({
  userRoles: many(userRolesJoin),
}));

export default userRoles;