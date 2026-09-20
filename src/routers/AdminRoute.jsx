import { Alert, Button, CircularProgress } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Admin } from '../adminComponents/Admin/Admin'
import { CreateRestaurantForm } from '../adminComponents/CreateRestaurantForm/CreateRestaurantForm'
import { getRestaurantByUserId } from '../State/Restaurant/Action'

const CenteredState = ({ children }) => (
  <main className='flex min-h-screen items-center justify-center px-5'>{children}</main>
)

export const AdminRoute = () => {
  const dispatch = useDispatch()
  const auth = useSelector((store) => store.auth)
  const restaurant = useSelector((store) => store.restaurant)
  const jwt = auth.jwt || localStorage.getItem('jwt')

  if (!jwt) return <Navigate to='/account/login' replace />

  if (auth.isLoading || (!auth.user && !auth.error)) {
    return <CenteredState><CircularProgress aria-label='Loading account' /></CenteredState>
  }

  if (!auth.user || auth.user.role !== 'ROLE_RESTAURANT_OWNER') {
    return <Navigate to='/' replace />
  }

  if (!restaurant.ownerRestaurantLoaded) {
    return <CenteredState><CircularProgress aria-label='Loading restaurant' /></CenteredState>
  }

  if (restaurant.error?.status === 404) return <CreateRestaurantForm />

  if (restaurant.error && !restaurant.usersRestaurant) {
    return (
      <CenteredState>
        <Alert
          severity='error'
          action={<Button color='inherit' onClick={() => dispatch(getRestaurantByUserId(jwt))}>Retry</Button>}
        >
          {restaurant.error.message || 'Could not load your restaurant'}
        </Alert>
      </CenteredState>
    )
  }

  return restaurant.usersRestaurant ? <Admin /> : <CreateRestaurantForm />
}
