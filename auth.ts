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
  pages:{
    signIn:'/auth/sign',
    error:'/auth/error'
  },
  events:{
    async linkAccount({user})  {
      await db.user.update({
        where:{id:user.id},
        data:{emailVerified:new Date()}
      })
    }
  },
  callbacks:{

async signIn({user,account}){
  // allow OAuth without email verificaion
  if(account?.provider!=='credentials') return true

  const existingUser = await getUserById(user.id!)

  if(!existingUser?.emailVerified) return false


  // TODO : add 2FA check
  console.log(user)
  return true
},

async session({token,session}){

    if(token.sub &&session.user){
        session.user.id = token.sub
    }
    if(token.role && session.user){
        session.user.role = token.role as UserRole
    }
    // console.log(session)
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