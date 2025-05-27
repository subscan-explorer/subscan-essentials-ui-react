import React from 'react'

import { BareServerSideProps } from '@/types/page'
import { Container, PageContent } from '@/ui'
import { NetworkInfo } from '@/components/NetworkInfo'
import { useData } from '@/context'
import HomePage from '@/components/home/HomePage'
import { Spinner } from '@heroui/react'

export default function Page() {
  const { metadata, token, isLoading } = useData();

  return (
    <PageContent>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
          <Spinner size="lg" />
        </div>
      ) : (
        <Container className="">
          <div className="">
            {/* <NetworkInfo /> */}
            <HomePage />
          </div>
        </Container>
      )}
    </PageContent>
  )
}
