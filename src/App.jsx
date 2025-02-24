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

function App() {
  return (
    <>
      <AppContextProvider>
        <BrowserRouter>
          <Logo />
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
