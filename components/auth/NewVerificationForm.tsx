'use client'

import {BeatLoader} from 'react-spinners'
import { useSearchParams } from "next/navigation"

import CardWrapper from "./CardWrapper"
import { useCallback, useEffect, useState } from 'react'
import { newVerification } from '@/actions/new-verification'
import FormSuccess from '../FormSucess'
import FormError from '../FormError'

const NewVerificationForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
const [error, setError] = useState<string|undefined>('')
const [success, setSuccess] = useState<string|undefined>('')

    const onSubmit = useCallback(()=>{

      if(success || error) return
      
      if(!token){
        setError('token required')
        return
      }

      newVerification(token)
      .then((data)=>{
        setSuccess(data.success)
        setError(data.error)
      }).catch((data)=>{
        setError("Something went wrong")
      })
    },[token])

    useEffect(()=>{
      onSubmit()
    },[onSubmit])

  return (
    <CardWrapper 
    headerLabel="Conforming your Verification"
    backButtonHref="/auth/login"
    backButtonLabel="back to login"
    >
       {!success && !error&&( <div className=" flex items-center w-full justify-center">
        <BeatLoader/>
        </div>)
        }
        <FormSuccess message={success}/>
        <FormError message={error} />
    </CardWrapper>
  )
}

export default NewVerificationForm