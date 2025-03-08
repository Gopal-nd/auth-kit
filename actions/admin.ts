'use server'

import { useServerUser } from "@/hooks/use-server-user"


export const admin = async()=>{
    const user = await useServerUser()
    if(user?.role =='ADMIN'){
        return {success:"Allowed"}
    }
    return {error:'Forbidden'}
}