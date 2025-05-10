import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from '../checkbox';

describe('Checkbox/checkbox', () => {
	describe('layout', () => {
		test('should render by default', () => {
			render(<Checkbox checked={false} onChange={() => {/* No-op */}} />);
			const checkbox = screen.getByRole('checkbox');
			expect(checkbox).not.toBeChecked();
		});
		test('should render as checked', () => {
			render(<Checkbox checked={true} onChange={() => {/* No-op */}} />);
			const checkbox = screen.getByRole('checkbox');
			expect(checkbox).toBeChecked();
		});
		test('should render with label when provided', () => {
			render(<Checkbox label="Test Label" onChange={() => {/* No-op */}} />);
			const label = screen.getByText('Test Label');
			expect(label).toBeInTheDocument();
		});
		test('should apply disabled styles when disabled', () => {
			render(<Checkbox disabled={true} onChange={() => {/* No-op */}} />);
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
		test('should trigger onChange event when container is clicked', () => {
			const onChange = jest.fn();
			render(<Checkbox checked={false} onChange={onChange} />);
			
			const container = screen.getByRole('presentation');
			fireEvent.click(container);
			
			expect(onChange).toHaveBeenCalled();
		});
		test('should trigger onChange event when label is clicked', () => {
			const onChange = jest.fn();
			render(<Checkbox label="Test Label" checked={false} onChange={onChange} />);
			const label = screen.getByText('Test Label');
			
			fireEvent.click(label);
			
			expect(onChange).toHaveBeenCalled();
		});
		test('should not trigger onChange when disabled', () => {
			const onChange = jest.fn();
			render(<Checkbox disabled={true} checked={false} onChange={onChange} />);
			const checkbox = screen.getByRole('checkbox');
			
			fireEvent.click(checkbox);
			
			expect(onChange).not.toHaveBeenCalled();
		});
	});
});	
