import React from 'react'
import CardWrapper from './CardWrapper'
import {Wrench} from 'lucide-react'

const ErrorCard = () => {
  return (
    <CardWrapper headerLabel='Oops! someThing Went Wrong'
    backButtonHref='/auth/login'
    backButtonLabel='Back to login'
    >
        <div>
        <Wrench className='text-destructive' />
        </div>
    </CardWrapper>
  )
}

export default ErrorCard