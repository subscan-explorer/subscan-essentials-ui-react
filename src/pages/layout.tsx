import { Providers } from '@/components/providers/providers'
import { Footer } from '@/components/Footer'
import { GetServerSidePropsContext } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useData } from '@/context'

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  const { metadata } = useData()

  return (
    <div className={`${metadata?.networkNode} flex flex-col min-h-screen`}>
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  context?: GetServerSidePropsContext
  children: React.ReactNode
  pageProps: AppProps
}) {
  return (
    <div id="app" className={`font-sans flex min-h-screen flex-col`}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover"></meta>
        <script src="/__ENV.js" />
      </Head>
      <Providers>
        <MainContainer>{children}</MainContainer>
      </Providers>
    </div>
  )
}