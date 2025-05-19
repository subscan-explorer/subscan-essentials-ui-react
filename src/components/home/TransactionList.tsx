import React from 'react'
import TransactionItem from './TransactionItem'
import { unwrap, usePVMTxs } from '@/utils/api'
import { PAGE_SIZE } from '@/utils/const'
import _ from 'lodash'
import { Skeleton } from '@heroui/react'

interface TransactionListProps {
}

const TransactionList: React.FC<TransactionListProps> = ({}) => {
  const [page, setPage] = React.useState(1)
  const { data, isLoading } = usePVMTxs({
    page: 0,
    row: 10,
  })
  const extrinsicsData = unwrap(data)
  const transactions = extrinsicsData?.list
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">PVM Transaction</h2>
      <Skeleton className="w-full rounded-lg" isLoaded={!isLoading}>
        <div>
            {_.map(transactions, (tx) => (
            <TransactionItem
                key={tx.hash}
                item={tx}
            />
            ))}
        </div>
      </Skeleton>
    </div>
  )
}

export default TransactionList
