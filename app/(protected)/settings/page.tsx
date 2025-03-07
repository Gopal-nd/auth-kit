'use client'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useCurrentUser } from '@/hooks/use-current-user'

const SettingsPage = async() => {
    const session = useSession()
      const user = useCurrentUser()
    const onClick = ()=>{
      signOut();
    }

  return (
    <div className=''>SettingsPage :- {JSON.stringify(user)}
  <button onClick={onClick}> signout</button>
  </div>
  )
}

export default SettingsPage