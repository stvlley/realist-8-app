import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./users"; // Corrected import path
import { userRoles } from "./userRoles"; // Corrected import path

export const userRolesJoin = pgTable(
  "user_roles_join",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`), // Uses gen_random_uuid() from pgcrypto
    user_id: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    role_id: uuid("role_id")
      .references(() => userRoles.id, { onDelete: "cascade" })
      .notNull(),
    assigned_at: timestamp("assigned_at").defaultNow(),
  }
);

// Define relations
export const userRolesRelations = relations(userRolesJoin, ({ one }) => ({
  user: one(users, { fields: [userRolesJoin.user_id], references: [users.id] }),
  role: one(userRoles, { fields: [userRolesJoin.role_id], references: [userRoles.id] }),
}));

export default userRolesJoin;