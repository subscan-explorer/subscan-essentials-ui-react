import React from 'react'
import TransactionItem from './TransactionItem'
import { unwrap, usePVMBlocks, usePVMTxs } from '@/utils/api'
import _ from 'lodash'
import { Skeleton } from '@heroui/react'
import PVMBlockItem from './PVMBlockItem'

interface PVMBlockListProps {
}

const PVMBlockList: React.FC<PVMBlockListProps> = ({}) => {
  const { data, isLoading } = usePVMBlocks({
    page: 0,
    row: 10,
  })
  const extrinsicsData = unwrap(data)
  const blocks = extrinsicsData?.list
  return (
    <div className='bg-blue-50 rounded-lg p-5'>
      <h2 className="text-lg font-semibold mb-4">PVM Block</h2>
      <Skeleton className="w-full rounded-lg" isLoaded={!isLoading}>
        <div>
            {_.map(blocks, (block) => (
            <PVMBlockItem
                key={block.block_num}
                item={block}
            />
            ))}
        </div>
      </Skeleton>
    </div>
  )
}

export default PVMBlockList
