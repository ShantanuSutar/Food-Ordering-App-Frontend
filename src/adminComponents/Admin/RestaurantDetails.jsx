import { Edit, Instagram, Twitter } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CardHeader, Chip, Modal } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateRestaurantStatus } from '../../State/Restaurant/Action'
import { CreateRestaurantForm } from '../CreateRestaurantForm/CreateRestaurantForm'

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: { xs: 'calc(100% - 24px)', md: 'min(900px, calc(100% - 48px))' },
  maxHeight: '92vh', overflowY: 'auto', bgcolor: 'background.paper', borderRadius: 3, boxShadow: 24,
}

const Detail = ({ label, value }) => (
  <div className='grid gap-1 border-b border-white/5 py-3 sm:grid-cols-[150px_1fr]'>
    <dt className='text-sm text-gray-400'>{label}</dt>
    <dd className='break-words'>{value || 'Not provided'}</dd>
  </div>
)

export const RestaurantDetails = () => {
  const [editing, setEditing] = useState(false)
  const restaurantState = useSelector((store) => store.restaurant)
  const restaurant = restaurantState.usersRestaurant
  const dispatch = useDispatch()

  if (!restaurant) return null

  const address = restaurant.address || {}
  const contact = restaurant.contactInformation || {}

  const handleRestaurantStatus = () => {
    dispatch(updateRestaurantStatus({ restaurantId: restaurant.id, jwt: localStorage.getItem('jwt') }))
  }

  return (
    <div className='space-y-5'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <div className='flex flex-wrap items-center gap-3'>
            <h1 className='text-2xl font-bold'>{restaurant.name}</h1>
            <Chip color={restaurant.open ? 'success' : 'default'} label={restaurant.open ? 'Open' : 'Closed'} />
          </div>
          <p className='mt-1 text-gray-400'>{restaurant.cuisineType}</p>
        </div>
        <div className='flex gap-2'>
          <Button startIcon={<Edit />} variant='outlined' onClick={() => setEditing(true)}>Edit</Button>
          <Button
            color={restaurant.open ? 'error' : 'primary'} variant='contained'
            disabled={restaurantState.loading} onClick={handleRestaurantStatus}
          >
            {restaurant.open ? 'Close restaurant' : 'Open restaurant'}
          </Button>
        </div>
      </div>

      {restaurant.images?.length > 0 && (
        <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
          {restaurant.images.slice(0, 4).map((image) => (
            <img key={image} src={image} alt={restaurant.name} className='h-36 w-full rounded-xl object-cover' />
          ))}
        </div>
      )}

      <div className='grid gap-5 xl:grid-cols-2'>
        <Card>
          <CardHeader title='Restaurant' />
          <CardContent className='!pt-0'>
            <dl>
              <Detail label='Owner' value={restaurant.owner?.fullName} />
              <Detail label='Description' value={restaurant.description} />
              <Detail label='Cuisine' value={restaurant.cuisineType} />
              <Detail label='Opening hours' value={restaurant.openingHours} />
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title='Address' />
          <CardContent className='!pt-0'>
            <dl>
              <Detail label='Street' value={address.streetAddress} />
              <Detail label='City' value={address.city} />
              <Detail label='State' value={address.state} />
              <Detail label='Postal code' value={address.postalCode} />
              <Detail label='Country' value={address.country} />
            </dl>
          </CardContent>
        </Card>

        <Card className='xl:col-span-2'>
          <CardHeader title='Contact' />
          <CardContent className='!pt-0'>
            <dl>
              <Detail label='Email' value={contact.email} />
              <Detail label='Mobile' value={contact.mobile} />
            </dl>
            <div className='mt-4 flex gap-2'>
              {contact.instagram && <Button component='a' href={contact.instagram} target='_blank' rel='noreferrer' startIcon={<Instagram />}>Instagram</Button>}
              {contact.twitter && <Button component='a' href={contact.twitter} target='_blank' rel='noreferrer' startIcon={<Twitter />}>Twitter/X</Button>}
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal open={editing} onClose={() => setEditing(false)} aria-labelledby='edit-restaurant-title'>
        <Box sx={modalStyle}>
          <CreateRestaurantForm restaurant={restaurant} onSaved={() => setEditing(false)} />
        </Box>
      </Modal>
    </div>
  )
}
