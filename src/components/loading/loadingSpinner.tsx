import React from 'react'
import { BareProps } from '@/types/page'
import { Spinner } from '@heroui/react'

interface Props extends BareProps {
}

const Component: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <Spinner size="lg" color="danger" />
    </div>
  )
}

export default Component
