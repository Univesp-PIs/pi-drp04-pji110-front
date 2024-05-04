'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
// import { ReactQueryDevtools } from 'react-query/types/devtools'

export const queryClient = new QueryClient()

export default function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer />
      </QueryClientProvider>
      {/* <ReactQueryDevtools /> */}
    </>
  )
}
