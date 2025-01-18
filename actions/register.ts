"use server";

import * as z from "zod";
import { RegisterSchema } from '@/../schemas';
import bcrypt from "bcryptjs";
import { db } from '@/lib/db';
import { users, userRoles, roles } from "@/lib/db/schema";
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { getUserByEmail } from "../data/user";
import { generateVerificationToken } from "@/lib/tokens";





export const register = async (values: any) => {
    // Validate the input data
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid inputs!", details: validatedFields.error.errors };
    }

    const { email, password, name, role } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const existingUserEmail = await getUserByEmail(email);
    if (existingUserEmail) {
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
            password: hashedPassword
        });

        // Insert into the user_roles table
        await db.insert(roles).values({
            id: newRoleId, // Generate a unique UUID for the user role
            name: role, // THIS IS THE ROLE WE ARE INSERTING
            description: "User role",
            is_system: false,

        });
        await db.insert(userRoles).values({
            id: randomUUID(), // Generate a unique UUID for the user role
            user_id: newUserId,
            role_id: newRoleId, // THIS IS THE ROLE WE ARE INSERTING
        });

       
        const verificationToken = await generateVerificationToken(email)
        console.log(verificationToken)
         // TODO: send verification token

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