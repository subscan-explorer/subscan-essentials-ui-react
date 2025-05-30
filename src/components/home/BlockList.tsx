import React from 'react'
import { unwrap, useBlocks } from '@/utils/api'
import _ from 'lodash'
import { Skeleton } from '@heroui/react'
import BlockItem from './BlockItem'
import { env } from 'next-runtime-env'

interface BlockListProps {
}

const BlockList: React.FC<BlockListProps> = ({}) => {
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const { data, isLoading } = useBlocks(NEXT_PUBLIC_API_HOST, {
    page: 0,
    row: 10,
  })
  const extrinsicsData = unwrap(data)
  const blocks = extrinsicsData?.blocks
  return (
    <div className='bg-pink-50 rounded-lg p-3 sm:p-5'>
      <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Substrate Block</h2>
      <Skeleton className="w-full rounded-lg" isLoaded={!isLoading}>
        <div>
            {_.map(blocks, (block) => (
            <BlockItem
                key={block.hash}
                item={block}
            />
            ))}
        </div>
      </Skeleton>
    </div>
  )
}

export default BlockList
