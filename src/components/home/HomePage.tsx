import React from 'react'
import InfoCard from './InfoCard'
import TransactionList from './TransactionList'
import ExtrinsicList from './ExtrinsicList'
import { useData } from '@/context'
import { formatNumber } from '@/utils/text'
import BlockList from './BlockList'
import PVMBlockList from './PVMBlockList'

const HomePage: React.FC = () => {
  const { metadata, token } = useData()
  if (!metadata) {
    return null
  }
  const columns = metadata.enable_evm && metadata.enable_substrate ? 2 : 1
  return (
    <div className="mx-auto px-2 sm:px-0">
      <div className={`grid grid-cols-1 gap-4 sm:gap-6 ${columns === 2 ? 'lg:grid-cols-2' : ''}`}>
        {metadata.enable_substrate && (
          <div>
            <div className="bg-secondary/10 rounded-lg p-3 sm:p-5 mb-4 sm:mb-5">
              <div className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">Substrate</div>
              <div className={`grid gap-4 mb-4 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-4'}`}>
                <InfoCard title="Substrate Block" value={formatNumber(metadata.finalized_blockNum)} href="/sub/block" color="text-secondary" />
                <InfoCard title="Extrinsic" value={formatNumber(metadata.count_extrinsic)} href="/sub/extrinsic" color="text-secondary" />
                <InfoCard title="Account" value={formatNumber(metadata.total_account)} href="/sub/account" color="text-secondary" />
                <InfoCard title="Transfer" value={formatNumber(metadata.total_transfer)} href="/sub/transfer" color="text-secondary" />
              </div>
            </div>
            <div className={`grid gap-4 grid-cols-1 ${columns === 1 ? 'lg:grid-cols-2' : ''}`}>
              {columns === 1 && (
                <BlockList />
              )}
              <ExtrinsicList />
            </div>
          </div>
        )}

        {metadata.enable_evm && (
          <div>
            <div className="bg-blue-50 rounded-lg p-3 sm:p-5 mb-4 sm:mb-5">
              <div className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">Smart Contract</div>
              <div className={`grid gap-4 mb-4 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-4'}`}>
                <InfoCard title="Smart Contract Block" value={formatNumber(metadata.finalized_blockNum)} href="/block" />
                <InfoCard title="Transaction" value={formatNumber(metadata.total_transaction)} href="/tx" />
                <InfoCard title="Smart Contract Account" value={formatNumber(metadata.total_evm_account)} href="/address" />
                <InfoCard title="Smart Contract" value={formatNumber(metadata.total_evm_contract)} href="/contract" />
              </div>
            </div>
            <div className={`grid gap-4 grid-cols-1 ${columns === 1 ? 'lg:grid-cols-2' : ''}`}>
              {columns === 1 && (
                <PVMBlockList />
              )}
              <TransactionList />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
