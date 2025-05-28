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
    <div className={`${bgColor} ${hoverBgColor} p-4 rounded-lg mb-4 transition-shadow`}>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <span className="font-medium">Block# </span>
            <Link color={getThemeColor(true)} size='md' href={linkHref} className="ml-1 font-semibold">
              {item.block_num}
            </Link>
          </div>
          <div className="text-sm mt-1">
            <span className="mr-2">Include</span>
            <span className="mx-2">{`${item.extrinsics_count} Extrinsics`}</span>
            <span className="">{`${item.event_count} Events`}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">{timeAgo(item.block_timestamp)}</div>
      </div>
    </div>
  )
}

export default BlockItem
