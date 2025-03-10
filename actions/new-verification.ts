'use server'

import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db"

export const newVerification = async (token:string)=>{
    const existingToken = await getVerificationTokenByToken(token)

    if(!existingToken){
        return {error:"Token doest not exist!"}
    }

    const hasExpired = new Date(existingToken.expires) <new Date();
    if(hasExpired){
        return {error:"Token Expied"}
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if(!existingUser){
        return {error:"Email does not existing"}
    }

    await db.user.update({
        where:{id:existingUser.id},
        data:{
            email:existingUser.email,
            emailVerified:new Date()
        }
    })

    await db.verificatioToken.delete({
        where:{id:existingToken.id}
    })

    return {success:"Email verified successfully"}
}