// /Users/stvlley/Desktop/realist-8-app/auth.ts

import NextAuth, { type DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import LinkedInProvider from "next-auth/providers/linkedin"
import FacebookProvider from "next-auth/providers/facebook"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db" // Adjust the path based on your project structure
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import { getUserByEmail, getUserById } from "./data/user"
import bcrypt from "bcryptjs"
import { getUserRoleById } from "./data/role"





type ExtendedUser = DefaultSession["user"] & {
  role: string
  customField: string
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
    accessToken?: string // Add accessToken to Session
  }

  interface JWT {
    role?: string
    accessToken?: string // Add accessToken to JWT
  }
}

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
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.AUTH_LINKEDIN_ID!,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET!,
      // Optionally, customize scope or other options
      // authorization: { params: { scope: 'r_liteprofile r_emailaddress' } },
    }),
    FacebookProvider({
      clientId: process.env.AUTH_FACEBOOK_ID!,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
    }),
    

  ],
  callbacks: {

    async signIn({user}) {
      const existingUser = await getUserById(user.id as string);

      // if ( !existingUser || !existingUser.emailVerified) {
      //   // alert user to verify email
      //   return false;
      // }

      return true
    },
   
    async session({ session, token }) {

      console.log({
        sessionToken: token
      })
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as string;
        // session.user.customField = "This is a custom field";
      }

      return session
    },
    async jwt({ token, user }) {

      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      const userRole = await getUserRoleById(token.sub);
      if (user && userRole) {
        token.role = userRole; // Assuming user has a 'role' property
      } else {
        token.role = "agent"; // Default
      }
      

      
      

      if (!existingUser && !userRole) return token;

      
      return token;
    },
    
  }
})

