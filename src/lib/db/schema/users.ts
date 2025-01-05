import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { userRoles } from "./userRoles"; // Corrected import path

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`), // Uses gen_random_uuid() from pgcrypto
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    emailVerified: timestamp("verified_at"),
    password: varchar("password", { length: 255 }).notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  }
);

// Define relations if necessary
export const usersRelations = relations(users, ({ many }) => ({
  userRoles: many(userRoles),
}));

export default users;