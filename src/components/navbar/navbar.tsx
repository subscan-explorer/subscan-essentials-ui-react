import clsx from 'clsx'
import React from 'react'

import { BareProps } from '@/types/page'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, DropdownItem, DropdownMenu, Dropdown, DropdownTrigger, Link } from '@heroui/react'

interface Props extends BareProps {
  value: string
}
const ChevronDown = ({ fill, size, ...props }: { fill?: string; size?: number | string } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg fill="none" height={size || 24} viewBox="0 0 24 24" width={size || 24} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  )
}

const Component: React.FC<Props> = ({ children, className }) => {
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
  }
  return (
    <Navbar position="static" maxWidth="full">
      <NavbarBrand>
        <p className="font-bold text-inherit">Subscan Essential</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                size='lg'
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
                endContent={icons.chevron}>
                Substrate
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Substrate"
            itemClasses={{
              base: 'gap-4',
            }}>
            <DropdownItem key="block">
              <Link href="/block" className='block text-inherit'>Block</Link>
            </DropdownItem>
            <DropdownItem key="extrinsic">
              <Link href="/extrinsic" className='block text-inherit'>Extrinsic</Link>
            </DropdownItem>
            <DropdownItem key="account">
              <Link href="/account" className='block text-inherit'>Account</Link>
            </DropdownItem>
            <DropdownItem key="event">
              <Link href="/event" className='block text-inherit'>Event</Link>
            </DropdownItem>
            <DropdownItem key="transfer">
              <Link href="/transfer" className='block text-inherit'>Transfer</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                size='lg'
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
                endContent={icons.chevron}>
                PVM
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Substrate"
            itemClasses={{
              base: 'gap-4',
            }}>
            <DropdownItem key="block">
              <Link href="/pvm/block" className='block text-inherit'>Block</Link>
            </DropdownItem>
            <DropdownItem key="extrinsic">
              <Link href="/pvm/tx" className='block text-inherit'>Transaction</Link>
            </DropdownItem>
            <DropdownItem key="account">
              <Link href="/pvm/account" className='block text-inherit'>Account</Link>
            </DropdownItem>
            <DropdownItem key="contract">
              <Link href="/pvm/contract" className='block text-inherit'>Contract</Link>
            </DropdownItem>
            <DropdownItem key="erc20">
              <Link href="/pvm/token" className='block text-inherit'>ERC-20</Link>
            </DropdownItem>
            <DropdownItem key="erc721">
              <Link href="/pvm/token" className='block text-inherit'>ERC-721</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent justify="end"></NavbarContent>
    </Navbar>
  )
}

export default Component
