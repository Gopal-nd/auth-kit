'use client'

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

const Social = () => {
  return (
    <div className="flex items-center flex-col mt-10 justify-center w-full gap-2">
        <Button 
        size={'lg'}
        className="w-full"
        variant={'outline'}
        onClick={async ()=>{
          await signIn('google',{
            callbackUrl:DEFAULT_LOGIN_REDIRECT
          })
        }}
        >
            <FcGoogle className="h-5 w-5"/>
        </Button>
    <Button 
        size={'lg'}
        className="w-full"
        variant={'outline'}
        onClick={async()=>{
          await signIn('google',{
            callbackUrl:DEFAULT_LOGIN_REDIRECT
          })
        }}
        >
            <FaGithub className="h-5 w-5"/>
        </Button>
    </div>
  )
}

export default Social 