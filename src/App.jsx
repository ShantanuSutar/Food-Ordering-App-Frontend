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
import { getUser } from './components/State/Authentication/Action'

function App() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector(store => store);

  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt))
  }, [auth.jwt])

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar />
        {/* <Home/> */}
        {/* <RestaurantDetails/> */}
        {/* <Cart/> */}
        {/* <Profile/> */}
        <CustomerRoute />
      </ThemeProvider>
    </>
  )
}

export default App
