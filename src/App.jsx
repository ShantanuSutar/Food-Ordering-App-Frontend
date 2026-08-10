import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { ThemeProvider } from '@emotion/react'
import { darkTheme } from './components/Theme/DarkTheme'
import { Navbar } from './components/Navbar/Navbar'
import { CssBaseline } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Navbar />
      </ThemeProvider>
    </>
  )
}

export default App
