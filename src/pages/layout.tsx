import { Providers } from '@/components/providers/providers'
import { Footer } from '@/components/Footer'
import { GetServerSidePropsContext } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { PublicEnvScript } from 'next-runtime-env';

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
         <PublicEnvScript />
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
