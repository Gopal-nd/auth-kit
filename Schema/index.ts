import * as z from 'zod'

export const LoginSchema = z.object({
    email:z.string().email({
        message:"Email is required"
    }),
    password:z.string().min(1,{
        message:"password is required"
    })
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


