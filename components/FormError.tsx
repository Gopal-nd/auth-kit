import {CircleX } from "lucide-react"

interface FormErrorProps {
    message?:string
}

import React from 'react'

const FormError = ({message}:FormErrorProps) => {

    if(!message) return null

  return (
    <div className="bg-destructive/15 flex items-center p-2 gap-x-2 text-sm ">
      <CircleX />  {message}
    </div>
  )
}

export default FormError