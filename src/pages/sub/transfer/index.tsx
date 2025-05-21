import React from 'react'
import { TransferTable } from '@/components/transfer'
import { Container, PageContent } from '@/ui'

export default function Page() {
  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          <div className="">Substrate Transfers</div>
          <TransferTable></TransferTable>
        </div>
      </Container>
    </PageContent>
  )
}
