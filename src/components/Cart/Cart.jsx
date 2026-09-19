import { useMemo, useState } from 'react'
import { Box, Button, Card, Divider, Modal } from '@mui/material'
import AddLocationAlt from '@mui/icons-material/AddLocationAlt'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createOrder } from '../../State/Order/Action'
import { addressKey, canonicalAddress, isAddressComplete } from '../util/address'
import { notifyError, notifySuccess } from '../util/toast'
import AddressCard from './AddressCard'
import CartItem from './CartItem'
import { addressModalStyle } from './modalStyle'
import AddressForm from '../Address/AddressForm'
import { addressInitialValues } from '../Address/addressFormConfig'

const addressIdentifier = (address) => address.id ?? addressKey(address)

const Cart = () => {
  const [open, setOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const { auth, cart, order } = useSelector((store) => store)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cartItems = cart.cartItems || []
  const savedAddresses = auth.user?.addresses || []
  const restaurantId = cartItems[0]?.food?.restaurant?.id
  const cartIsEmpty = cartItems.length === 0
  const cartIsInvalid = !cartIsEmpty && (
    !restaurantId || cartItems.some((item) => item.food?.restaurant?.id !== restaurantId)
  )
  const checkoutLoading = cart.loading || order.loading
  const itemTotal = Number(cart.cart?.total ?? cartItems.reduce(
    (total, item) => total + Number(item.totalPrice || 0),
    0
  ))

  const initialValues = useMemo(
    () => addressInitialValues(editingAddress, auth.user?.fullName),
    [auth.user?.fullName, editingAddress],
  )

  const closeAddressModal = () => {
    setOpen(false)
    setEditingAddress(null)
  }

  const openNewAddressModal = () => {
    setEditingAddress(null)
    setOpen(true)
  }

  const openAddressRepair = (address) => {
    setSelectedAddressId(addressIdentifier(address))
    setEditingAddress(address)
    setOpen(true)
  }

  const validateCheckout = (address) => {
    if (cartIsEmpty) {
      notifyError(null, 'Your cart is empty', 'checkout-validation')
      return false
    }
    if (!restaurantId) {
      notifyError(null, 'Cart restaurant information is unavailable', 'checkout-validation')
      return false
    }
    if (cartIsInvalid) {
      notifyError(null, 'Cart items must belong to one restaurant', 'checkout-validation')
      return false
    }
    if (!localStorage.getItem('jwt')) {
      notifyError(null, 'Please sign in to continue checkout', 'checkout-validation')
      return false
    }
    if (!isAddressComplete(address)) {
      notifyError(null, 'Please provide a complete delivery address', 'checkout-validation')
      return false
    }
    return true
  }

  const createOrderUsingSelectedAddress = (address) => {
    setSelectedAddressId(addressIdentifier(address))
    if (!validateCheckout(address)) return Promise.resolve(null)

    return dispatch(createOrder({
      jwt: localStorage.getItem('jwt'),
      isNewAddress: false,
      order: {
        restaurantId,
        deliveryAddress: canonicalAddress(address),
      },
    }))
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const address = canonicalAddress({ ...values, id: editingAddress?.id })
    if (!validateCheckout(address)) {
      setSubmitting(false)
      return
    }

    const duplicate = savedAddresses.find((savedAddress) =>
      savedAddress.id !== editingAddress?.id &&
      addressKey(savedAddress) === addressKey(address)
    )
    if (duplicate) {
      notifySuccess('Using saved address', 'address-duplicate')
      closeAddressModal()
      await createOrderUsingSelectedAddress(duplicate)
      setSubmitting(false)
      return
    }

    const result = await dispatch(createOrder({
      jwt: localStorage.getItem('jwt'),
      isNewAddress: !editingAddress?.id,
      isUpdatedAddress: Boolean(editingAddress?.id),
      order: { restaurantId, deliveryAddress: address },
    }))
    if (result) closeAddressModal()
    setSubmitting(false)
  }

  if (cartIsEmpty) {
    return (
      <main className='flex min-h-[75vh] items-center justify-center px-5'>
        <Card className='flex w-full max-w-md flex-col items-center gap-5 rounded-2xl p-8 text-center'>
          <ShoppingCartOutlinedIcon sx={{ fontSize: '4rem', color: 'text.secondary' }} />
          <div>
            <h1 className='text-2xl font-semibold'>Your cart is empty</h1>
            <p className='mt-2 text-gray-400'>Add a meal before choosing a delivery address.</p>
          </div>
          <Button variant='contained' onClick={() => navigate('/')}>Browse restaurants</Button>
        </Card>
      </main>
    )
  }

  return (
    <>
      <main className='lg:flex lg:justify-between'>
        <section className='space-y-6 pt-10 lg:min-h-screen lg:w-[34%]'>
          {cartItems.map((item) => <CartItem key={item.id} item={item} />)}
          <Divider />

          <div className='px-5 text-sm'>
            <p className='py-5 font-extralight'>Bill Details</p>
            <div className='space-y-3 text-gray-400'>
              <div className='flex justify-between'><p>Item Total</p><p>₹{itemTotal}</p></div>
              <div className='flex justify-between'><p>Delivery Fee</p><p>₹21</p></div>
              <div className='flex justify-between'><p>GST and Restaurant Charges</p><p>₹33</p></div>
              <Divider />
              <div className='flex justify-between font-medium text-white'><p>Total Pay</p><p>₹{itemTotal + 54}</p></div>
            </div>
          </div>
        </section>

        <Divider orientation='vertical' flexItem />
        <section className='flex justify-center px-4 pb-10 sm:px-6 lg:w-[66%]'>
          <div className='w-full max-w-4xl'>
            <h1 className='py-10 text-center text-2xl font-semibold'>Choose Delivery Address</h1>
            {cartIsInvalid && (
              <p className='mb-5 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-center text-red-300'>
                This cart is missing restaurant information and cannot be checked out.
              </p>
            )}

            {savedAddresses.length === 0 && (
              <div className='mb-6 rounded-2xl border border-dashed border-white/20 p-6 text-center text-gray-400'>
                No saved delivery addresses yet. Add one to continue checkout.
              </div>
            )}

            <div className='flex flex-wrap justify-center gap-5'>
              {savedAddresses.map((address) => (
                <AddressCard
                  key={address.id ?? addressKey(address)}
                  item={address}
                  selected={selectedAddressId === addressIdentifier(address)}
                  checkoutDisabled={cartIsInvalid || checkoutLoading}
                  onSelect={(item) => setSelectedAddressId(addressIdentifier(item))}
                  onDeliver={createOrderUsingSelectedAddress}
                  onEdit={openAddressRepair}
                />
              ))}

              <Card className='flex min-h-56 w-full gap-4 rounded-2xl border border-dashed border-white/20 p-5 transition-colors hover:border-pink-400/60 sm:w-72'>
                <AddLocationAlt color='secondary' />
                <div className='flex flex-1 flex-col gap-3 text-gray-400'>
                  <h2 className='text-lg font-semibold text-white'>Add New Address</h2>
                  <p className='flex-1 text-sm leading-6'>Enter a new delivery address. It will be saved after your order is created.</p>
                  <Button variant='outlined' fullWidth disabled={cartIsInvalid || checkoutLoading} onClick={openNewAddressModal}>Add address</Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Modal open={open} onClose={closeAddressModal} aria-labelledby='add-address-title'>
        <Box sx={{ ...addressModalStyle, width: { xs: 'calc(100% - 32px)', sm: 460 }, maxHeight: '90vh', overflowY: 'auto' }}>
          <h2 id='add-address-title' className='mb-5 text-xl font-semibold'>
            {editingAddress ? 'Complete delivery address' : 'Add delivery address'}
          </h2>
          <AddressForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            submitLabel='Continue to payment'
            loading={checkoutLoading}
          />
        </Box>
      </Modal>
    </>
  )
}

export default Cart
