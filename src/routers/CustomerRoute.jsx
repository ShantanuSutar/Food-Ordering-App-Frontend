import {Navbar} from "../components/Navbar/Navbar"
import { Route, Routes } from 'react-router-dom'
import Profile from '../components/Profile/Profile'
import { Home } from '../components/Home/Home'
import RestaurantDetails from '../components/Restaurant/RestaurantDetails'
import Cart from '../components/Cart/Cart'
import Auth from '../components/Auth/Auth'
import { PaymentSuccess } from '../components/PaymentSuccess/PaymentSuccess'
import { PaymentFailed } from '../components/PaymentSuccess/PaymentFailed'
import { Search } from '../components/Search/Search'
const CustomerRoute = () => {
  return (
    <div className='min-h-svh w-full min-w-0'>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/account/:register' element={<Home />} />
            <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/my-profile/*' element={<Profile />} />
            <Route path='/payment/success/:id' element={<PaymentSuccess />} />
            <Route path='/payment/fail' element={<PaymentFailed />} />
            <Route path='/search' element={<Search />} />
        </Routes>
        <Auth />
    </div>
  )
}

export default CustomerRoute
