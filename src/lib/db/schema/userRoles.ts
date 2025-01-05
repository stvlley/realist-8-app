import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./users"; // Corrected import path
import { roles } from "./roles"; // Corrected import path

export const userRoles = pgTable(
  "user_roles",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`), // Uses gen_random_uuid() from pgcrypto
    user_id: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    role_id: uuid("role_id")
      .references(() => roles.id, { onDelete: "cascade" })
      .notNull(),
    assigned_at: timestamp("assigned_at").defaultNow(),
  }
);

// Define relations
export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, { fields: [userRoles.user_id], references: [users.id] }),
  role: one(roles, { fields: [userRoles.role_id], references: [roles.id] }),
}));

export default userRoles;