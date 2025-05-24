import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from '../checkbox';

describe('components/checkbox', () => {
	describe('layout', () => {
		test('should render by default', () => {
			render(<Checkbox />);
			const checkbox = screen.getByRole('checkbox');
			expect(checkbox).not.toBeChecked();
		});
		test('should render as checked', () => {
			render(<Checkbox checked={true} />);
			const checkbox = screen.getByRole('checkbox');
			expect(checkbox).toBeChecked();
		});
		test('should render as indeterminate', () => {
			render(<Checkbox indeterminate={true} />);
			const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
			expect(checkbox.indeterminate).toBe(true);
		});
		test('should display label property', () => {
			render(<Checkbox label="Test Label" />);
			const label = screen.getByText('Test Label');
			expect(label).toBeInTheDocument();
		});
		test('should display as disabled', () => {
			render(<Checkbox disabled={true} />);
			const checkbox = screen.getByRole('checkbox');
			expect(checkbox).toBeDisabled();
		});
	});

	describe ('behavior', () => {
		test('should trigger onChange event when checkbox is clicked', () => {
			const onChange = jest.fn();
			render(<Checkbox checked={false} onChange={onChange} />);
			const checkbox = screen.getByRole('checkbox');
			
			fireEvent.click(checkbox);
			
			expect(onChange).toHaveBeenCalled();
		});
		test('should trigger onChange event when label is clicked', () => {
			const onChange = jest.fn();
			render(<Checkbox label="Test Label" checked={false} onChange={onChange} />);
			const label = screen.getByText('Test Label');
			
			fireEvent.click(label);
			
			expect(onChange).toHaveBeenCalled();
		});
		test('should not trigger onChange event when it is disabled', () => {
			const onChange = jest.fn();
			render(<Checkbox disabled={true} checked={false} onChange={onChange} />);
			const checkbox = screen.getByRole('checkbox');
			
			fireEvent.click(checkbox);
			
			expect(onChange).not.toHaveBeenCalled();
		});
		test('should have aria-checked="mixed" when indeterminate', () => {
			render(<Checkbox indeterminate={true} />);
			const checkbox = screen.getByRole('checkbox');
			expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
		});
	});
});