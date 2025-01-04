// import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";

// export const verificationTokens = pgTable('verification_tokens', {
//   identifier: text('identifier').notNull(),
//   token: text('token').notNull(),
//   expires: timestamp('expires').notNull(),
// }, (table) => [
//   primaryKey({
//     columns: [table.identifier, table.token], // Use the modern object syntax
//   }),
// ]);