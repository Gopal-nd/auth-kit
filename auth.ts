import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/auth.config"
import { db } from "@/lib/db"
 

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks:{
async session({token,session}){
    console.log('session token',token)
    console.log('session ',session)

    if(session.user){

        session.user.customFile = token.customFile
        return session
    }
    return session
},

async jwt({token}){
    token.customFile = 'test'
    console.log(token)
    return token
}
  }
})