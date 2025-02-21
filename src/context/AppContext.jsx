import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createContext } from 'react'

const AppContext = createContext(null) // Create a context object

export const AppContextProvider = ({ children }) => {
  // Create client
  const queryClient = new QueryClient()
  const contextValue = {}
  return (
    <AppContext.Provider value={contextValue}>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </AppContext.Provider>
  )
}
