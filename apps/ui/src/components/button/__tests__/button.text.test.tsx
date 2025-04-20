import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextButton from '../button.text';

describe('TextButton', () => {
  it('renders with default text', () => {
    render(<TextButton>Click Me</TextButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('renders with disabled prop', () => {
    render(<TextButton disabled>Disabled</TextButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
