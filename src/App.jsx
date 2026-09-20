import { useEffect } from 'react'
import './App.css'
import { ThemeProvider } from '@emotion/react'
import { darkTheme, designTokens } from './components/Theme/DarkTheme'
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
              background: designTokens.surfaceSecondary,
              color: designTokens.text,
              border: `1px solid ${designTokens.border}`,
              borderRadius: '10px',
              boxShadow: '0 16px 40px rgba(2,6,23,0.35)',
              padding: '12px 16px',
            },
            success: { iconTheme: { primary: designTokens.success, secondary: designTokens.surfaceSecondary } },
            error: { iconTheme: { primary: designTokens.error, secondary: designTokens.surfaceSecondary } },
          }}
        />
        <Routers/>
      </ThemeProvider>
    </>
  )
}

export default App
