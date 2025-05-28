import React, { createContext, useContext, ReactNode } from 'react'
import { useMetadata, useToken, unwrap, metadataType, tokenType, APIWrapperProps } from '../utils/api'
import { env } from 'next-runtime-env'

interface DataContextType {
  metadata: metadataType | null
  token: tokenType | null
  isLoading: boolean
  isError: boolean
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const { data: metadataData, error: metadataError } = useMetadata(NEXT_PUBLIC_API_HOST, {})
  const { data: tokenData, error: tokenError } = useToken(NEXT_PUBLIC_API_HOST, {})

  const metadata = unwrap(metadataData)
  const token = unwrap(tokenData)

  const isLoading = !metadataData || !tokenData
  const isError = !!metadataError || !!tokenError

  const value = {
    metadata,
    token,
    isLoading,
    isError,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData(): DataContextType {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
