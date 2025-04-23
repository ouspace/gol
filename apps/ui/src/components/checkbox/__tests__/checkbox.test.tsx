import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Checkbox } from '../checkbox';

describe('Checkbox', () => {
	it('renders correctly when not checked', () => {
		render(<Checkbox checked={false} onChange={() => { /* No-op */ }} />);
		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).not.toBeChecked();
	});

	it('renders correctly when checked', () => {
		render(<Checkbox checked={true} onChange={() => { /* No-op */ }} />);
		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeChecked();
	});

	it('calls onChange with the new state when clicked', async () => {
		const user = userEvent.setup();
		const onChange = jest.fn();
		render(<Checkbox checked={false} onChange={onChange} />);
		const checkbox = screen.getByRole('checkbox');
		await user.click(checkbox);
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith(true);
	});
});