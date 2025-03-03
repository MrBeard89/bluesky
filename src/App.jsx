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

function App() {
  // Create client
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <AppContextProvider>
          <BrowserRouter>
            <Logo />
            <Navbar />
            <Routes>
              <Route path='/bluesky/' element={<Home />} />
              <Route path='/bluesky/home' element={<Home />} />
              <Route path='/bluesky/cities' element={<Cities />} />
              <Route path='/bluesky/settings' element={<Settings />} />
              <Route path='/bluesky/*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
