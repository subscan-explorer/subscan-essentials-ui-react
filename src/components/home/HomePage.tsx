import React from 'react'
import InfoCard from './InfoCard'
import TransactionList from './TransactionList'
import ExtrinsicList from './ExtrinsicList'
import { useData } from '@/context'
import { formatNumber } from '@/utils/text'

const HomePage: React.FC = () => {
  const { metadata, token } = useData()
  if (!metadata) {
    return null
  }
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="bg-pink-50 rounded-lg p-5 mb-5">
            <div className="mb-4 text-lg font-semibold">Substrate</div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InfoCard title="Substrate Block" value={formatNumber(metadata.finalized_blockNum)} href="/sub/block" color="text-danger" />
              <InfoCard title="Extrinsic" value={formatNumber(metadata.count_extrinsic)} href="/sub/extrinsic" color="text-danger" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InfoCard title="Account" value={formatNumber(metadata.total_account)} href="/sub/account" color="text-danger" />
              <InfoCard title="Transfer" value={formatNumber(metadata.total_transfer)} href="/sub/transfer" color="text-danger" />
            </div>
          </div>
          <ExtrinsicList />
        </div>

        <div>
          <div className="bg-blue-50 rounded-lg p-5 mb-5">
            <div className="mb-4 text-lg font-semibold">PVM</div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InfoCard title="PVM Block" value={metadata.finalized_blockNum} href="/block" />
              <InfoCard title="Transaction" value={metadata.total_transaction} href="/tx" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InfoCard title="PVM Account" value={metadata.total_evm_account} href="/address" />
              <InfoCard title="PVM Contract" value={metadata.total_evm_contract} href="/contract" />
            </div>
          </div>
          <TransactionList />
        </div>
      </div>
    </div>
  )
}

export default HomePage
