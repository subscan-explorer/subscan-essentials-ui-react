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
    <div className={`${bgColor} ${hoverBgColor} p-4 rounded-lg mb-4 transition-shadow`}>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <span className="font-medium">Hash# </span>
            <Link size='md' href={linkHref} className="text-blue-600 ml-1 font-semibold">
              {formatHash(item.hash)}
            </Link>
          </div>
          <div className="text-sm mt-1">
            <span className="mr-2">From</span>
            <Link href={fromLink} className="text-blue-600">
              {formatHash(item.from_address)}
            </Link>
            <span className="mx-2">To</span>
            <Link href={toLink} className="text-blue-600">
              {formatHash(item.to_address)}
            </Link>
          </div>
        </div>
        <div className="text-sm text-gray-500">{timeAgo(item.block_timestamp)}</div>
      </div>
    </div>
  )
}

export default TransactionItem
