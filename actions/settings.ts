'use server'

import { getUserByEmail, getUserById } from '@/data/user'
import { useServerUser } from '@/hooks/use-server-user'
import { db } from '@/lib/db'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/token'
import { SettingSchema } from '@/Schema'
import bcrypt from 'bcryptjs'
import {z}  from 'zod'

export const settings = async(value:z.infer<typeof SettingSchema>)=>{
const user =await useServerUser()

if(!user){
    return {error:"Unauthorized!"}
}
const dbUser = await getUserById(user.id!)

if(!dbUser){
    return {error:"Unauthorized!"}
}
if(user.isOAuth){
    value.email= undefined;
    value.password=undefined;
    value.newPassword=undefined;
    value.isTwoFactorEnabled=undefined
    
}

if(value.email && value.email!==user.email){
    const existingUser = await getUserByEmail(value.email)
    if(existingUser && existingUser.id!==user.id){
        return{error:"Email Alredy in Use"}
    }
    const verificationToken = await generateVerificationToken(value?.email!)
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )
    
    return {success:"Verification Email sent"}
}

if(value.password && value.newPassword && dbUser.password){
    const passwordMatch = await bcrypt.compare(value.password,dbUser.password)
    if(!passwordMatch){
        return {error:"Incorrect Password"}
    }
    
    const hashPassword = await bcrypt.hash(value.newPassword,10)
    value.password = hashPassword
    value.newPassword = undefined
}


await db.user.update({
    where:{id:dbUser.id},
    data:{
        ...value
    }
})


return {sucess:"Settings Updated"}
}