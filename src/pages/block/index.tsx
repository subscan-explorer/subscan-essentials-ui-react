import React from 'react'
import { PVMBlockTable } from '@/components/pvmBlock'
import { Container, PageContent } from '@/ui'

export default function Page() {
  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          <div className="">PVM Blocks</div>
          <PVMBlockTable></PVMBlockTable>
        </div>
      </Container>
    </PageContent>
  )
}
