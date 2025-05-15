import React from 'react'
import ExtrinsicItem from './ExtrinsicItem'
import { unwrap, useExtrinsics } from '@/utils/api'
import { PAGE_SIZE } from '@/utils/const'
import _ from 'lodash'
import { Skeleton } from '@heroui/react'

interface ExtrinsicListProps {}

const ExtrinsicList: React.FC<ExtrinsicListProps> = ({ }) => {
  const rowsPerPage = PAGE_SIZE
  const { data, isLoading} = useExtrinsics({
    page: 0,
    row: rowsPerPage,
  })
  const extrinsicsData = unwrap(data)
  const transactions = extrinsicsData?.extrinsics
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Substrate Extrinsic</h2>
      <Skeleton className="w-full rounded-lg" isLoaded={!isLoading}>
        <div>
          {_.map(transactions, (tx) => (
            <ExtrinsicItem
              key={tx.id}
              item={tx}
            />
          ))}
        </div>
      </Skeleton>

    </div>
  )
}

export default ExtrinsicList
