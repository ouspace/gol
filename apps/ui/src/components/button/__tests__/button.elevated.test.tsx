import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ElevatedButton from '../button.elevated';

describe('ElevatedButton', () => {
	it('renders with default text', () => {
		render(<ElevatedButton>Click Me</ElevatedButton>);
		expect(screen.getByText('Click Me')).toBeInTheDocument();
	});

	it('renders with disabled prop', () => {
		render(<ElevatedButton disabled>Disabled</ElevatedButton>);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});
});
