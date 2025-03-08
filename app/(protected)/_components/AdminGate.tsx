import FormError from '@/components/FormError'
import { UserRole } from '@prisma/client'
import React from 'react'

interface AdminGateProps {
    children:React.ReactNode,
    role:UserRole
}

const AdminGate = ({children,role}:AdminGateProps) => {
    if(role =='USER'){
        return (
            <FormError message='You do not have Permition to view this'/>
        )
    }

    
  return (
    <div>
        {children}
    </div>
  )
}

export default AdminGate