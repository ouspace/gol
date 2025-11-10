import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../checkbox';

const MockIcon = ({ fill }: { fill?: boolean }) => <i>{fill ? '✅' : '☐'}</i>;

describe('components/checkbox', () => {
	describe('Layout', () => {
		test('should render with default properties', () => {
			render(<Checkbox />);
			const checkbox = screen.getByRole('checkbox');

			expect(checkbox).toBeInTheDocument();
			expect(checkbox).not.toBeChecked();
			expect(checkbox).not.toBeDisabled();
		});

		test('should render with aria-checked attribute as false by default', () => {
			render(<Checkbox />);
			const checkbox = screen.getByRole('checkbox');

			expect(checkbox).toHaveAttribute('aria-checked', 'false');
		});

		test('should render the label text', () => {
			render(<Checkbox label="label test" />);

			expect(screen.getByText('label test')).toBeInTheDocument();
		});

		test('should render as checked when value is true', () => {
			render(<Checkbox value={true} />);
			const checkbox = screen.getByRole('checkbox');

			expect(checkbox).toBeChecked();
			expect(checkbox).toHaveAttribute('aria-checked', 'true');
		});

		test('should render with indeterminate state when value is null', () => {
			render(<Checkbox value={null} />);
			const checkbox = screen.getByRole<HTMLInputElement>('checkbox');

			expect(checkbox.indeterminate).toBe(true);
			expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
			expect(checkbox).not.toBeChecked();
		});

		test('should render as disabled', () => {
			render(<Checkbox disabled />);
			const checkbox = screen.getByRole('checkbox');

			expect(checkbox).toBeDisabled();
		});

		test('should render with small size', () => {
			const { container } = render(<Checkbox size="small" />);
			const labelElement = container.querySelector('label');

			expect(labelElement).toHaveClass('small');
		});

		test('should render with normal size', () => {
			const { container } = render(<Checkbox size="normal" />);
			const labelElement = container.querySelector('label');

			expect(labelElement).toHaveClass('normal');
		});

		test('should render with big size', () => {
			const { container } = render(<Checkbox size="big" />);
			const labelElement = container.querySelector('label');

			expect(labelElement).toHaveClass('big');
		});

		test('should render with circular styling', () => {
			const { container } = render(<Checkbox circular />);
			const labelElement = container.querySelector('label');

			expect(labelElement).toHaveClass('circular');
		});

		test('should render with label on top', () => {
			const { container } = render(<Checkbox label={{ value: "label test", position: "top" }} />);
			const labelElement = container.querySelector('label');

			expect(labelElement).toHaveClass('label-top');
		});

		test('should render with label on right', () => {
			const { container } = render(<Checkbox label={{ value: "label test", position: "right" }} />);
			const labelElement = container.querySelector('label');

			expect(labelElement).toHaveClass('label-right');
		});

		test('should render with label on bottom', () => {
			const { container } = render(<Checkbox label={{ value: "label test", position: "bottom" }} />);
			const labelElement = container.querySelector('label');

			expect(labelElement).toHaveClass('label-bottom');
		});

		test('should render with label on left', () => {
			const { container } = render(<Checkbox label={{ value: "label test", position: "left" }} />);
			const labelElement = container.querySelector('label');

			expect(labelElement).toHaveClass('label-left');
		});

		test('should render with custom icons', () => {
			render(
				<Checkbox
					icon={<MockIcon />}
					checkedIcon={<MockIcon fill />}
					value={true}
				/>
			);
			const checkbox = screen.getByRole('checkbox');

			expect(checkbox).toBeInTheDocument();
			expect(checkbox).toBeChecked();
		});

		test('should render indeterminate when value is null and icons are provided', () => {
			render(
				<Checkbox
					icon={<MockIcon />}
					checkedIcon={<MockIcon fill />}
					value={null}
				/>
			);
			const checkbox = screen.getByRole<HTMLInputElement>('checkbox');

			expect(checkbox.indeterminate).toBe(true);
		});

		test('should have proper id attribute when provided', () => {
			render(<Checkbox id="custom-id" />);
			const checkbox = screen.getByRole('checkbox');

			expect(checkbox).toHaveAttribute('id', 'custom-id');
		});

		test('should have proper name attribute when provided', () => {
			render(<Checkbox name="test" />);
			const checkbox = screen.getByRole('checkbox');

			expect(checkbox).toHaveAttribute('name', 'test');
		});

		test('should render with TextProperties label with color', () => {
			const { container } = render(
				<Checkbox label={{ value: "Colored label", position: "right", color: "red" }} value={true} />
			);
			const labelSpan = container.querySelector('.checkbox__label');

			expect(labelSpan).toHaveTextContent('Colored label');
			expect(labelSpan).toHaveStyle({ color: 'rgb(255, 0, 0)' });
		});

		test('should render with TextProperties label with className', () => {
			const { container } = render(
				<Checkbox label={{ value: "Custom class label", className: "custom-label" }} value={true} />
			);
			const labelSpan = container.querySelector('.checkbox__label');

			expect(labelSpan).toHaveClass('custom-label');
		});

		test('should render with ReactNode label', () => {
			render(<Checkbox label={<strong>Label text</strong>} value={true} />);

			expect(screen.getByText('Label text')).toBeInTheDocument();
		});
	});

	describe('Events', () => {
		test('should execute onChange handler when clicked', () => {
			const handleChange = jest.fn();
			render(<Checkbox onChange={handleChange} />);

			fireEvent.click(screen.getByRole('checkbox'));

			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		test('should toggle when label is clicked', () => {
			const handleChange = jest.fn();
			render(<Checkbox label="label test" onChange={handleChange} />);

			fireEvent.click(screen.getByText('label test'));

			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		test('should toggle to unchecked when clicked and currently checked', () => {
			const handleChange = jest.fn();
			render(<Checkbox value={true} onChange={handleChange} />);

			fireEvent.click(screen.getByRole('checkbox'));

			expect(handleChange).toHaveBeenCalledWith(
				expect.any(Object),
				expect.objectContaining({ value: false })
			);
		});

		test('should toggle to checked when clicked and currently unchecked', () => {
			const handleChange = jest.fn();
			render(<Checkbox value={false} onChange={handleChange} />);

			fireEvent.click(screen.getByRole('checkbox'));

			expect(handleChange).toHaveBeenCalledWith(
				expect.any(Object),
				expect.objectContaining({ value: true })
			);
		});

		test('should pass event and properties to onChange handler', () => {
			const handleChange = jest.fn();
			render(<Checkbox label="label test" onChange={handleChange} />);

			fireEvent.click(screen.getByRole('checkbox'));

			expect(handleChange).toHaveBeenCalledWith(
				expect.any(Object),
				expect.objectContaining({
					label: 'label test',
					value: true
				})
			);
		});

		test('should not execute onChange handler when disabled and clicked', () => {
			const handleChange = jest.fn();
			render(<Checkbox disabled onChange={handleChange} />);

			fireEvent.click(screen.getByRole('checkbox'));

			expect(handleChange).not.toHaveBeenCalled();
		});

		test('should not execute onChange handler when disabled and label is clicked', () => {
			const handleChange = jest.fn();
			render(<Checkbox disabled label="label test" onChange={handleChange} />);

			fireEvent.click(screen.getByText('label test'));

			expect(handleChange).not.toHaveBeenCalled();
		});

		test('should execute onChange handler when has custom icons and is clicked', () => {
			const handleChange = jest.fn();
			render(
				<Checkbox
					icon={<MockIcon />}
					checkedIcon={<MockIcon fill />}
					onChange={handleChange}
				/>
			);

			fireEvent.click(screen.getByRole('checkbox'));

			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenCalledWith(
				expect.any(Object),
				expect.objectContaining({ value: true })
			);
		});
	});
});
