import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TonalButton from '../button.tonal';

describe('TonalButton', () => {
	it('renders with default text', () => {
		render(<TonalButton>Click Me</TonalButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('renders with disabled prop', () => {
    render(<TonalButton disabled>Disabled</TonalButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
