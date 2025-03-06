import { Route, BrowserRouter, Routes } from 'react-router'
import './styles/App.scss'

//Component imports
import { NotFound } from './pages/NotFound/NotFound'
import { Home } from './pages/Home/Home'
import { Settings } from './pages/Settings/Settings'
import { Cities } from './pages/Cities/Cities'
import { AppContextProvider } from './context/AppContext'
import { Navbar } from './components/Navbar/Navbar'
import { Logo } from './components/Logo/Logo'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect, useState } from 'react'

function App() {
  const [localLang, setLocalLang] = useState(localStorage.getItem('local_lang') || 'hu')
  const [localUnit, setLocalUnit] = useState(localStorage.getItem('local_unit') || 'metric')

  // Create client
  const queryClient = new QueryClient()

  //Toggle functions for localStorage
  const toggleLang = () => {
    localLang === 'hu' ? setLocalLang('en') : setLocalLang('hu')
  }
  const toggleUnit = () => {
    localUnit === 'metric' ? setLocalUnit('imperial') : setLocalUnit('metric')
  }

  //UseEffects for local variables
  useEffect(() => {
    localStorage.setItem('local_lang', localLang)
  }, [localLang])

  useEffect(() => {
    localStorage.setItem('local_unit', localUnit)
  }, [localUnit])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <AppContextProvider>
          <BrowserRouter>
            <Logo />
            <Navbar />
            <Routes>
              <Route
                path='/bluesky/'
                element={<Home localLang={localLang} localUnit={localUnit} />}
              />
              <Route
                path='/bluesky/home'
                element={<Home localLang={localLang} localUnit={localUnit} />}
              />
              <Route
                path='/bluesky/cities'
                element={<Cities localLang={localLang} localUnit={localUnit} />}
              />
              <Route
                path='/bluesky/settings'
                element={
                  <Settings
                    localLang={localLang}
                    localUnit={localUnit}
                    toggleLang={toggleLang}
                    toggleUnit={toggleUnit}
                  />
                }
              />
              <Route path='/bluesky/*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
