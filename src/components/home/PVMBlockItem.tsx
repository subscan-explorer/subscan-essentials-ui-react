import React from 'react'
import { pvmBlockType } from '@/utils/api'
import { timeAgo } from '@/utils/text'
import { Link } from '../link'

interface PVMBlockItemProps {
  item: pvmBlockType
}

const PVMBlockItem: React.FC<PVMBlockItemProps> = ({ item }) => {
  const baseUrl = 'pvm/'
  const linkHref = `/block/${item.block_num}`

  const bgColor = 'bg-white'
  const hoverBgColor = 'hover:shadow-md'

  return (
    <div className={`${bgColor} ${hoverBgColor} p-4 rounded-lg mb-4 transition-shadow`}>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <span className="font-medium">Block# </span>
            <Link size='md' href={linkHref} className="text-blue-600 ml-1 font-semibold">
              {item.block_num}
            </Link>
          </div>
          <div className="text-sm mt-1">
            <span className="mr-2">Include</span>
            <span className="mx-2">{`${item.transactions} Transactions`}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">{timeAgo(item.block_timestamp)}</div>
      </div>
    </div>
  )
}

export default PVMBlockItem
