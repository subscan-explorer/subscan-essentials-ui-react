import React from 'react'
import { unwrap, usePVMBlocks } from '@/utils/api'
import _ from 'lodash'
import { Skeleton } from '@heroui/react'
import PVMBlockItem from './PVMBlockItem'
import { env } from 'next-runtime-env'

interface PVMBlockListProps {}

const PVMBlockList: React.FC<PVMBlockListProps> = ({}) => {
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const { data, isLoading } = usePVMBlocks(NEXT_PUBLIC_API_HOST, {
    page: 0,
    row: 10,
  })
  const extrinsicsData = unwrap(data)
  const blocks = extrinsicsData?.list
  return (
    <div className="bg-blue-50 rounded-lg p-3 sm:p-5">
      <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">PVM Block</h2>
      <Skeleton className="w-full rounded-lg" isLoaded={!isLoading}>
        <div>
          {_.map(blocks, (block) => (
            <PVMBlockItem key={block.block_num} item={block} />
          ))}
        </div>
      </Skeleton>
    </div>
  )
}

export default PVMBlockList
