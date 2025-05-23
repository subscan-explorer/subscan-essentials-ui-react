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
  Image,
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
    <div
      className="bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/navbar.png)',
        backgroundSize: 'cover',
      }}>
      <Navbar
        position="static"
        maxWidth="full"
        classNames={{
          wrapper: 'px-0 w-full lg:max-w-screen-xl',
          base: 'bg-transparent backdrop-filter-none',
        }}>
        <NavbarBrand>
          <Link href="/" className="text-inherit">
            <Image className="rounded-none" alt="subscan" src="/images/logo.png" width={202} height={25} />
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  size="lg"
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white"
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
                <Link href="/sub/block" className="block text-inherit">
                  Block
                </Link>
              </DropdownItem>
              <DropdownItem key="extrinsic">
                <Link href="/sub/extrinsic" className="block text-inherit">
                  Extrinsic
                </Link>
              </DropdownItem>
              <DropdownItem key="account">
                <Link href="/sub/account" className="block text-inherit">
                  Account
                </Link>
              </DropdownItem>
              <DropdownItem key="event">
                <Link href="/sub/event" className="block text-inherit">
                  Event
                </Link>
              </DropdownItem>
              <DropdownItem key="transfer">
                <Link href="/sub/transfer" className="block text-inherit">
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
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white"
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
                <Link href="/block" className="block text-inherit">
                  Block
                </Link>
              </DropdownItem>
              <DropdownItem key="extrinsic">
                <Link href="/tx" className="block text-inherit">
                  Transaction
                </Link>
              </DropdownItem>
              <DropdownItem key="account">
                <Link href="/address" className="block text-inherit">
                  Account
                </Link>
              </DropdownItem>
              <DropdownItem key="contract">
                <Link href="/contract" className="block text-inherit">
                  Contract
                </Link>
              </DropdownItem>
              <DropdownItem key="erc20">
                <Link href="/erc20_token" className="block text-inherit">
                  ERC-20
                </Link>
              </DropdownItem>
              <DropdownItem key="erc721">
                <Link href="/erc721_token" className="block text-inherit">
                  ERC-721
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem>
            <Link className="text-white font-semibold" href="/sub/extrinsic">
              Extrinsic
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white font-semibold" href="/tx">
              Transaction
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="w-full px-4 pb-6 flex justify-center">
        <div className="w-full lg:max-w-screen-xl">
          <Input
            classNames={{
              base: 'lg:max-w-2xl max-w-[10rem] h-10 mx-auto',
              mainWrapper: 'h-full',
              input: 'text-small',
              inputWrapper: 'h-full font-normal bg-white',
            }}
            value={value}
            onValueChange={setValue}
            onKeyDown={handleSearch}
            placeholder="Search"
            size="md"
            startContent={icons.search}
            type="search"
          />
        </div>
      </div>
    </div>
  )
}

export default Component
