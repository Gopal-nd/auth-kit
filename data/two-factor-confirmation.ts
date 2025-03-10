import { db } from "@/lib/db"

export const  getTowFactorConformationByUserId = async(userId:string)=>{
try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
        where:{userId}
    })
    return twoFactorConfirmation
} catch (error) {
    return null
}
}