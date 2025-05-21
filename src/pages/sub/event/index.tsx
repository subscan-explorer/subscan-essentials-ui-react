import React from 'react'
import { EventTable } from '@/components/event'
import { Container, PageContent } from '@/ui'

export default function Page() {
  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          <div className="">Substrate Events</div>
          <EventTable></EventTable>
        </div>
      </Container>
    </PageContent>
  )
}
