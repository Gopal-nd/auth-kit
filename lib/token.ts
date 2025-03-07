import { getVerificationTokenByEmail } from '@/data/verification-token'
import {v4 as uuidv4} from 'uuid' 
import crypto from 'crypto'
import { db } from './db'
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'

export const generatTwoFactorToken = async(email:string)=>{
    const token = crypto.randomInt(100_000,1_000_000).toString()

    // change on need
    const expires = new Date(new Date().getTime() +3600 *1000);

    const existingToken = await getTwoFactorTokenByEmail(email)

    if(existingToken){
        await db.twoFactorToken.delete({
            where:{
                id:existingToken.id
            }
        })
    }

    const twofactorToken = await db.twoFactorToken.create({
        data:{
            email,
            expires,
            token,
        }
    })

    return twofactorToken
}

export const generatePasswordResetToken = async (email:string)=>{
    const token = uuidv4()
    const expires = new Date(new Date().getTime()+3600*1000)

    const existingToken = await getPasswordResetTokenByEmail(email)
    if(existingToken){
        await db.passwordResetToken.delete({where:{id:existingToken.id}})
    }
    const newPasswordResetToken= await db.passwordResetToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    
    return newPasswordResetToken

}


export const generateVerificationToken = async (email:string)=>{
const token = uuidv4()
const expires = new Date(new Date().getTime()+3600*1000)
const existingToken = await getVerificationTokenByEmail(email)
if(existingToken){
    await db.verificatioToken.delete({where:{id:existingToken.id}})
}
const verificationToken = await db.verificatioToken.create({
    data:{
        email,
        token,
        expires
    }
})

return verificationToken

}


