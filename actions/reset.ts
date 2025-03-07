'use server'

import { getUserByEmail } from '@/data/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/token'
import { ResetSchema } from '@/Schema'
import * as z from 'zod'



export const reset = async(email:z.infer<typeof ResetSchema>)=>{

    const validatedFields = ResetSchema.safeParse(email)

    if(!validatedFields){
        return {error:"Invalid email"}
    }


    const userEmail  = validatedFields.data?.email
    if(!userEmail){
        return {error:"email not found"}
    }

    const existingUser =  await getUserByEmail(userEmail)

    if(!existingUser){
        return {error:"email not found"}
    }

    const passwordResetToken = await generatePasswordResetToken(userEmail)
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    )

    return {success:'Reset email sent'}
}