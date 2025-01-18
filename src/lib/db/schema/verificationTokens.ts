import { pgTable, text, timestamp, primaryKey, uuid } from "drizzle-orm/pg-core";

export const verificationTokens = pgTable('verification_tokens', {
  id: uuid('id'),
  token: text("token").unique().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').notNull(),
}, (table) => [
  primaryKey({
    columns: [table.id],
  }),
]);