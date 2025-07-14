import React from 'react'
import { ExtrinsicTable } from '@/components/extrinsic'
import { TxTable } from '@/components/tx'
import { Container, PageContent } from '@/ui'

export default function Page() {
  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          <div className="">Smart Contract Transactions</div>
          <TxTable></TxTable>
        </div>
      </Container>
    </PageContent>
  )
}
