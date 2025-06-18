import React from 'react'
import { pvmTxType } from '@/utils/api'
import { formatHash, timeAgo } from '@/utils/text'
import { Link } from '../link'

interface TransactionItemProps {
  item: pvmTxType
}

const TransactionItem: React.FC<TransactionItemProps> = ({ item }) => {
  const baseUrl = 'pvm/'
  const linkHref = `/tx/${item.hash}`
  const fromLink = `/address/${item.from_address}`
  const toLink = `/address/${item.to_address}`

  const bgColor = 'bg-white'
  const hoverBgColor = 'hover:shadow-md'

  return (
    <div className={`${bgColor} ${hoverBgColor} p-3 sm:p-4 rounded-lg mb-2 sm:mb-4 transition-shadow`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="mb-1 sm:mb-0">
          <div className="flex items-center">
            <span className="font-medium text-sm sm:text-base">Hash# </span>
            <Link size='md' href={linkHref} className="text-primary ml-1 font-semibold text-sm sm:text-base truncate max-w-[160px] sm:max-w-none">
              {formatHash(item.hash)}
            </Link>
          </div>
          <div className="text-xs sm:text-sm mt-1 lg:flex grid grid-cols-1 gap-1">
            <div className="flex items-center flex-wrap">
              <span className="mr-1 sm:mr-2">From</span>
              <Link href={fromLink} className="text-primary truncate max-w-[160px] sm:max-w-none">
                {formatHash(item.from_address)}
              </Link>
            </div>
            <div className="flex items-center flex-wrap">
              <span className="mr-2 sm:mr-2">To</span>
              <Link href={toLink} className="text-primary truncate max-w-[160px] sm:max-w-none">
                {formatHash(item.to_address)}
              </Link>
            </div>
          </div>
        </div>
        <div className="text-xs sm:text-sm text-gray-500">{timeAgo(item.block_timestamp)}</div>
      </div>
    </div>
  )
}

export default TransactionItem
