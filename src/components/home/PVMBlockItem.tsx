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
    <div className={`${bgColor} ${hoverBgColor} p-3 sm:p-4 rounded-lg mb-2 sm:mb-4 transition-shadow`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <div className="flex items-center">
            <span className="font-medium text-sm sm:text-base">Block# </span>
            <Link size='md' href={linkHref} className="text-blue-600 ml-1 font-semibold text-sm sm:text-base">
              {item.block_num}
            </Link>
          </div>
          <div className="text-xs sm:text-sm mt-1">
            <span className="mr-1 sm:mr-2">Include</span>
            <span className="mx-1 sm:mx-2">{`${item.transactions} Transactions`}</span>
          </div>
        </div>
        <div className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">{timeAgo(item.block_timestamp)}</div>
      </div>
    </div>
  )
}

export default PVMBlockItem
