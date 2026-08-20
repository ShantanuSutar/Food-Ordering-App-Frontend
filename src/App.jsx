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
import { Routers } from './routers/Routers'
import { getRestaurantByUserId } from './State/Restaurant/Action'

function App() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector(store => store);

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


  return (
    <>
      <ThemeProvider theme={darkTheme}>
        {/* <CssBaseline />
        <Navbar /> */}
        {/* <Home/> */}
        {/* <RestaurantDetails/> */}
        {/* <Cart/> */}
        {/* <Profile/> */}
        {/* <CustomerRoute /> */}
        <Routers/>
      </ThemeProvider>
    </>
  )
}

export default App
