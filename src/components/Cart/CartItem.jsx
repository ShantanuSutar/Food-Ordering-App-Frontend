import React from 'react'
import {Chip, IconButton} from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const CartItem = () => {
  return (
    <div className=' px-5'>
        <div className=' lg:flex items-center lg:space-x-5'>
            <div>
                <img className=' w-[5rem] h-[5rem] object-cover' src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg" alt="" />
            </div>
            <div className=' flex items-center justify-between lg:w-[70%]'>
                <div className=' space-y-1 lg:space-y-3 w-full'>
                    <p>Biryani</p>
                    <div className=' flex justify-between items-center'>
                        <div className=' flex items-center space-x-1'>
                            <IconButton>
                                <RemoveCircleIcon />
                            </IconButton>
                            <div className=' w-5 h-5 text-xs flex items-center justify-center'>
                                {5}
                            </div>
                            <IconButton>
                                <AddCircleIcon/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <p>₹1956</p>
            </div>
        </div>
        <div className=' pt-3 space-x-2'>
            {[1,1,1].map((item, i) => <Chip key={i} label={"bread"} />)}
        </div>
    </div>
  )
}

export default CartItem