import { DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession['user'] & {role:"ADMIN"|"USER"} & {isTwoFactorEnabled:Boolean}


declare module 'next-auth' {
    interface Session {
        user:ExtendedUser
    }
}


// -----------------JWT-------------------------------

import {JWT} from '@auth/core/jwt'
import { UserRole } from "@prisma/client"

declare module 'next-auth/jwt' {
    interface JWT {
        role?:"ADMIN"|"USER"
    }
}