import { render, screen } from '@testing-library/react';
import Button from 'components/button';

describe('Button', () => {
	it('should render with default variant (filled)', () => {
		// Arrange & Act
		render(<Button>Click Me</Button>);

		// Assert
		const button = screen.getByRole('button', { name: /click me/i });
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('button--filled');
	});

	it('should render with specified variant', () => {
		render(<Button variant="outlined">Outlined</Button>);
		const button = screen.getByRole('button', { name: /outlined/i });
		expect(button).toHaveClass('button--outlined');
	});

	it('should apply custom className', () => {
		render(<Button className="custom-class">Custom</Button>);
		const button = screen.getByRole('button', { name: /custom/i });
		expect(button).toHaveClass('custom-class');
	});

	it('should render icon if provided', () => {
		render(<Button icon={<span data-testid="icon">⭐</span>}>Star</Button>);
		expect(screen.getByTestId('icon')).toBeInTheDocument();
	});

	it('should handle layout prop correctly', () => {
		render(<Button layout="centered">Centered</Button>);
		const button = screen.getByRole('button', { name: /centered/i });
		expect(button).toHaveClass('layout--centered');
	});

	it('should add fullWidth class if fullWidth is true', () => {
		render(<Button fullWidth>Full</Button>);
		const button = screen.getByRole('button', { name: /full/i });
		expect(button).toHaveClass('button--fullWidth');
	});
});
