import React from 'react'
import { BlockTable } from '@/components/block'
import { Container, PageContent } from '@/ui'

export default function Page() {

  return (
    <PageContent>
      <Container>
        <div className='flex flex-col gap-4'>
          <div className="">Substrate Blocks</div>
          <BlockTable></BlockTable>
        </div>
      </Container>
    </PageContent>
  )
}
