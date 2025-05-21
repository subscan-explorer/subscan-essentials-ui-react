import React from 'react'
import { ExtrinsicTable } from '@/components/extrinsic'
import { Container, PageContent } from '@/ui'

export default function Page() {
  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          <div className="">Substrate Extrinsics</div>
          <ExtrinsicTable></ExtrinsicTable>
        </div>
      </Container>
    </PageContent>
  )
}
