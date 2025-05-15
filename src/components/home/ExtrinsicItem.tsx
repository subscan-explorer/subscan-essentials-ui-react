import React from 'react'
import Link from 'next/link'
import { extrinsicType } from '@/utils/api'
import { timeAgo } from '@/utils/text'

interface ExtrinsicItemProps {
  item: extrinsicType
}

const ExtrinsicItem: React.FC<ExtrinsicItemProps> = ({ item }) => {
  const baseUrl = ''
  const linkHref = `/extrinsic/${item.extrinsic_index}`

  const bgColor = 'bg-pink-50'
  const hoverBgColor = 'hover:bg-pink-100'

  return (
    <div className={`${bgColor} ${hoverBgColor} p-4 rounded-lg mb-2 transition-colors`}>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <span className="font-medium">Extrinsic# </span>
            <Link href={linkHref} className="text-blue-600 ml-1">
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
