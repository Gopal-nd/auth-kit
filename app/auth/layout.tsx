import React from 'react'

const Authlayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  bg-blue-800">
    {children}
</div>

  )
}

export default Authlayout