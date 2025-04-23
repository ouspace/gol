import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from '../checkbox';

describe('components/checkbox', () => {
	function renderCheckbox(properties = {}) {
		render(<Checkbox {...properties} />);
		return screen.getByRole('checkbox');
	}

	describe('Layout', () => {
		test('should render unchecked by default', () => {
			const view = renderCheckbox();
			expect(view).not.toBeChecked();
		});

		test('should render as checked', () => {
			const view = renderCheckbox({ value: true });
			expect(view).toBeChecked();
		});

		test('should render as indeterminate', () => {
			const view = renderCheckbox({ value: null }) as HTMLInputElement;
			expect(view.indeterminate).toBe(true);
		});

		test('should display label property', () => {
			renderCheckbox({ label: 'Test Label' });
			const label = screen.getByText('Test Label');
			expect(label).toBeInTheDocument();
		});

		test('should display as disabled', () => {
			const view = renderCheckbox({ disabled: true });
			expect(view).toBeDisabled();
		});
	});

	describe('Behavior', () => {
		let onChange: jest.Mock;

		beforeEach(() => {
			onChange = jest.fn();
		});

		test('should trigger onChange event when checkbox is clicked', () => {
			const view = renderCheckbox({ value: false, onChange });
			fireEvent.click(view);
			expect(onChange).toHaveBeenCalled();
		});

		test('should trigger onChange event when label is clicked', () => {
			renderCheckbox({ label: "Test Label", value: false, onChange });
			const label = screen.getByText('Test Label');
			fireEvent.click(label);
			expect(onChange).toHaveBeenCalled();
		});

		test('should not trigger onChange event when it is disabled', () => {
			const view = renderCheckbox({ disabled: true, value: false, onChange });
			fireEvent.click(view);
			expect(onChange).not.toHaveBeenCalled();
		});

		test('should have aria-checked="mixed" when indeterminate', () => {
			const view = renderCheckbox({ value: null });
			expect(view).toHaveAttribute('aria-checked', 'mixed');
		});
	});
});
