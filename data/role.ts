import { db } from '@/lib/db';
import { userRoles, userRolesJoin, users } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
// import { users } from '@/lib/db/schema/users';
// import { eq, sql } from 'drizzle-orm';

export const getUserRoleById = async (id: string) => {

    try {
        const result = await db.execute(sql`select ur.name from user_roles ur
            join user_roles_join urj 
                on ur.id = urj.role_id
            join users u
                on urj.user_id = u.id
            where u.id = ${id}`);
        

        const userRole = result.rows[0].name;
        return userRole
    } catch {
        return null
    }
};

