import { CircleCheckBig } from "lucide-react"

interface FormErrorProps {
    message?:string
}

import React from 'react'

const FormSuccess = ({message}:FormErrorProps) => {

    if(!message) return null

  return (
    <div className="bg-green-500 flex items-center p-2 gap-x-2 text-sm ">
      <CircleCheckBig /> {message}
    </div>
  )
}

export default FormSuccess