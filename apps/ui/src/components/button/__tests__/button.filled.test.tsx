import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FilledButton from '../button.filled'

describe('FilledButton', () => {
  it('renders with default text', () => {
    render(<FilledButton>Click Me</FilledButton>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('renders with disabled prop', () => {
    render(<FilledButton disabled>Disabled</FilledButton>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })
})
