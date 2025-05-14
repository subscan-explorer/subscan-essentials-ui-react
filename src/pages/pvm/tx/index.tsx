import React from 'react'
import { ExtrinsicTable } from '@/components/extrinsic'
import { TxTable } from '@/components/tx'

export default function Page() {

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className=''>PVM Transactions</div>
      <TxTable></TxTable>
    </div>
  )
}
