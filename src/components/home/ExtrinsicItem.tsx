import React from 'react'
import { extrinsicType } from '@/utils/api'
import { getThemeColor, timeAgo } from '@/utils/text'
import { Link } from '../link'

interface ExtrinsicItemProps {
  item: extrinsicType
}

const ExtrinsicItem: React.FC<ExtrinsicItemProps> = ({ item }) => {
  const baseUrl = ''
  const linkHref = `/sub/extrinsic/${item.extrinsic_index}`

  const bgColor = 'bg-white'
  const hoverBgColor = 'hover:shadow-md'

  return (
    <div className={`${bgColor} ${hoverBgColor} p-3 sm:p-4 rounded-lg mb-2 sm:mb-4 transition-shadow`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <div className="flex items-center">
            <span className="font-medium text-sm sm:text-base">Extrinsic# </span>
            <Link color={getThemeColor(true)} size='md' href={linkHref} className="ml-1 font-semibold text-sm sm:text-base truncate max-w-[180px] sm:max-w-none">
              {item.extrinsic_index}
            </Link>
          </div>
          <div className="text-xs sm:text-sm mt-1 truncate">
            {`${item.call_module}(${item.call_module_function})`}
          </div>
        </div>
        <div className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">{timeAgo(item.block_timestamp)}</div>
      </div>
    </div>
  )
}

export default ExtrinsicItem
