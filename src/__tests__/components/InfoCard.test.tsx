import { render, screen } from '@testing-library/react'
import InfoCard from '@/components/home/InfoCard'
import '@testing-library/jest-dom'

describe('InfoCard', () => {
  const defaultProps = {
    title: 'Test Title',
    value: '123',
    href: '/test',
  }

  it('renders with default props', () => {
    render(<InfoCard {...defaultProps} />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
  })

  it('has correct link href', () => {
    render(<InfoCard {...defaultProps} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test')
  })
})
