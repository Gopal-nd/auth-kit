'use server'

import * as z from 'zod'

import { LoginSchema } from '@/Schema'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { generateVerificationToken } from '@/lib/token'
import { db } from '@/lib/db'
import { sendVerificationEmail,sendTwoFactorTokenEmail } from '@/lib/mail'
import {generatTwoFactorToken,} from '@/lib/token'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { error } from 'console'
import { getTowFactorConformationByUserId } from '@/data/two-factor-confirmation'

export const login = async(value:z.infer<typeof LoginSchema>) =>{
console.log(value)
const validatedFields = LoginSchema.safeParse(value)
console.log(validatedFields)

if(!validatedFields.success){
    return {error: "Invalid credentail"}
}

const {email, password,code} = validatedFields.data

const existingUser = await db.user.findUnique({
    where:{email}
})
if(!existingUser ||!existingUser.email||!existingUser.password){
    return {error:"Email not Exist"}
}

if(!existingUser.emailVerified){

    const userVerificationToken = await generateVerificationToken(existingUser.email)
    await sendVerificationEmail(
        userVerificationToken.email,
        userVerificationToken.token
    )
    
    return {success:"Conformation Email sent"}
}

if(existingUser.isTwoFactorEnabled && existingUser.email){
    if(code){
        // verify code 
        const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

        if(!twoFactorToken){
            return {error:"Invalid code"}
        }

        if(twoFactorToken.token !== code){
            return {error :"Invalid code"}
        }

        const hasExpired = new Date(twoFactorToken.expires) <new Date()

        if(hasExpired){
            return {error:"code Expired!"}
        }

        await db.twoFactorToken.delete({
            where:{id:twoFactorToken.id}
        })
        const existingConformation = await getTowFactorConformationByUserId(existingUser.id)

        if(existingConformation){
            await db.twoFactorConfirmation.delete({
                where:{
                    id:existingConformation.id
                }
            })
        }

        await db.twoFactorConfirmation.create({
            data:{
                userId:existingUser.id
            }
        })
    }else{

        const twoFactorToken = await generatTwoFactorToken(existingUser.email)
        await sendTwoFactorTokenEmail(
            twoFactorToken.email,
            twoFactorToken.token
        )
        
        return {twoFactor:true}
    }
}
try {
    
    await signIn("credentials",{
        email,
        password,
        redirectTo:DEFAULT_LOGIN_REDIRECT
    })
} catch (error) {
    if(error instanceof AuthError){
        switch (error.type) {
            case 'CredentialsSignin':
                return {error: "invalid credetails provided"}
            default:
                return {error:"something went wrong"}
        }
    }
    throw error
}

}


async function wait(delay:number) {
    return new Promise<Object>((resolve, reject)=>{
        setTimeout(() => {
            resolve(new Date())
        }, delay * 1000);
    })
}