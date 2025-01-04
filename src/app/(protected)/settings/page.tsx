

import React from 'react'
import { auth, signOut } from '@/../auth';




const SettingsPage = async () => {

  const session = await auth();
  if (!session) return <div>Not authenticated</div>
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form action={async () => {
      "use server";
      await signOut();
      }}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}

export default SettingsPage