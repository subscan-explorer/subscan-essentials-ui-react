import clsx from 'clsx'
import React from 'react'

import { BareProps } from '@/types/page'
import { Link } from '@heroui/react'
import { themeType } from '@/utils/text'

interface Props extends BareProps {
    size?: 'sm' | 'md' | 'lg'
    href?: string
    target?: string
    rel?: string
    color?: themeType
}

const Component: React.FC<Props> = ({ children, className, color = 'primary', size = 'sm', href, target, rel }) => {
  return <Link color={color} size={size} href={href} target={target} rel={rel} className={clsx('', className)}>{children}</Link>
}

export default Component
