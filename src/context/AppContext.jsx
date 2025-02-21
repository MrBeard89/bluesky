import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createContext, useState } from 'react'

export const AppContext = createContext(null) // Create a context object

export const AppContextProvider = ({ children }) => {
  // States
  const [active, setActive] = useState('home')
  // Create client
  const queryClient = new QueryClient()

  // Handle functions
  const handleActiveNavbar = (nav) => {
    setActive(nav)
  }

  const contextValue = { active, handleActiveNavbar }
  return (
    <AppContext.Provider value={contextValue}>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </AppContext.Provider>
  )
}
