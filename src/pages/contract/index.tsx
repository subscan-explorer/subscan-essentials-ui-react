import React from 'react'
import { Container, PageContent } from '@/ui'
import { ContractTable } from '@/components/contract'

export default function Page() {
  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          <div className="">Smart Contract Contracts</div>
          <ContractTable></ContractTable>
        </div>
      </Container>
    </PageContent>
  )
}
