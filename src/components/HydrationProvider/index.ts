// https://github.com/traviswimer/react-hydration-provider
import createHydration, { useComponentHydrated } from './createHydration'

const { HydrationContext, HydrationProvider, useHydrated, Server, Client } = createHydration()

export { HydrationContext, HydrationProvider, useHydrated, Server, Client, createHydration, useComponentHydrated }
