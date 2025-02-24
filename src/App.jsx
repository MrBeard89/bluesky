import { Route, BrowserRouter, Routes } from 'react-router'
import './styles/App.scss'

//Component imports
import { NotFound } from './pages/NotFound/NotFound'
import { Home } from './pages/Home/Home'
import { Settings } from './pages/Settings/Settings'
import { Cities } from './pages/Cities/Cities'
import { AppContextProvider } from './context/AppContext'
import { Navbar } from './components/Navbar/Navbar'
import { useState } from 'react'

function App() {
  // const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

  // const toggleTheme = () => {
  //   theme === 'light' ? setTheme('dark') : setTheme('light')
  // }

  // useEffect(() => {
  //   localStorage.setItem('theme', theme)
  // }, [theme])

  return (
    <>
      <AppContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/cities' element={<Cities />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </>
  )
}

export default App
