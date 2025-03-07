'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import CardWrapper from './CardWrapper'
import { LoginSchema } from '@/Schema'


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
import Link from 'next/link'

const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get('error') === "OAuthAccountNotLinked"? "Email alredy in use with different provider" :''
    const [isPending, startTransition] = useTransition()
    const [error, setError] =useState<string|undefined>('')
    const [success, setSuccess]= useState<string|undefined>('')
    const [showTwoFactor, setShowTwoFactor] = useState(false)

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })

    const onSubmit =async (value:z.infer<typeof LoginSchema>)=>{
        console.log(value)
        let result
       startTransition(async()=>{
        setError('')
        setSuccess('')
            try {
                
                result = await login(value)
                
                console.log(result)

                if(result?.twoFactor){
                    setShowTwoFactor(true)
                }
                
                if(result?.success){
                    form.reset();
                    setSuccess(result?.success)
                }
                else if(result?.error){
                    form.reset()
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
            headerLabel='Wecome Back'
            backButtonLabel="Don't Have a Account"
            backButtonHref='/auth/register'
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
                >
                <div className="space-y-4">
                    {
                        showTwoFactor &&(
                            <FormField 
                            control={form.control}
                            name='code'
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Two Factor Code</FormLabel>
                                    <FormControl>
                                        <Input 
                                        {...field}
                                        disabled={isPending}
                                        placeholder='123933'
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                        )
                    }
                {!showTwoFactor && (<>

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
                            <Button size={'sm'}
                            variant={'link'}
                            asChild
                            className='px-0 font-normal'>
                                <Link href='/auth/reset'>Forgot password?</Link>
                            </Button>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                </>)
                }
                </div>
                <FormError message={error||urlError}/>
                <FormSuccess message={success}/>
                    <Button type='submit' disabled={isPending} className='w-full'>
                      { !showTwoFactor? "Login" :"Confirm"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default LoginForm