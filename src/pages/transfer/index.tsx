import React from 'react'
import { TransferTable } from '@/components/transfer'

export default function Page() {

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className=''>Substrate Transfers</div>
      <TransferTable></TransferTable>
    </div>
  )
}
