import { Button } from '@mui/material'
import React from 'react'

export const RestaurantDetails = () => {
  const handleRestaurantStatus = () => {
    
  }
  return (
    <div className=' lg:px-20 px-5'>
      <div className=' py-5 flex justify-center items-center gap-5'>
        <h1 className=' text-2xl lg:w-7xl text-center font-black p-5'>Indian Fast Food</h1>
        <div>
          <Button color={true ? "primary" : "error"} className=' py-[1rem] px-[2rem]' variant='contained' onClick={handleRestaurantStatus} size='large'>
            {true ? "close" : "open"}
          </Button>
        </div>
      </div>
    </div>
  )
}
