import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from '@/components/navbar'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom'
import { DataProvider } from '@/context'
import * as api from '@/utils/api'

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// Mock API hooks
jest.mock('@/utils/api', () => ({
  ...jest.requireActual('@/utils/api'),
  useMetadata: jest.fn(),
  useToken: jest.fn(),
}))

describe('Navbar', () => {
  const mockRouter = {
    push: jest.fn(),
  }

  const mockMetadata = {
    networkNode: 'default',
    token: 'TST',
    ss58Format: 42,
    tokenDecimals: 12,
    enable_substrate: true,
    enable_evm: true,
  }

  const mockToken = { TST: { price: '100', change: '1' } }

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(api.useMetadata as jest.Mock).mockReturnValue({ data: { data: mockMetadata } })
    ;(api.useToken as jest.Mock).mockReturnValue({ data: { data: mockToken } })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const renderNavbar = () => {
    return render(
      <DataProvider>
        <Navbar value="" />
      </DataProvider>,
    )
  }

  it('renders the logo', () => {
    renderNavbar()
    const logo = screen.getByAltText('subscan')
    expect(logo).toBeInTheDocument()
  })

  it('handles search with enter key', () => {
    renderNavbar()
    const searchInput = screen.getByPlaceholderText('Search')

    fireEvent.change(searchInput, { target: { value: '123456' } })
    fireEvent.keyDown(searchInput, { key: 'Enter' })

    expect(mockRouter.push).toHaveBeenCalledWith('/sub/block/123456')
  })
})
