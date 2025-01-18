import { pgTable, uuid, integer, text, timestamp, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { contractorProfiles } from './contractorProfiles';
import { users } from './users';

// Define the contractor reviews table schema
export const contractorReviews = pgTable('contractor_reviews', {
  // Unique identifier for each review
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Foreign key to the contractor being reviewed
  contractorProfileId: uuid('contractor_profile_id')
    .notNull()
    .references(() => contractorProfiles.id, { onDelete: 'cascade' }),
  
  // Foreign key to the user writing the review
  reviewerId: uuid('reviewer_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  
  // Rating must be between 1 and 5
  rating: integer('rating')
    .notNull(),
  
  // Optional text content of the review
  reviewText: text('review_text'),
  
  // Timestamps for review creation and updates
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, () => [
    
  check('rating_check', sql`rating BETWEEN 1 AND 5`)
]);

// TypeScript types for type-safe database operations
export type ContractorReview = typeof contractorReviews.$inferSelect;  // Type for reading reviews
export type NewContractorReview = typeof contractorReviews.$inferInsert;  // Type for creating reviews 