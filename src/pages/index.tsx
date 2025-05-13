import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

import { BareServerSideProps } from '@/types/page'
import { Container, PageContent } from '@/ui'
import { NetworkInfo } from '@/components/NetworkInfo'
import { useData } from '@/context'

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
      <Container className="flex-1">
        <div className="py-6">
          <h1 className="text-2xl font-bold mb-4">Subscan Essentials</h1>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <NetworkInfo />
          )}
        </div>
      </Container>
    </PageContent>
  )
}
