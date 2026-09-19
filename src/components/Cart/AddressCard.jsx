import React from 'react'
import Cart from './Cart'
import { Button, Card } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

const AddressCard = ({item, showButton, handleSelectAddress}) => {
  
  return (
    <Card className=' flex gap-5 w-64 p-5'>
         <HomeIcon/>
         <div className=' space-y-3 text-gray-500'>
          <h2 className=' font-semibold text-lg text-white'>Home</h2>
          <p>
            {`${item.streetAddress}, ${item.city}, ${item.state}, ${item.postalCode || item.pincode}, ${item.country}`}
          </p>
          {showButton && (<Button variant='outlined' fullWidth onClick={() => handleSelectAddress(item)}>Select</Button>)}
         </div>
    </Card>
  )
}

export default AddressCard