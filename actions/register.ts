"use server";

import * as z from "zod";
import { RegisterSchema } from '@/../schemas';
import bcrypt from "bcryptjs";
import { db } from '@/lib/db';
import { users, userRoles, userRolesJoin } from "@/lib/db/schema";
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { getUserByEmail } from "../data/user";

export const register = async (values: any) => {
    // Validate the input data
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid inputs!", details: validatedFields.error.errors };
    }

    const { email, password, name, role } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser?.rows.length > 0) {
        return { error: "Email already in use!" };
    }

    const newUserId = randomUUID(); // Generate a unique UUID for the new user
    const newRoleId = randomUUID(); 

    try {
        // Insert into the users table
        await db.insert(users).values({
            id: newUserId,
            name,
            email,
            role: "user", // this is a systems based role, not the one we are inserting into user_roles
            password: hashedPassword
        });

        // Insert into the user_roles table
        await db.insert(userRoles).values({
            id: newRoleId, // Generate a unique UUID for the user role
            name: role, // THIS IS THE ROLE WE ARE INSERTING
            description: "User role",
            is_system: false,
        });
        await db.insert(userRolesJoin).values({
            id: randomUUID(), // Generate a unique UUID for the user role
            user_id: newUserId,
            role_id: newRoleId, // THIS IS THE ROLE WE ARE INSERTING
        });

        // TODO: Implement verification email flow here

        return { message: "User created successfully!" };
    } catch (error: any) {
        console.error("Registration failed:", error);
        // Attempt to rollback by deleting the user if the user_roles insert failed
        try {
            await db.delete(users).where(eq(users.id, newUserId));
            console.log("Rolled back user creation due to user_roles insertion failure.");
        } catch (rollbackError: any) {
            console.error("Rollback failed:", rollbackError);
            // At this point, you might need to manually intervene or notify the admin
        }
        return { error: "Registration failed. Please try again." };
    }
};