import React from 'react'
import ExtrinsicItem from './ExtrinsicItem'
import { unwrap, useExtrinsics } from '@/utils/api'
import { PAGE_SIZE } from '@/utils/const'
import _ from 'lodash'
import { Skeleton } from '@heroui/react'
import { env } from 'next-runtime-env';

interface ExtrinsicListProps {}

const ExtrinsicList: React.FC<ExtrinsicListProps> = ({ }) => {
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || '';
  const { data, isLoading} = useExtrinsics(NEXT_PUBLIC_API_HOST, {
    page: 0,
    row: 10,
  })
  const extrinsicsData = unwrap(data)
  const transactions = extrinsicsData?.extrinsics
  return (
    <div className='bg-pink-50 rounded-lg p-5'>
      <h2 className="text-lg font-semibold mb-4">Substrate Extrinsic</h2>
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
