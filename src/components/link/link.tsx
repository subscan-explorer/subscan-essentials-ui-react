import clsx from 'clsx'
import React from 'react'

import { BareProps } from '@/types/page'
import { Link } from '@heroui/react'

interface Props extends BareProps {
    size?: 'sm' | 'md' | 'lg'
    href?: string
    target?: string
    rel?: string
}

const Component: React.FC<Props> = ({ children, className, size = 'sm', href, target, rel }) => {
  return <Link size={size} href={href} target={target} rel={rel} className={clsx('', className)}>{children}</Link>
}

export default Component
