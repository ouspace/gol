import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
	FilledButton,
	ElevatedButton,
	TonalButton,
	OutlinedButton,
	TextButton,
	IconButton,
} from '../button';

describe('Button Variants', () => {
	describe('FilledButton', () => {
		it('renders with default text', () => {
			render(<FilledButton>Click Me</FilledButton>);
			expect(screen.getByText('Click Me')).toBeInTheDocument();
		});

		it('renders with disabled prop', () => {
			render(<FilledButton disabled>Disabled</FilledButton>);
			expect(screen.getByRole('button')).toBeDisabled();
		});
	});

	describe('ElevatedButton', () => {
		it('renders with default text', () => {
			render(<ElevatedButton>Click Me</ElevatedButton>);
			expect(screen.getByText('Click Me')).toBeInTheDocument();
		});

		it('renders with disabled prop', () => {
			render(<ElevatedButton disabled>Disabled</ElevatedButton>);
			expect(screen.getByRole('button')).toBeDisabled();
		});
	});

	describe('TonalButton', () => {
		it('renders with default text', () => {
			render(<TonalButton>Click Me</TonalButton>);
			expect(screen.getByText('Click Me')).toBeInTheDocument();
		});

		it('renders with disabled prop', () => {
			render(<TonalButton disabled>Disabled</TonalButton>);
			expect(screen.getByRole('button')).toBeDisabled();
		});
	});

	describe('OutlinedButton', () => {
		it('renders with default text', () => {
			render(<OutlinedButton>Click Me</OutlinedButton>);
			expect(screen.getByText('Click Me')).toBeInTheDocument();
		});

		it('renders with disabled prop', () => {
			render(<OutlinedButton disabled>Disabled</OutlinedButton>);
			expect(screen.getByRole('button')).toBeDisabled();
		});
	});

	describe('TextButton', () => {
		it('renders with default text', () => {
			render(<TextButton>Click Me</TextButton>);
			expect(screen.getByText('Click Me')).toBeInTheDocument();
		});

		it('renders with disabled prop', () => {
			render(<TextButton disabled>Disabled</TextButton>);
			expect(screen.getByRole('button')).toBeDisabled();
		});
	});

	describe('IconButton', () => {
		it('renders with icon', () => {
			render(<IconButton aria-label="Icon button">🔔</IconButton>);
			expect(screen.getByRole('button', { name: /icon button/i })).toBeInTheDocument();
		});

		it('renders with disabled prop', () => {
			render(<IconButton aria-label="Disabled icon" disabled>🔕</IconButton>);
			expect(screen.getByRole('button', { name: /disabled icon/i })).toBeDisabled();
		});
	});
});
