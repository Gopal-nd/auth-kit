import React from 'react'

const Header = ({label}:{label:string}) => {
  return (
    <div className='flex items-center justify-center gap-y-4 flex-col'>
        <h1 className='text-3xl font-semibold'>
            Auth
        </h1>
        <p className='text-muted-foreground text-sm'>
            {label}
        </p>
    </div>
  )
}

export default Header