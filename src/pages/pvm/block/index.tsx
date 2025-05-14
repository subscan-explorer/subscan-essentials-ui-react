import React from 'react'
import { PVMBlockTable } from '@/components/pvmBlock'

export default function Page() {

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="">PVM Blocks</div>
      <PVMBlockTable></PVMBlockTable>
    </div>
  )
}
