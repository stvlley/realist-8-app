import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
// import { users } from '@/lib/db/schema/users';
// import { eq, sql } from 'drizzle-orm';

export const getUserByEmail = async (email: string) => {

    try {
        const result = (await db.select().from(users).where(eq(users.email, email)));
        const user = result[0];

        
        return user
    } catch {
        return null
    }
};

export const getUserById = async (id: string) => {

    try {
        const result = await db.select().from(users).where(eq(users.id, id));
        const user = result[0]

        return user
    } catch {
        return null
    }
};