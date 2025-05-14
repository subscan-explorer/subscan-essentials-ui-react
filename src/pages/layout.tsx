import { Providers } from '@/components/providers/providers'
import { GetServerSidePropsContext } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function RootLayout({
  context,
  children,
  pageProps,
}: {
  context?: GetServerSidePropsContext
  children: React.ReactNode
  pageProps: AppProps
}) {
  return (
    <div id="app" className={`font-sans flex min-h-screen flex-col`}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover"></meta>
      </Head>
      <Providers>
        {children}
      </Providers>
    </div>
  )
}
