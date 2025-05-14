// app/providers.tsx

import { DataProvider } from '@/context';
import { HeroUIProvider } from '@heroui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </HeroUIProvider>
  );
}
