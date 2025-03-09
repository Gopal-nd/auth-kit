import NextAuth, {type DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserById } from "./data/user"
import { TwoFactorConfirmation, UserRole } from "@prisma/client"
import { getTowFactorConformationByUserId } from "./data/two-factor-confirmation"
import { getAccountByUserId } from "@/data/account"

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
  if(existingUser.isTwoFactorEnabled){
    const twoFactorConformation = await getTowFactorConformationByUserId(existingUser.id)
    if(!twoFactorConformation) return false

    await db.twoFactorConfirmation.delete({
      where:{id:twoFactorConformation.id}
    })
  }
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
    if(token.isTwoFactorEnabled && session.user){
      session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as Boolean
  }
  if(token.email&&session.user){
    session.user.email = token.email
  }
  if(token.name&&session.user){
    session.user.name = token.name
  }
  if(session.user){
    session.user.isOAuth = token.isOAuth as Boolean
  }
    // console.log(session)
    return session
},

async jwt({token}){
    if(!token.sub)  return token
    const existingUser = await getUserById(token.sub)
    if(!existingUser) return token
  const existingAcount = await getAccountByUserId(existingUser?.id)
    token.isOAuth = !!existingAcount
    token.name = existingUser?.name
    token.email = existingUser?.email
    token.role = existingUser?.role
    token.isTwoFactorEnabled = existingUser?.isTwoFactorEnabled
    // console.log(token)
    return token
}
  }
})