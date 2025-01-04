import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().min(1, { message
    : "Email is required"
    }).email({
        message
        : "Email is not valid"
    }),

    password: z.string().min(1, { message 
    : "Password is required"
    }),
})

export const RegisterSchema = z.object({
    email: z.string().min(1, { message
    : "Email is required"
    }).email({
        message
        : "Email is not valid"
    }),
    
    password: z.string().min(6, { message 
    : "Password must be at least 6 characters"
    }),

    name: z.string().min(1, { message: "Name is required" }),
    role: z.string().min(1, { message: "Role is required" }),
})