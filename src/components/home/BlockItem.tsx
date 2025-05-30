import React from 'react'
import { blockType } from '@/utils/api'
import { getThemeColor, timeAgo } from '@/utils/text'
import { Link } from '../link'

interface BlockItemProps {
  item: blockType
}

const BlockItem: React.FC<BlockItemProps> = ({ item }) => {
  const linkHref = `/sub/block/${item.block_num}`

  const bgColor = 'bg-white'
  const hoverBgColor = 'hover:shadow-md'

  return (
    <div className={`${bgColor} ${hoverBgColor} p-3 sm:p-4 rounded-lg mb-2 sm:mb-4 transition-shadow`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <div className="flex items-center">
            <span className="font-medium text-sm sm:text-base">Block# </span>
            <Link color={getThemeColor(true)} size='md' href={linkHref} className="ml-1 font-semibold text-sm sm:text-base">
              {item.block_num}
            </Link>
          </div>
          <div className="text-xs sm:text-sm mt-1">
            <span className="mr-1 sm:mr-2">Include</span>
            <span className="mx-1 sm:mx-2">{`${item.extrinsics_count} Extrinsics`}</span>
            <span className="">{`${item.event_count} Events`}</span>
          </div>
        </div>
        <div className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">{timeAgo(item.block_timestamp)}</div>
      </div>
    </div>
  )
}

export default BlockItem
