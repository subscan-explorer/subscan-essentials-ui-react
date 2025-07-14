import React from 'react'
import { AccountTable } from '@/components/pvmAccount'
import { Container, PageContent } from '@/ui'

export default function Page() {
  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          <div className="">Smart Contract Accounts</div>
          <AccountTable></AccountTable>
        </div>
      </Container>
    </PageContent>
  )
}
