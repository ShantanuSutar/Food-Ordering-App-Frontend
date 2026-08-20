import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CreateRestaurantForm } from '../adminComponents/CreateRestaurantForm/CreateRestaurantForm'
import { Admin } from '../adminComponents/Admin/Admin'
import { useSelector } from 'react-redux'

export const AdminRoute = () => {

  const {restaurant} = useSelector(store => store)

  return (
    <div>
        <Routes>
            <Route path='/*' element={!restaurant.usersRestaurant ?<CreateRestaurantForm/> : <Admin/>} />
        </Routes>
    </div>
  )
}
