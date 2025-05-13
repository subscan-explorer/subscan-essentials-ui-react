import clsx from 'clsx'
import React, { HTMLAttributes } from 'react'

const Container: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={clsx('w-full lg:max-w-screen-xl', className)} {...props}>
    {children}
  </div>
)

export default Container
