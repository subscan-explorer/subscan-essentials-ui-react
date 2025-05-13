import clsx from 'clsx'
import React from 'react'

import { BareProps } from '@/types/page'

interface Props extends BareProps {
  value: string
}

const Component: React.FC<Props> = ({ children, className }) => {
  return <div className={clsx('flex', className)}>Default Component</div>
}

export default Component
