import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from '@/components/navbar'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom'

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Navbar', () => {
  const mockRouter = {
    push: jest.fn(),
  }

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the logo', () => {
    render(<Navbar value="" />)
    const logo = screen.getByAltText('subscan')
    expect(logo).toBeInTheDocument()
  })

  it('renders navigation menu items', () => {
    render(<Navbar value="" />)
    expect(screen.getByText('Substrate')).toBeInTheDocument()
    expect(screen.getByText('PVM')).toBeInTheDocument()
  })

  it('handles search with enter key', () => {
    render(<Navbar value="" />)
    const searchInput = screen.getByPlaceholderText('Search')
    
    fireEvent.change(searchInput, { target: { value: '123456' } })
    fireEvent.keyDown(searchInput, { key: 'Enter' })

    expect(mockRouter.push).toHaveBeenCalledWith('/block/123456')
  })
})
