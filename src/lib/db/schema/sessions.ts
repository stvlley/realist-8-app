// import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm";
// import { users } from "./users";

// export const sessions = pgTable('sessions', {
//   id: text('id').primaryKey().notNull(),
//   sessionToken: text('session_token').unique().notNull(),
//   userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
//   expires: timestamp('expires').notNull(),
// });

// export const sessionRelations = relations(sessions, ({ one }) => ({
//   user: one(users, { fields: [sessions.userId], references: [users.id] }),
// }));