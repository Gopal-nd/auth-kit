'use server'

import * as z from 'zod'

import { LoginSchema } from '@/Schema'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'

export const login = async(value:z.infer<typeof LoginSchema>) =>{
console.log(value)
const validatedFields = LoginSchema.safeParse(value)
console.log(validatedFields)

if(!validatedFields.success){
    return {error: "Invalid credentail"}
}

const {email, password} = validatedFields.data

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