import React from 'react'
import TransactionItem from './TransactionItem'
import { unwrap, usePVMTxs } from '@/utils/api'
import _ from 'lodash'
import { Skeleton } from '@heroui/react'
import { env } from 'next-runtime-env'

interface TransactionListProps {}

const TransactionList: React.FC<TransactionListProps> = ({}) => {
  const [page, setPage] = React.useState(1)
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const { data, isLoading } = usePVMTxs(NEXT_PUBLIC_API_HOST, {
    page: 0,
    row: 10,
  })
  const extrinsicsData = unwrap(data)
  const transactions = extrinsicsData?.list
  return (
    <div className="bg-blue-50 rounded-lg p-3 sm:p-5">
      <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Smart Contract Transaction</h2>
      <Skeleton className="w-full rounded-lg" isLoaded={!isLoading}>
        <div>
          {_.map(transactions, (tx) => (
            <TransactionItem key={tx.hash} item={tx} />
          ))}
        </div>
      </Skeleton>
    </div>
  )
}

export default TransactionList
