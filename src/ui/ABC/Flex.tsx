import clsx from 'clsx'
import React from 'react'

import { BareProps } from '@/types/page'

interface Props extends BareProps {
  key?: string
}

const Flex: React.FC<Props> = ({ children, className }) => <div className={clsx('flex', className)}>{children}</div>

export default Flex
