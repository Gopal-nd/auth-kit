'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useServerUser } from '@/hooks/use-server-user'
import React from 'react'
import AdminGate from '../_components/AdminGate'
import FormSuccess from '@/components/FormSucess'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { admin } from '@/actions/admin'

const Admin = () => {
    const user =  useCurrentUser()
    const MakeCall =()=>{
        fetch('/api/admin').then((res)=>{
            if(res.ok){
                toast.success('allowed API route')
            }else{
                toast.error('Forbidden API route')

            }
        })
    }
    const MakeServerActionCall =async ()=>{
        const res = await admin()
        if(res.success){
            toast.success(res.success)
        }else(
            toast.error(res.error)
        )
    }


  return (
    <Card className='w-[600px]'>
        <CardHeader>
            <p className='text-2xl font-semibold text-center'>
                Admin
            </p>
        </CardHeader>
        <CardContent>
        <AdminGate role={user?.role!} >
            <FormSuccess message='You can Acces the content'/>
        </AdminGate>
        <div className='space-y-2 mt-10'>
                <div className='flex justify-between items-center'>
                    <p>
                       Admin-Only API
                    </p>
                    <Button onClick={MakeCall}>
                        Test
                    </Button>
                </div>
                <div className='flex justify-between items-center'>
                    <p>
                     Admin-Only Server Action 
                    </p>
                    <Button onClick={MakeServerActionCall}>
                        Test
                    </Button>
                </div>
            </div>
        </CardContent>

    </Card>
  )
}

export default Admin