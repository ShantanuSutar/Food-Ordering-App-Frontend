import React, { useEffect } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { Route, Routes } from 'react-router-dom'
import { RestaurantDashboard } from '../Dashboard/Dashboard'
import { Orders } from '../Orders/Orders'
import { Menu } from '../Menu/Menu'
import { FoodCategory } from '../FoodCategory/FoodCategory'
import { Ingredients } from '../Ingredients/Ingredients'
import { Events } from '../Events/Events'
import { RestaurantDetails } from './RestaurantDetails'
import { CreateMenuForm } from '../Menu/CreateMenuForm'
import { useDispatch } from 'react-redux'
import { getRestaurantById, getRestaurantsCategory } from '../../State/Restaurant/Action'
import { getMenuItemsByRestaurantId } from '../../State/Menu/Action'
import { fetchRestaurantsOrder } from '../../State/Restaurant Order/Action'

export const Admin = () => {
  
  const {restaurant} = useSelector(store => store)
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")

  const handleClose = () => {

  }

  useEffect(() => {
    dispatch(getRestaurantsCategory({jwt, restaurantId: restaurant.usersRestaurant?.id}))
    dispatch(fetchRestaurantsOrder({jwt, restaurantId: restaurant.usersRestaurant?.id}))
    // dispatch(getMenuItemsByRestaurantId())
    // dispatch(getRestaurantById())
  }, [])

  return (
    <div>
      <div className=' lg:flex justify-between'>
        <div>
          <AdminSidebar handleClose={handleClose} />
        </div>
        <div className=' lg:w-[80%]'>
          <Routes>
            <Route path='/' element={<RestaurantDashboard/>} />
            <Route path='/orders' element={<Orders/>} />
            <Route path='/menu' element={<Menu/>} />
            <Route path='/category' element={<FoodCategory/>} />
            <Route path='/menu' element={<Menu/>} />
            <Route path='/ingredients' element={<Ingredients/>} />
            <Route path='/event' element={<Events/>} />
            <Route path='/details' element={<RestaurantDetails/>} />
            <Route path='/add-menu' element={<CreateMenuForm/>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
