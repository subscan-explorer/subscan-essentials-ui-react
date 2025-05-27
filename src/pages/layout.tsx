import { Providers } from '@/components/providers/providers'
import { Footer } from '@/components/Footer'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function RootLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode
  pageProps: AppProps
}) {
  return (
    <div id="app" className={`font-sans flex min-h-screen flex-col`}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover"></meta>
      </Head>
      <Providers>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </Providers>
    </div>
  )
}
