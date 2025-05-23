import { render, screen } from '@testing-library/react';
import Button from '../button';

describe('Button', () => {
	it('renders with default variant (filled)', () => {
		render(<Button>Click Me</Button>);
		const button = screen.getByRole('button', { name: /click me/i });
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('button--filled');
	});

	it('renders with specified variant', () => {
		render(<Button variant="outlined">Outlined</Button>);
		const button = screen.getByRole('button', { name: /outlined/i });
		expect(button).toHaveClass('button--outlined');
	});

	it('applies custom className', () => {
		render(<Button className="custom-class">Custom</Button>);
		const button = screen.getByRole('button', { name: /custom/i });
		expect(button).toHaveClass('custom-class');
	});

	it('renders icon if provided', () => {
		render(<Button icon={<span data-testid="icon">⭐</span>}>Star</Button>);
		expect(screen.getByTestId('icon')).toBeInTheDocument();
	});

	it('handles layout prop correctly', () => {
		render(<Button layout="centered">Centered</Button>);
		const button = screen.getByRole('button', { name: /centered/i });
		expect(button).toHaveClass('layout--centered');
	});

	it('adds fullWidth class if fullWidth is true', () => {
		render(<Button fullWidth>Full</Button>);
		const button = screen.getByRole('button', { name: /full/i });
		expect(button).toHaveClass('button--fullWidth');
	});
});
