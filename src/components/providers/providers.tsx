// app/providers.tsx

import { DataProvider } from '@/context'
import { HeroUIProvider, ToastProvider } from '@heroui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider
        toastProps={{
          radius: 'full',
          variant: 'flat',
          timeout: 3000,
        }}
        placement={'top-center'}
      />
      <DataProvider>{children}</DataProvider>
    </HeroUIProvider>
  )
}
