import clsx from 'clsx'
import React from 'react'

import { BareProps } from '@/types/page'
import { Link } from '@heroui/react'

interface Props extends BareProps {
    size?: 'sm' | 'md' | 'lg'
    href?: string
}

const Component: React.FC<Props> = ({ children, className, size = 'sm', href }) => {
  return <Link size={size} href={href} className={clsx('', className)}>{children}</Link>
}

export default Component
