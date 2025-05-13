// app/providers.tsx

import { HeroUIProvider } from '@heroui/react';
import { DataProvider } from '../context/DataContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </HeroUIProvider>
  );
}
