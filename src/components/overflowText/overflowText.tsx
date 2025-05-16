import clsx from 'clsx'
import React, { useState } from 'react'

import { BareProps } from '@/types/page'
import { Link } from '@heroui/react'

interface Props extends BareProps {
  value: string
}

const OverflowText: React.FC<{ text: string }> = ({ text }) => {
  const overflowLength = 1024
  const [fullContent, setFullContent] = useState(false)
  const isOverflow = text.length > overflowLength

  if (!isOverflow || fullContent) {
    return <>{text}</>
  }

  return (
    <div className='text-wrap break-all'>
      {text.slice(0, overflowLength)}...
      <Link size='sm' className="cursor-pointer" onPress={() => setFullContent(true)}>
        [{'View All'}]
      </Link>
    </div>
  )
}
export default OverflowText

