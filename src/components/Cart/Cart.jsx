import { Button, Card, Divider } from '@mui/material'
import React from 'react'
import CartItem from './CartItem'
import AddressCard from './AddressCard';
import AddLocationAlt from '@mui/icons-material/AddLocationAlt'

const items = [1, 1];

const Cart = () => {

  const createOrderUsingSelectedAddress = () => {
    
  }

  const handleOpenAddressModal = () => {

  }

  return (
    <div className=''>
      <main className=' lg:flex justify-between'>
        <section className=' lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
          {items.map((item) => <CartItem />)}
          <Divider />

          <div className=' billDetails px-5 text-sm'>
            <p className=' font-extralight py-5'>Bill Details</p>
            <div className=' space-y-3'>
              <div className=' flex justify-between text-gray-400'>
                <p>Item Total</p>
                <p>₹599</p>
              </div>
              <div className=' flex justify-between text-gray-400'>
                <p>Delivery Fee</p>
                <p>₹21</p>
              </div>
              <div className=' flex justify-between text-gray-400'>
                <p>GST and Restaurant Charges</p>
                <p>₹33</p>
              </div>
              <Divider />
            </div>
            <div className=' flex justify-between text-gray-400'>
              <p>Total Pay</p>
              <p>₹3300</p>
            </div>
          </div>
        </section>
        <Divider orientation='vertical' flexItem />
        <section className=' lg:w-[70%] flex justify-center px-5 pb-10  lg:pb-0'>
          <div>
            <h1 className=' text-center font-semibold text-2xl py-10'>Choose Delivery Address</h1>
            <div className=' flex gap-5 flex-wrap justify-center'>
              {[1, 1, 1].map((item) => <AddressCard handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={true} />)}
                  <Card className=' flex gap-5 w-64 p-5'>
                    <AddLocationAlt/>
                    <div className=' space-y-3 text-gray-500'>
                      <h2 className=' font-semibold text-lg text-white'>Add New Address</h2>
                      <Button variant='outlined' fullWidth onClick={handleOpenAddressModal}>Add</Button>
                    </div>
                </Card>

            </div>
          </div>
        </section>
      </main>

    </div>
  )
}

export default Cart