import { useEffect, useMemo, useState } from 'react'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  createAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from '../../State/Authentication/Action'
import AddressForm from '../Address/AddressForm'
import { addressInitialValues } from '../Address/addressFormConfig'
import AddressCard from '../Cart/AddressCard'
import { addressKey, canonicalAddress } from '../util/address'

const EMPTY_ADDRESSES = []

const Address = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [addressToDelete, setAddressToDelete] = useState(null)
  const dispatch = useDispatch()
  const user = useSelector((store) => store.auth.user)
  const addresses = user?.addresses ?? EMPTY_ADDRESSES
  const loading = useSelector((store) => store.auth.addressLoading)
  const error = useSelector((store) => store.auth.addressError)
  const jwt = localStorage.getItem('jwt')

  useEffect(() => {
    if (jwt) dispatch(getAddresses(jwt))
  }, [dispatch, jwt])

  const initialValues = useMemo(
    () => addressInitialValues(editingAddress, user?.fullName),
    [editingAddress, user?.fullName],
  )

  const openCreateForm = () => {
    setEditingAddress(null)
    setFormOpen(true)
  }

  const openEditForm = (address) => {
    setEditingAddress(address)
    setFormOpen(true)
  }

  const closeForm = () => {
    if (loading) return
    setFormOpen(false)
    setEditingAddress(null)
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const address = canonicalAddress(values)
    const result = editingAddress
      ? await dispatch(updateAddress({ addressId: editingAddress.id, address, jwt }))
      : await dispatch(createAddress({ address, jwt }))

    setSubmitting(false)
    if (result) closeForm()
  }

  const handleDelete = async () => {
    if (!addressToDelete) return
    const deleted = await dispatch(deleteAddress({ addressId: addressToDelete.id, jwt }))
    if (deleted) setAddressToDelete(null)
  }

  return (
    <section className='space-y-6'>
      <header className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='text-sm font-medium uppercase tracking-[0.18em] text-pink-400'>My profile</p>
          <h1 className='!m-0 !mt-2 !text-2xl !font-semibold sm:!text-3xl'>Saved addresses</h1>
        </div>
        <Button variant='contained' startIcon={<AddLocationAltIcon />} onClick={openCreateForm}>
          Add address
        </Button>
      </header>

      {error && (
        <div className='flex flex-col items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200 sm:flex-row sm:items-center sm:justify-between'>
          <p>{error}</p>
          <Button color='error' variant='outlined' onClick={() => dispatch(getAddresses(jwt))}>
            Try again
          </Button>
        </div>
      )}

      {loading && addresses.length === 0 ? (
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} variant='rounded' height={224} className='w-full' />
          ))}
        </div>
      ) : addresses.length === 0 ? (
        <Card className='flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/20 p-8 text-center'>
          <AddLocationAltIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />
          <div>
            <h2 className='!mb-2 !text-xl !font-semibold'>No saved addresses</h2>
            <p className='text-gray-400'>Add an address now so it is ready for your next checkout.</p>
          </div>
          <Button variant='outlined' onClick={openCreateForm}>Add address</Button>
        </Card>
      ) : (
        <div className='grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {addresses.map((address) => (
            <AddressCard
              key={address.id ?? addressKey(address)}
              item={address}
              onEdit={openEditForm}
              onDelete={setAddressToDelete}
            />
          ))}
        </div>
      )}

      <Dialog
        open={formOpen}
        onClose={closeForm}
        fullWidth
        maxWidth='sm'
        aria-labelledby='profile-address-form-title'
      >
        <DialogTitle id='profile-address-form-title'>
          {editingAddress ? 'Edit address' : 'Add address'}
        </DialogTitle>
        <DialogContent dividers>
          <AddressForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onCancel={closeForm}
            loading={loading}
            submitLabel={editingAddress ? 'Save changes' : 'Save address'}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(addressToDelete)}
        onClose={() => !loading && setAddressToDelete(null)}
        aria-labelledby='delete-address-title'
      >
        <DialogTitle id='delete-address-title'>Delete this address?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This removes the address from your address book. Previous order delivery details will be preserved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddressToDelete(null)} disabled={loading}>Cancel</Button>
          <Button color='error' variant='contained' onClick={handleDelete} disabled={loading}>
            {loading ? <CircularProgress size={20} color='inherit' /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  )
}

export default Address
