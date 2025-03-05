'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTransition } from 'react'

import CardWrapper from './CardWrapper'
import { RegisterSchema } from '@/Schema'


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
import { Register } from '@/actions/register'

const RegisterForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] =useState<string|undefined>('')
    const [success, setSuccess]= useState<string|undefined>('')

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver:zodResolver(RegisterSchema),
        defaultValues:{
            email:"",
            password:"",
            name:''
        }
    })

    const onSubmit =async (value:z.infer<typeof RegisterSchema>)=>{
        console.log(value)
        let result
       startTransition(async()=>{
        setError('')
        setSuccess('')
            try {
                
                result = await Register(value)
                
                console.log(result)
                if(result.success){
                    setSuccess(result.success)
                }else{
                   setError(result.error) 
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
            headerLabel='Wecome Back'
            backButtonLabel="Have a Account"
            backButtonHref='/auth/login'
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
                >
                <div className="space-y-4">
                         <FormField 
                    control={form.control}
                    name='name'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                disabled={isPending}
                                placeholder='name'
                                type='name'
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField 
                    control={form.control}
                    name='email'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                disabled={isPending}
                                placeholder='email@gmail.com'
                                type='email'
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                       <FormField 
                    control={form.control}
                    name='password'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input 
                                disabled={isPending}
                                {...field}
                                placeholder='******'
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
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default RegisterForm