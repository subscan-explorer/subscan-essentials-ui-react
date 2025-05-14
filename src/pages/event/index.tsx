import React from 'react'
import { EventTable } from '@/components/event'

export default function Page() {

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className=''>Substrate Events</div>
      <EventTable></EventTable>
    </div>
  )
}
