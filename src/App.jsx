import { useEffect } from 'react'
import './App.css'
import { ThemeProvider } from '@emotion/react'
import { darkTheme } from './components/Theme/DarkTheme'
import { CssBaseline } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './State/Authentication/Action'
import { findCart } from './State/Cart/Action'
import { Toaster } from 'react-hot-toast';
import { Routers } from './routers/Routers'
import { getRestaurantByUserId } from './State/Restaurant/Action'

function App() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);

  useEffect(() => {
    const token = auth?.jwt || jwt;
    if (token) {
      dispatch(getUser(token));
      dispatch(findCart(token));
    }
  }, [auth?.jwt, dispatch, jwt]);

  useEffect(() => {
    const token = auth?.jwt || jwt;
    if (token && auth?.user?.role === "ROLE_RESTAURANT_OWNER") {
      dispatch(getRestaurantByUserId(token));
    }
  }, [auth?.jwt, auth?.user?.role, dispatch, jwt])

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={10}
          containerStyle={{ zIndex: 20000 }}
          toastOptions={{
            duration: 3200,
            style: {
              background: '#17131c',
              color: '#f8f7fa',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '14px',
              boxShadow: '0 16px 45px rgba(0,0,0,0.38)',
              padding: '12px 16px',
            },
            success: { iconTheme: { primary: '#ec407a', secondary: '#17131c' } },
            error: { iconTheme: { primary: '#ff6b6b', secondary: '#17131c' } },
          }}
        />
        <Routers/>
      </ThemeProvider>
    </>
  )
}

export default App
