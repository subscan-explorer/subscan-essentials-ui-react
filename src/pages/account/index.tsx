import React from 'react'
import { AccountTable } from '@/components/account'

export default function Page() {

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className=''>Substrate Accounts</div>
      <AccountTable></AccountTable>
    </div>
  )
}
