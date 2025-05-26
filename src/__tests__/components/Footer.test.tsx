import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Footer } from '@/components/Footer'

// Mock next/image because it's not available in the test environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  }
}))

describe('Footer', () => {
  
  it('renders logo images', () => {
    render(<Footer />)
    
    expect(screen.getByAltText('polakdot')).toBeInTheDocument()
    expect(screen.getByAltText('subscan')).toBeInTheDocument()
  })
  
  it('renders social links', () => {
    render(<Footer />)
    
    const links = screen.getAllByRole('link')
    const hrefs = links.map(link => link.getAttribute('href'))
    
    // Check for GitHub link
    expect(hrefs).toContain('https://github.com/subscan-explorer/subscan-essentials-ui-react')
    
    // Check for Twitter link
    expect(hrefs).toContain('https://twitter.com/subscan_io')
    
    // Check for Email link
    expect(hrefs).toContain('mailto:hello@subscan.io')
  })
})
