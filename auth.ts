// /Users/stvlley/Desktop/realist-8-app/auth.ts

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import LinkedInProvider from "next-auth/providers/linkedin"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db" // Adjust the path based on your project structure
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import { getUserByEmail, getUserById } from "./data/user"
import bcrypt from "bcryptjs"
import { getUserRoleById } from "./data/role"



export const { auth, signIn, signOut, handlers: {GET, POST} } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
         const { email, password } = validatedFields.data;

         const user = await getUserByEmail(email); 
         console.log('user:', typeof user)
         if (!user || !user) return null;

         const userPassword: string = user.password as string;

         const passwordMatch = await bcrypt.compare(
           password,
           userPassword,
         );

          if (passwordMatch) return user;

        }
        console.log(validatedFields.data)
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.AUTH_FACEBOOK_ID!,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.AUTH_LINKEDIN_ID!,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET!,
      // Optionally, customize scope or other options
      // authorization: { params: { scope: 'r_liteprofile r_emailaddress' } },
    }),
    

  ],
  callbacks: {

  
   
    async session({ session, token }) {

      console.log({
        sessionToken: token
      })
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session
    },
    async jwt({ token}) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      const userRole = await getUserRoleById(token.sub);

      if (!existingUser && !userRole) return token;

      console.log({ 
        fatbitch: userRole
      }) // Assign the actual role name
      return token;
    },
    
  },
  pages: {
    signIn: '/auth/login', // Ensure this route exists
    signOut: '/auth/logout', // Ensure this route exists
    error: '/auth/error', // Ensure this route exists
  },
})

