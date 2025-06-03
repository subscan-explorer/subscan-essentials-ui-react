import React from 'react'
import { BareProps } from '@/types/page'

interface Props extends BareProps {
}

const Component: React.FC<Props> = ({ className }) => {
  return (
    <div className="text-center py-10">
      <div className="text-xl font-medium">We didn’t find any results. Try refining your search.</div>
    </div>
  )
}

export default Component
