import React from 'react'
import { ExtrinsicTable } from '@/components/extrinsic'

export default function Page() {

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className=''>Substrate Extrinsics</div>
      <ExtrinsicTable></ExtrinsicTable>
    </div>
  )
}
