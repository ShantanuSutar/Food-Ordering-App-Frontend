import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { ThemeProvider } from '@emotion/react'
import { darkTheme } from './components/Theme/DarkTheme'
import { Navbar } from './components/Navbar/Navbar'
import { CssBaseline } from '@mui/material'
import { Home } from './components/Home/Home'
import RestaurantDetails from './components/Restaurant/RestaurantDetails'
import Cart from './components/Cart/Cart'
import Profile from './components/Profile/Profile'
import CustomerRoute from './routers/CustomerRoute'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './State/Authentication/Action'
import { findCart } from './State/Cart/Action'
import { Toaster, toast } from 'react-hot-toast';
import { Routers } from './routers/Routers'
import { getRestaurantByUserId } from './State/Restaurant/Action'

function App() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, cart, restaurant, menu, order } = useSelector(store => store);

  useEffect(() => {
    const token = auth?.jwt || jwt;
    if (token) {
      dispatch(getUser(token));
      dispatch(findCart(token));
    }
  }, [auth?.jwt]);

  useEffect(() => {
    dispatch(getRestaurantByUserId(auth.jwt || jwt))
  }, [auth.user])

  useEffect(() => {
    if (auth?.error) toast.error(auth.error.toString());
    if (auth?.success) toast.success(auth.success.toString());
  }, [auth?.error, auth?.success]);

  useEffect(() => {
    if (cart?.error) toast.error(cart.error.toString());
    if (cart?.success) toast.success(cart.success.toString());
  }, [cart?.error, cart?.success]);

  useEffect(() => {
    if (menu?.error) toast.error(menu.error.toString());
    if (menu?.message) toast.success(menu.message.toString());
  }, [menu?.error, menu?.message]);

  useEffect(() => {
    if (restaurant?.error) toast.error(restaurant.error.toString());
  }, [restaurant?.error]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Toaster position="top-center" reverseOrder={false} />
        <Routers/>
      </ThemeProvider>
    </>
  )
}

export default App
