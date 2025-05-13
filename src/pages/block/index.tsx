import React from 'react'
import { BlockTable } from '@/components/block'

export default function Page() {

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="">Substrate Blocks</div>
      <BlockTable></BlockTable>
    </div>
  )
}
