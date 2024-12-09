import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const clerkProvider = await ClerkProvider({ children: (
      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
  ) });

  return clerkProvider;
}