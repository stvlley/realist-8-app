import { v4 as uuidv4 } from 'uuid';
import { getVerificationTokenByEmail } from '../../data/verificationToken';
import { db } from './db';
import { verificationTokens } from './db/schema/verificationTokens';
import { eq } from 'drizzle-orm';


export const generateVerificationToken = async (email: string) => {

    const token = uuidv4();
    //  1 hour
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        // delete the existing token by email
        await db.delete(verificationTokens).where(eq(verificationTokens.email, existingToken.email));
    }

    const verificationToken = await db.insert(verificationTokens).values({
        id: uuidv4(),
        token,
        email,
        createdAt: new Date(),
        expiresAt
    });

    return verificationToken;
}