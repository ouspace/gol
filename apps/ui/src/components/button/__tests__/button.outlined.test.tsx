import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OutlinedButton from '../button.outlined';

describe('OutlinedButton', () => {
  it('renders with default text', () => {
    render(<OutlinedButton>Click Me</OutlinedButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('renders with disabled prop', () => {
    render(<OutlinedButton disabled>Disabled</OutlinedButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
