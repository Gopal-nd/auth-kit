'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTransition } from 'react'

import CardWrapper from './CardWrapper'
import {
    Form,
    FormControl,
    FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../FormError'
import FormSuccess from '../FormSucess'
import { login } from '@/actions/login'
import { NewPasswordSchema, ResetSchema } from '@/Schema'
import { newPassword } from '@/actions/new-password'
import { useSearchParams } from 'next/navigation'

const NewPasswordForm = () => {
       const searchParams = useSearchParams();
       const token = searchParams.get('token')
    
    const [isPending, startTransition] = useTransition()
    const [error, setError] =useState<string|undefined>('')
    const [success, setSuccess]= useState<string|undefined>('')

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver:zodResolver(NewPasswordSchema),
        defaultValues:{
            password:""
        }
    })

    const onSubmit =async (value:z.infer<typeof NewPasswordSchema>)=>{
        console.log(value)
        let result
       startTransition(async()=>{
        setError('')
        setSuccess('')
            try {
                
                result = await newPassword(value, token)
                
                console.log(result)
                
                if(result?.success){
                    setSuccess(result?.success)
                }
                else if(result?.error){
                   setError(result?.error) 
                }
                
            } catch (error) {
                console.log("error is catched",error);
                if(error){

                    setError(String(error))
                }
                
            }
       }) 
    }
    return (
        <CardWrapper
            headerLabel='Reset Password'
            backButtonLabel="Back to login"
            backButtonHref='/auth/login'
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
                >
                <div className="space-y-4">
                    <FormField 
                    control={form.control}
                    name='password'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                disabled={isPending}
                                placeholder='************'
                                type='password'
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                
                </div>
                <FormError message={error}/>
                <FormSuccess message={success}/>
                    <Button type='submit' disabled={isPending} className='w-full'>
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}


export default NewPasswordForm