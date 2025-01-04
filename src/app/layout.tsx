
import { db } from '@/lib/db';
import './globals.css'
import {  users } from '@/lib/db/schema/users';

export default async function RootLayout({
  children
}: {
  children:
  React.ReactNode
}) {

  

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );


}