import { db } from '@/lib/db';
import { roles, userRoles, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
// import { users } from '@/lib/db/schema/users';
// import { eq, sql } from 'drizzle-orm';

export const getUserRoleById = async (id: string) => {

    try {
        const result = await db.select({
                                    
                                    role: roles.name
                                })
                                .from(roles)
                                .innerJoin(userRoles, eq(userRoles.role_id, roles.id))
                                .innerJoin(users, eq(users.id, userRoles.user_id))
                                .where(eq(users.id, id));
        

        const userRole = result[0]
        return userRole
    } catch {
        return null
    }
};

