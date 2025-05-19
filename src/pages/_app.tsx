import '@/styles/globals.css'

import BigNumber from 'bignumber.js'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement } from 'react'
import { SWRConfig } from 'swr'

import { HydrationProvider } from '@/components/HydrationProvider'

import { HeroUIProvider } from '@heroui/react'
import {type NextRouter} from "next/router";
import { Navbar } from '@/components/navbar'
import RootLayout from '@/pages/layout'
import { Footer } from '@/components/Footer'


// This config is required for number formatting
// https://mikemcl.github.io/bignumber.js/#toS
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
  ROUNDING_MODE: 1,
})

const SWRDefaultConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement
  getPage?: (page: ReactElement, pageProps: any) => ReactElement
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  return (
    <HeroUIProvider>
      <HydrationProvider>
        <SWRConfig value={SWRDefaultConfig}>
          <RootLayout pageProps={pageProps}>
            <Navbar value={''}></Navbar>
            <Component {...pageProps} />
            {/* <Footer /> */}
          </RootLayout>
        </SWRConfig>
      </HydrationProvider>
    </HeroUIProvider>
  )
}

export default MyApp
