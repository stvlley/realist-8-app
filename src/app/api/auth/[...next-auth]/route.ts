
import NextAuth from 'next-auth'
import LinkedIn from 'next-auth/providers/linkedin'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import Github from 'next-auth/providers/github'







 
export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
  providers: [
    Google, LinkedIn, Facebook, Github

  ],
})

// export async function GET() {
//   const headersList = await headers()
//   const referer = headersList.get('referer')

//   const providers: Record<string, { clientId: string; clientSecret: string }> = {
//     Google: {
//       clientId: process.env.AUTH_GOOGLE_ID!,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET!,
//     },
//     LinkedIn: {
//       clientId: process.env.AUTH_LINKEDIN_ID!,
//       clientSecret: process.env.AUTH_LINKEDIN_SECRET!,
//     },
//     Github: {
//       clientId: process.env.AUTH_GITHUB_ID!,
//       clientSecret: process.env.AUTH_GITHUB_SECRET!,
//     },
//     Facebook: {
//       clientId: process.env.AUTH_FACEBOOK_ID!,
//       clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
//     }
//   }

//   // looop trhough providers ans d display as json
//   const providersList = Object.keys(providers).map((provider) => {
//     return {
//       name: provider,
//       clientId: providers[provider].clientId,
//     }
//   })

  
 
//   return new Response(JSON.stringify(providersList), {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
// }