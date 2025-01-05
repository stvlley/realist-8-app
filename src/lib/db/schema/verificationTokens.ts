import { pgTable, text, timestamp, primaryKey, uuid } from "drizzle-orm/pg-core";

export const verificationTokens = pgTable('verification_tokens', {
  id: uuid('id'),
  token: text("token").unique().notNull(),
  expires: timestamp('expires').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').notNull(),
  expiresAt: timestamp('expires_at').notNull(),


}, (table) => [
  primaryKey({
    columns: [table.id], // Use the modern object syntax
  }),
]);