'use client'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import React, { useState, useTransition } from 'react'
import { useCurrentUser } from '@/hooks/use-current-user'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { settings } from '@/actions/settings'
import {
  Form,
  FormControl,
  FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField
} from '@/components/ui/form'
import { SettingSchema } from '@/Schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import FormError from '@/components/FormError'
import FormSuccess from '@/components/FormSucess'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const SettingsPage = () => {
  const user = useCurrentUser()
  console.log(user)
  const {update} = useSession()
    const [isPending, startTransition] = useTransition()
        const [error, setError] =useState<string|undefined>('')
        const [success, setSuccess]= useState<string|undefined>('')
    
         

      const form = useForm<z.infer<typeof SettingSchema>>({
            resolver:zodResolver(SettingSchema),
            defaultValues:{
                name:user?.name||undefined,
                email:user?.email ||undefined,
                password:undefined,
                newPassword:undefined,
                role:user?.role||undefined,
                isTwoFactorEnabled:!!user?.isTwoFactorEnabled
            }
        })
    
        const onSubmit = (value:z.infer<typeof SettingSchema>)=>{
            console.log(value)
            
           
            startTransition(()=>{
              settings(value).then((data)=>{
                if(data.error){
                  setError(data.error)
                }
                if(data.sucess){
                  setSuccess(data.sucess)
                  update()
                }
              }).catch(()=>setError('something went wrong'))
            })
        }

  return (
  <Card>
    <CardHeader className='w-[600px]'>
      <p className='text-2xl font-bold text-center'>Settings</p>
    </CardHeader>
    <CardContent>
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
                    {
                      user?.isOAuth ===false &&(
                        <>
                        
               
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
                        <FormField 
                    control={form.control}
                    name='newPassword'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
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
                             </>
                      )
                    }
                        <FormField 
                    control={form.control}
                    name='role'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                                <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value} >
                      <>
  <SelectTrigger >
    <SelectValue placeholder="Select Role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="ADMIN">ADMIN</SelectItem>
    <SelectItem value="USER">USER</SelectItem>
  
  </SelectContent>
                      </>          <FormControl>
                            </FormControl>
</Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    {
                      user?.isOAuth ===false &&(

                   
                   <FormField 
                    control={form.control}
                    name='isTwoFactorEnabled'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>2 FA Auth</FormLabel>
                            <FormControl>
                              <>
                            <Switch disabled={isPending}
                            checked={field.value} 
                            onCheckedChange={field.onChange}/>
                            
                            <Label htmlFor="airplane-mode">2FA</Label>
                            </>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                  )
                }
                </div>
                <FormError message={error}/>
                <FormSuccess message={success}/>
                    <Button type='submit' disabled={isPending} className='w-full'>
                        save
                    </Button>
                </form>
            </Form>
            </CardContent>
  </Card>
  )
}

export default SettingsPage