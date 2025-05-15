import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { BareServerSideProps } from '@/types/page'
import { Container, PageContent } from '@/ui'
import { NetworkInfo } from '@/components/NetworkInfo'
import { useData } from '@/context'
import HomePage from '@/components/home/HomePage'
import { Spinner } from '@heroui/react'

export const getServerSideProps: GetServerSideProps<BareServerSideProps> = async (
  context
) => {
  return {
    props: {},
  }
}

export default function Page({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { metadata, token, isLoading } = useData();

  return (
    <PageContent>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
          <Spinner size="lg" />
        </div>
      ) : (
        <Container className="flex-1">
          <div className="">
            {/* <NetworkInfo /> */}
            <HomePage />
          </div>
        </Container>
      )}
    </PageContent>
  )
}
