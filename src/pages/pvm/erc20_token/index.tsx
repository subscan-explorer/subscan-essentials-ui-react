import React from 'react'
import { Container, PageContent } from '@/ui'
import { Erc20TokenTable } from '@/components/erc20Token'

export default function Page() {
  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          <div className="">ERC-20 Token</div>
          <Erc20TokenTable args={{
            category: 'erc20',
          }}></Erc20TokenTable>
        </div>
      </Container>
    </PageContent>
  )
}
