import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import UserButton from './UserButton'

const Navbar = () => {
  return (
    <div className='flex justify-between gap-6 items-center p-4'>
        <div className='flex gap-2'>
        <Button>
            <Link href={'/client'}>Client</Link>
        </Button>
        <Button>
            <Link href={'/server'}>Server</Link>
        </Button>
        <Button>
            <Link href={'/admin'}>Admin</Link>
        </Button>
        <Button>
            <Link href={'/settings'}>Settings</Link>
        </Button>
        </div>

        <div>
            <UserButton/>
        </div>
    </div>
  )
}

export default Navbar