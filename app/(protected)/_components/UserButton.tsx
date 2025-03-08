'use client'
import React from 'react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useCurrentUser } from '@/hooks/use-current-user'
import { signOut } from 'next-auth/react'

const UserButton = () => {
    const user = useCurrentUser()
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>

        <Avatar>
      <AvatarImage src={user?.image??''} alt={user?.name?? 'user'} />
      <AvatarFallback>{user?.name?.slice(0,1)||'N'}</AvatarFallback>
    </Avatar>
        </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Button variant={'link'} onClick={()=>{signOut()}}>
            Sign Out
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  
  )
}

export default UserButton