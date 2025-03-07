'use server'

import { signOut } from "@/auth"

export const logout = async()=>{
    // do server work

    await signOut()
}