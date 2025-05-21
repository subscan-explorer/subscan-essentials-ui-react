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
    <div className={`${bgColor} ${hoverBgColor} p-4 rounded-lg mb-4 transition-shadow`}>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <span className="font-medium">Extrinsic# </span>
            <Link color={getThemeColor(true)} size='md' href={linkHref} className="ml-1 font-semibold">
              {item.extrinsic_index}
            </Link>
          </div>
          <div className="text-sm mt-1">
            {`${item.call_module}(${item.call_module_function})`}
          </div>
        </div>
        <div className="text-sm text-gray-500">{timeAgo(item.block_timestamp)}</div>
      </div>
    </div>
  )
}

export default ExtrinsicItem
