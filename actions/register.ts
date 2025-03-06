'use server'

import * as z from 'zod'

import bcrypt from 'bcryptjs'


import { RegisterSchema } from '@/Schema'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/token'
import { sendVerificationEmail } from '@/lib/mail'

export const Register = async(value:z.infer<typeof RegisterSchema>) =>{
console.log(value)
const validatedFields = RegisterSchema.safeParse(value)
console.log(validatedFields)

if(!validatedFields.success){
    return {error: "Invalid credentail"}
}

const {data:{email,name,password}} = validatedFields

const ExistingUser =await getUserByEmail(email)

const hashPassword = await bcrypt.hash(password,10)


if(ExistingUser) return {error:'User already Exist'}

await db.user.create({
    data:{
        name,
        email,
        password:hashPassword
    }
})

const userVerificationToken = await generateVerificationToken(email)

await sendVerificationEmail(
    userVerificationToken.email,
    userVerificationToken.token
)

return {success:"Conformation Email sent"}

}


async function wait(delay:number) {
    return new Promise<Object>((resolve, reject)=>{
        setTimeout(() => {
            resolve(new Date())
        }, delay * 1000);
    })
}