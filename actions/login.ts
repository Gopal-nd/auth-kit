'use server'

import * as z from 'zod'

import { LoginSchema } from '@/Schema'

export const login = async(value:z.infer<typeof LoginSchema>) =>{
console.log(value)
const validatedFields = LoginSchema.safeParse(value)
console.log(validatedFields)

if(!validatedFields.success){
    return {error: "Invalid credentail"}
}

try {
    const time = await wait(1)
    return {status:'success',time,message:"form has sumbited"}
} catch (error) {
    console.log(error)
    return {status:'error',error,message:"this is form catch side"}
}



}


async function wait(delay:number) {
    return new Promise<Object>((resolve, reject)=>{
        setTimeout(() => {
            resolve(new Date())
        }, delay * 1000);
    })
}