import { useMemo, useState } from 'react'
import { Box, Button, Card, Divider, Modal } from '@mui/material'
import AddLocationAlt from '@mui/icons-material/AddLocationAlt'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createOrder } from '../../State/Order/Action'
import { updateAddress } from '../../State/Authentication/Action'
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
  const itemTotal = cartItems.reduce((total, item) => {
    const lineTotal = item.totalPrice != null
      ? Number(item.totalPrice)
      : Number(item.food?.price || 0) * Number(item.quantity || 0)
    return total + (Number.isFinite(lineTotal) ? lineTotal : 0)
  }, 0)

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
        deliveryAddress: address.id != null ? { id: address.id } : canonicalAddress(address),
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

    if (editingAddress?.id) {
      const updatedAddress = await dispatch(updateAddress({
        addressId: editingAddress.id,
        address,
        jwt: localStorage.getItem('jwt'),
      }))
      if (updatedAddress) {
        closeAddressModal()
        await createOrderUsingSelectedAddress(updatedAddress)
      }
      setSubmitting(false)
      return
    }

    const result = await dispatch(createOrder({
      jwt: localStorage.getItem('jwt'),
      isNewAddress: true,
      order: { restaurantId, deliveryAddress: address },
    }))
    if (result) closeAddressModal()
    setSubmitting(false)
  }

  if (cartIsEmpty) {
    return (
      <main className='page-shell flex min-h-[76vh] items-center justify-center py-12'>
        <Card className='flex w-full max-w-lg flex-col items-center gap-5 rounded-xl p-8 text-center sm:p-12'>
          <span className='flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/10 text-orange-400'><ShoppingCartOutlinedIcon sx={{ fontSize: '3rem' }} /></span>
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
      <main className='page-shell py-8 sm:py-12'>
        <div className='mb-8'>
          <p className='eyebrow'>Checkout</p>
          <h1 className='!mb-0 !mt-2 !text-3xl !font-bold'>Review and deliver</h1>
        </div>
        <div className='grid min-w-0 gap-8 lg:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.35fr)] lg:items-start'>
        <section className='min-w-0 space-y-5 lg:sticky lg:top-24'>
          <Card className='overflow-hidden rounded-xl'>
            <div className='border-b border-slate-400/15 px-5 py-4'><h2 className='!m-0 !text-lg !font-bold'>Your order</h2><p className='mt-1 text-sm text-slate-400'>{cartItems.length} item types</p></div>
            <div className='divide-y divide-slate-400/15'>{cartItems.map((item) => <CartItem key={item.id} item={item} />)}</div>
          </Card>

          <Card className='rounded-xl p-5 text-sm'>
            <h2 className='!mb-5 !text-lg !font-bold'>Bill details</h2>
            <div className='space-y-3 text-slate-400'>
              <div className='flex justify-between'><p>Item Total</p><p>₹{itemTotal}</p></div>
              <div className='flex justify-between'><p>Additional charges</p><p>₹0</p></div>
              <Divider />
              <div className='flex justify-between text-lg font-bold text-white'><p>Total pay</p><p className='text-orange-400'>₹{itemTotal}</p></div>
            </div>
          </Card>
        </section>

        <section className='min-w-0'>
          <div className='w-full'>
            <div className='mb-6'><h2 className='!mb-1 !text-2xl !font-bold'>Delivery address</h2><p className='text-sm text-slate-400'>Choose where you would like this order delivered.</p></div>
            {cartIsInvalid && (
              <p className='mb-5 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-center text-red-300'>
                This cart is missing restaurant information and cannot be checked out.
              </p>
            )}

            {savedAddresses.length === 0 && (
              <div className='empty-state mb-6 p-6 text-center'>
                No saved delivery addresses yet. Add one to continue checkout.
              </div>
            )}

            <div className='grid gap-5 sm:grid-cols-2'>
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

              <Card className='flex min-h-56 w-full gap-4 rounded-xl !border-dashed p-5 transition-colors hover:border-orange-400/60'>
                <AddLocationAlt color='primary' />
                <div className='flex flex-1 flex-col gap-3 text-gray-400'>
                  <h2 className='text-lg font-semibold text-white'>Add New Address</h2>
                  <p className='flex-1 text-sm leading-6'>Enter a new delivery address. It will be saved after your order is created.</p>
                  <Button variant='outlined' fullWidth disabled={cartIsInvalid || checkoutLoading} onClick={openNewAddressModal}>Add address</Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
        </div>
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
