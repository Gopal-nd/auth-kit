import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import bcrypt from 'bcryptjs'
import { LoginSchema } from "@/Schema"
import { getUserByEmail } from "@/data/user";

 
export default { providers: [
    // Github({

    // }),
    Google({
        clientId:process.env.GOOGLE_ID!,
        clientSecret:process.env.GOOGLE_SECRET!
    }),
    Credentials({
        async authorize(credentials){
            const validatedFields = LoginSchema.safeParse(credentials);
            if(validatedFields.success){
                const {email,password} = validatedFields.data
                const user = await getUserByEmail(email)
                if(!user||!user.password) return null

                const passwordMatch = await bcrypt.compare(password,user.password)
                console.log("password matched ",passwordMatch)
                if(passwordMatch) return user;

            }
            return  null
        }
    })
] } satisfies NextAuthConfig


// this file is edge compatibility

// not support database