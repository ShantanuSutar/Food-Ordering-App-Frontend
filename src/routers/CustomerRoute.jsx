import React from 'react'
import {Navbar} from "../components/Navbar/Navbar"
import { Route, Routes } from 'react-router-dom'
import Events from '../components/Profile/Events'
import Profile from '../components/Profile/Profile'
import { Home } from '../components/Home/Home'
import RestaurantDetails from '../components/Restaurant/RestaurantDetails'
import Cart from '../components/Cart/Cart'
import Auth from '../components/Auth/Auth'
import { PaymentSuccess } from '../components/PaymentSuccess/PaymentSuccess'
const CustomerRoute = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/account/:register' element={<Home />} />
            <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/my-profile/*' element={<Profile />} />
            <Route path='/payment/success/:id' element={<PaymentSuccess />} />
        </Routes>
        <Auth />
    </div>
  )
}

export default CustomerRoute