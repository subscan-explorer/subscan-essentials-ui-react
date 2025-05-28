import React from 'react'
import { unwrap, useBlocks } from '@/utils/api'
import _ from 'lodash'
import { Skeleton } from '@heroui/react'
import BlockItem from './BlockItem'

interface BlockListProps {
}

const BlockList: React.FC<BlockListProps> = ({}) => {
  const { data, isLoading } = useBlocks({
    page: 0,
    row: 10,
  })
  const extrinsicsData = unwrap(data)
  const blocks = extrinsicsData?.blocks
  return (
    <div className='bg-pink-50 rounded-lg p-5'>
      <h2 className="text-lg font-semibold mb-4">Substrate Block</h2>
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
