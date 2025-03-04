'use client'

import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonProps {
    children : React.ReactNode;
    mode?:'model'|"redirect";
    asChild?:boolean;
}

export const LoginButton = ({
    children,
    mode='redirect',
    asChild,
}:LoginButtonProps)=>{

    const router = useRouter()
    if(mode === 'model'){
        return(
            <p>Todo: Implemet the model</p>
        )
    }
    const onClick = () =>{
        console.log('Login button clicked')
        router.push('/auth/login')
    }
   return(
    <span onClick={onClick} className="cursor-pointer">
        {children}
    </span>
   ) 
}

