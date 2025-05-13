import clsx from 'clsx'
import React, { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  disablePadding?: boolean
}

const PageContent: React.FC<Props> = ({ children, className, disablePadding, ...props }) => (
  <div className={clsx('flex justify-center', { 'py-4 px-2': !disablePadding }, className)} {...props}>
    {children}
  </div>
)

export default PageContent
