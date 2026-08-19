import React from 'react'
import { AdminSidebar } from './AdminSidebar'

export const Admin = () => {
  const handleClose = () => {

  }

  return (
    <div>
      <div className=' lg:flex justify-between'>
        <div>
          <AdminSidebar handleClose={handleClose} />
        </div>
        <div className=' lg:w-[80%]'>

        </div>
      </div>
    </div>
  )
}
