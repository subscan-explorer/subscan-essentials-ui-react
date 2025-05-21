import React from 'react'
import { Container, PageContent } from '@/ui'
import { Erc721TokenTable } from '@/components/erc721Token'

export default function Page() {
  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          <div className="">ERC-721 Token</div>
          <Erc721TokenTable args={{
            category: 'erc721',
          }}></Erc721TokenTable>
        </div>
      </Container>
    </PageContent>
  )
}
