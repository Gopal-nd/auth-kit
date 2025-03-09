import { UserRole } from '@prisma/client'
import * as z from 'zod'

export const LoginSchema = z.object({
    email:z.string().email({
        message:"Email is required"
    }),
    password:z.string().min(1,{
        message:"password is required"
    }),
    code:z.optional(z.string()),
})

export const ResetSchema = z.object({
    email:z.string().email({
        message:"Email is required"
    })
})
export const RegisterSchema = z.object({
    email:z.string().email({
        message:"Email is required"
    }),
    password:z.string().min(6,{
        message:"Min 6 Charecter required"
    }),
    name:z.string().min(2,{
        message:"Name should be min of 2 charecters"
    })
})

export const NewPasswordSchema = z.object({
    password:z.string().min(6,{
        message:"Min 6 Charecter required"
    }),

})




export const SettingSchema = z.object({
   name:z.optional(z.string()),
   isTwoFactorEnabled:z.optional(z.boolean()),
   role:z.enum([UserRole.ADMIN,UserRole.USER]),
   email:z.optional(z.string().email()),
   password:z.optional(z.string().min(6)),
   newPassword:z.optional(z.string().min(6))
}).refine((data)=>{
    if(data.password&&!data.newPassword){
        return false
    }
    if(!data.password&&data.newPassword){
        return false
    }
    return true
},{message:'new Password and Old Password required',path:['newPassword']})