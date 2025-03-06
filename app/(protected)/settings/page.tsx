import { auth, signOut } from '@/auth'
import React from 'react'

const SettingsPage = async() => {
    const session = await auth()

  return (
    <div>SettingsPage :- {JSON.stringify(session)}
    <p>{session?.expires}</p>
    <p>{session?.user?.role}</p>
    <form action={async()=>{
        "use server"
        await signOut()
    }}>
    <button type='submit' className='p-2 bg-blue-400'>logout</button>
    </form></div>
  )
}

export default SettingsPage