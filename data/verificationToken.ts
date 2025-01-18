import { db } from "@/../src/lib/db";
import { verificationTokens } from "@/lib/db/schema/verificationTokens";
import { eq } from "drizzle-orm";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const result = await db.select().from(verificationTokens).where(eq(verificationTokens.email, email));
        const token = result[0];
        return token;
    } catch {
        return null;
    }
}




export const getVerificationTokenByToken = async (token: string) => {
    try {
        const result = await db.select()
            .from(verificationTokens)
            .where(eq(verificationTokens.token, token));

        const verificationToken = result[0];
        return verificationToken;

    } catch {
        return null;
    }
};