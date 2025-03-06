import NextAuth, {type DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"

//not working
 
// declare module '@auth/core' {
//     interface Session {
//         user:{
//             role?:string
//         } & DefaultSession['user']
//     }
// }


export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks:{

async signIn({user}){
  // const existingUser = await getUserById(user.id!)

  // if(!existingUser || !existingUser.emailVerified){
  //   return false
  // }
  return true
},

async session({token,session}){

    if(token.sub &&session.user){
        session.user.id = token.sub
    }
    if(token.role && session.user){
        session.user.role = token.role as UserRole
    }
    console.log(session)
    return session
},

async jwt({token}){
    if(!token.sub)  return token
    const existingUser = await getUserById(token.sub)
    token.role = existingUser?.role
    // console.log(token)
    return token
}
  }
})