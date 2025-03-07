import React from 'react'

const SettingsPageLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex items-center justify-between w-[100%] h-[100%] bg-blue-300'>
        {children}
    </div>
  )
}

export default SettingsPageLayout