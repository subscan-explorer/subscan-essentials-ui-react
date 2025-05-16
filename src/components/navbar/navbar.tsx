import React, { useState, KeyboardEvent } from 'react'
import { useRouter } from 'next/router'

import { BareProps } from '@/types/page'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
  Link,
  Input,
} from '@heroui/react'

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

const SearchIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => {
  return (
    <svg aria-hidden="true" fill="none" focusable="false" height={size} role="presentation" viewBox="0 0 24 24" width={size} {...props}>
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path d="M22 22L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
    </svg>
  )
}

const Component: React.FC<Props> = ({ children, className }) => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    search: <SearchIcon fill="none" size={16} />,
  }

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      router.push(`/block/${value.trim()}`)
      setValue('')
    }
  }

  return (
    <Navbar position="static" maxWidth="full" classNames={
      {
        wrapper: 'px-4',
      }
    }>
      <NavbarBrand>
        <Link href="/" className="text-inherit">
          <p className="font-bold text-inherit">Subscan Essential</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                size="lg"
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
              <Link href="/block" className="block text-inherit">
                Block
              </Link>
            </DropdownItem>
            <DropdownItem key="extrinsic">
              <Link href="/extrinsic" className="block text-inherit">
                Extrinsic
              </Link>
            </DropdownItem>
            <DropdownItem key="account">
              <Link href="/account" className="block text-inherit">
                Account
              </Link>
            </DropdownItem>
            <DropdownItem key="event">
              <Link href="/event" className="block text-inherit">
                Event
              </Link>
            </DropdownItem>
            <DropdownItem key="transfer">
              <Link href="/transfer" className="block text-inherit">
                Transfer
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                size="lg"
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
              <Link href="/pvm/block" className="block text-inherit">
                Block
              </Link>
            </DropdownItem>
            <DropdownItem key="extrinsic">
              <Link href="/pvm/tx" className="block text-inherit">
                Transaction
              </Link>
            </DropdownItem>
            <DropdownItem key="account">
              <Link href="/pvm/account" className="block text-inherit">
                Account
              </Link>
            </DropdownItem>
            <DropdownItem key="contract">
              <Link href="/pvm/contract" className="block text-inherit">
                Contract
              </Link>
            </DropdownItem>
            <DropdownItem key="erc20">
              <Link href="/pvm/erc20_token" className="block text-inherit">
                ERC-20
              </Link>
            </DropdownItem>
            <DropdownItem key="erc721">
              <Link href="/pvm/erc721_token" className="block text-inherit">
                ERC-721
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent justify="end">
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[10rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          value={value}
          onValueChange={setValue}
          onKeyDown={handleSearch}
          placeholder="Search..."
          size="sm"
          startContent={icons.search}
          type="search"
        />
      </NavbarContent>
    </Navbar>
  )
}

export default Component
