"use server";
import { LoginSchema } from '@/../schemas';
import { signIn } from "@/../auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/../routes";
import { AuthError } from "next-auth";



export const login = async (values: any) => {
    // console.log("hello from server", values);
    // dont forget to always validate your inputs

    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid inputs!" };
    }
    
    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", { 
            email, 
            password, 
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": 
                    console.log(validatedFields.data)
                    return { error: "Invalid credentials!" };
                default:
                    console.log(validatedFields.data)
                    return { error: "Login failed. Please try again."};
            }
        }
        throw error;
    }
};