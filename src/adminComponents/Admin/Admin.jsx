import { Menu as MenuIcon } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import { getIngredientsOfRestaurant, getIngredientCategory } from '../../State/Ingredients/Action'
import { getMenuItemsByRestaurantId } from '../../State/Menu/Action'
import { fetchRestaurantsOrder } from '../../State/Restaurant Order/Action'
import { getRestaurantsCategory } from '../../State/Restaurant/Action'
import { RestaurantDashboard } from '../Dashboard/Dashboard'
import { FoodCategory } from '../FoodCategory/FoodCategory'
import { Ingredients } from '../Ingredients/Ingredients'
import { CreateMenuForm } from '../Menu/CreateMenuForm'
import { Menu } from '../Menu/Menu'
import { Orders } from '../Orders/Orders'
import { AdminSidebar } from './AdminSidebar'
import { RestaurantDetails } from './RestaurantDetails'

export const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dispatch = useDispatch()
  const restaurant = useSelector((store) => store.restaurant.usersRestaurant)
  const jwt = localStorage.getItem('jwt')
  const restaurantId = restaurant?.id

  useEffect(() => {
    if (!jwt || !restaurantId) return

    dispatch(getRestaurantsCategory({ jwt, restaurantId }))
    dispatch(fetchRestaurantsOrder({ jwt, restaurantId }))
    dispatch(getMenuItemsByRestaurantId({
      jwt,
      restaurantId,
      vegetarian: false,
      nonveg: false,
      seasonal: false,
      foodCategory: '',
    }))
    dispatch(getIngredientsOfRestaurant({ jwt, id: restaurantId }))
    dispatch(getIngredientCategory({ jwt, id: restaurantId }))
  }, [dispatch, jwt, restaurantId])

  return (
    <div className='min-h-screen min-w-0 bg-[#0f0d12]'>
      <AdminSidebar open={sidebarOpen} handleClose={() => setSidebarOpen(false)} />

      <header className='sticky top-0 z-[1050] flex min-h-16 items-center gap-3 border-b border-white/10 bg-[#17131c]/95 px-4 backdrop-blur lg:ml-[260px] lg:px-8'>
        <IconButton
          className='lg:!hidden'
          aria-label='Open owner navigation'
          onClick={() => setSidebarOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <div className='min-w-0'>
          <p className='truncate text-lg font-semibold'>{restaurant?.name}</p>
          <p className='text-xs text-gray-400'>Restaurant owner portal</p>
        </div>
      </header>

      <main className='min-w-0 p-3 sm:p-5 lg:ml-[260px] lg:p-8'>
        <Routes>
          <Route index element={<RestaurantDashboard />} />
          <Route path='orders' element={<Orders />} />
          <Route path='menu' element={<Menu />} />
          <Route path='category' element={<FoodCategory />} />
          <Route path='ingredients' element={<Ingredients />} />
          <Route path='details' element={<RestaurantDetails />} />
          <Route path='add-menu' element={<CreateMenuForm />} />
          <Route path='menu/:foodId/edit' element={<CreateMenuForm />} />
          <Route path='*' element={<Navigate to='/admin/restaurant' replace />} />
        </Routes>
      </main>
    </div>
  )
}
