import React from 'react'
import Navbar from './_components/Navbar'

const SettingsPageLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex items-center flex-col min-w-screen min-h-screen justify-ceter p-10 bg-blue-300'>
      <Navbar/>
        {children}
    </div>
  )
}

export default SettingsPageLayout