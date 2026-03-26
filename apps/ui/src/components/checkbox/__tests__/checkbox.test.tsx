import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from '../checkbox';

jest.mock('../../text/text');

const MockIcon = ({ fill }: { fill?: boolean }) => <i>{fill ? '✅' : '☐'}</i>;

describe('components/checkbox', () => {
	describe('Layout', () => {
		test('should be render by default', () => {
			// arrange(s)
			const component = <Checkbox />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(screen.getByRole('checkbox')).not.toBeChecked();
			expect(screen.getByRole('checkbox')).not.toBeDisabled();
		});

		test('should render with aria-checked attribute as false by default', () => {
			// arrange(s)
			const component = <Checkbox />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false');
		});

		test('should render the label text', () => {
			// arrange(s)
			const component = <Checkbox label='label test' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('label test')).toBeDefined();
			expect(screen.getByText('label test')).toBeInTheDocument();
		});

		test('should render as checked when value is true', () => {
			// arrange(s)
			const component = <Checkbox value={true} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(screen.getByRole('checkbox')).toBeChecked();
			expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
		});

		test('should render with indeterminate state when value is null', () => {
			// arrange(s)
			const component = <Checkbox value={null} />;

			// act(s)
			render(component);
			const checkbox = screen.getByRole<HTMLInputElement>('checkbox');

			// assert(s)
			expect(checkbox).toBeDefined();
			expect(checkbox.indeterminate).toBe(true);
			expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
			expect(checkbox).not.toBeChecked();
		});

		test('should render as disabled', () => {
			// arrange(s)
			const component = <Checkbox disabled />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(screen.getByRole('checkbox')).toBeDisabled();
		});

		test('should render with small size', () => {
			// arrange(s)
			const component = <Checkbox size='small' />;

			// act(s)
			const { container } = render(component);
			const labelElement = container.querySelector('label');

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(labelElement).toHaveClass('small');
		});

		test('should render with normal size', () => {
			// arrange(s)
			const component = <Checkbox size='normal' />;

			// act(s)
			const { container } = render(component);
			const labelElement = container.querySelector('label');

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(labelElement).toHaveClass('normal');
		});

		test('should render with big size', () => {
			// arrange(s)
			const component = <Checkbox size='big' />;

			// act(s)
			const { container } = render(component);
			const labelElement = container.querySelector('label');

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(labelElement).toHaveClass('big');
		});

		test('should render with circular styling', () => {
			// arrange(s)
			const component = <Checkbox circular />;

			// act(s)
			const { container } = render(component);
			const labelElement = container.querySelector('label');

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(labelElement).toHaveClass('circular');
		});

		test('should render with label on top', () => {
			// arrange(s)
			const component = <Checkbox label={{ content: 'label test', position: 'top' }} />;

			// act(s)
			const { container } = render(component);
			const labelElement = container.querySelector('label');

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(labelElement).toHaveClass('label-top');
		});

		test('should render with label on right', () => {
			// arrange(s)
			const component = <Checkbox label={{ content: 'label test', position: 'right' }} />;

			// act(s)
			const { container } = render(component);
			const labelElement = container.querySelector('label');

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(labelElement).toHaveClass('label-right');
		});

		test('should render with label on bottom', () => {
			// arrange(s)
			const component = <Checkbox label={{ content: 'label test', position: 'bottom' }} />;

			// act(s)
			const { container } = render(component);
			const labelElement = container.querySelector('label');

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(labelElement).toHaveClass('label-bottom');
		});

		test('should render with label on left', () => {
			// arrange(s)
			const component = <Checkbox label={{ content: 'label test', position: 'left' }} />;

			// act(s)
			const { container } = render(component);
			const labelElement = container.querySelector('label');

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(labelElement).toHaveClass('label-left');
		});

		test('should render with custom icons', () => {
			// arrange(s)
			const component = <Checkbox icon={<MockIcon />} checkedIcon={<MockIcon fill />} value={true} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(screen.getByRole('checkbox')).toBeChecked();
		});

		test('should render indeterminate when value is null and icons are provided', () => {
			// arrange(s)
			const component = <Checkbox icon={<MockIcon />} checkedIcon={<MockIcon fill />} value={null} />;

			// act(s)
			render(component);
			const checkbox = screen.getByRole<HTMLInputElement>('checkbox');

			// assert(s)
			expect(checkbox).toBeDefined();
			expect(checkbox.indeterminate).toBe(true);
		});

		test('should have proper id attribute when provided', () => {
			// arrange(s)
			const component = <Checkbox id='custom-id' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'custom-id');
		});

		test('should have proper name attribute when provided', () => {
			// arrange(s)
			const component = <Checkbox name='test' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'test');
		});

		test('should render label as TextProperties object', () => {
			// arrange(s)
			const component = <Checkbox label={{ content: 'styled label', color: 'red' }} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('styled label')).toBeDefined();
			expect(screen.getByText('styled label')).toBeInTheDocument();
		});

		test('should render label as ReactElement', () => {
			// arrange(s)
			const MockLabel = () => <em>React Element label</em>;
			const component = <Checkbox label={<MockLabel />} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('React Element label')).toBeDefined();
			expect(screen.getByText('React Element label')).toBeInTheDocument();
		});

		test('should render label as function returning ReactElement', () => {
			// arrange(s)
			const component = <Checkbox label={() => <em>Function Element</em>} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('Function Element')).toBeDefined();
			expect(screen.getByText('Function Element')).toBeInTheDocument();
		});

		test('should render children as custom label content', () => {
			// arrange(s)
			const component = (
				<Checkbox value={true}>
					<strong>Label text</strong>
				</Checkbox>
			);

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('Label text')).toBeDefined();
			expect(screen.getByText('Label text')).toBeInTheDocument();
		});

		test('should not render label slot when no label or children', () => {
			// arrange(s)
			const component = <Checkbox />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(container.querySelector('.checkbox__label')).not.toBeInTheDocument();
		});
	});

	describe('Events', () => {
		test('should execute onChange handler when clicked', () => {
			// arrange(s)
			const handleChange = jest.fn();
			const component = <Checkbox onChange={handleChange} />;

			// act(s)
			render(component);
			fireEvent.click(screen.getByRole('checkbox'));

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		test('should toggle when label is clicked', () => {
			// arrange(s)
			const handleChange = jest.fn();
			const component = <Checkbox label='label test' onChange={handleChange} />;

			// act(s)
			render(component);
			fireEvent.click(screen.getByText('label test'));

			// assert(s)
			expect(screen.getByText('label test')).toBeDefined();
			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		test('should toggle to unchecked when clicked and currently checked', () => {
			// arrange(s)
			const handleChange = jest.fn();
			const component = <Checkbox value={true} onChange={handleChange} />;

			// act(s)
			render(component);
			fireEvent.click(screen.getByRole('checkbox'));

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(handleChange).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ value: false }));
		});

		test('should toggle to checked when clicked and currently unchecked', () => {
			// arrange(s)
			const handleChange = jest.fn();
			const component = <Checkbox value={false} onChange={handleChange} />;

			// act(s)
			render(component);
			fireEvent.click(screen.getByRole('checkbox'));

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(handleChange).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ value: true }));
		});

		test('should pass event and properties to onChange handler', () => {
			// arrange(s)
			const handleChange = jest.fn();
			const component = <Checkbox label='label test' onChange={handleChange} />;

			// act(s)
			render(component);
			fireEvent.click(screen.getByRole('checkbox'));

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(handleChange).toHaveBeenCalledWith(
				expect.any(Object),
				expect.objectContaining({
					label: 'label test',
					value: true,
				})
			);
		});

		test('should not execute onChange handler when disabled and clicked', async () => {
			// arrange(s)
			const handleChange = jest.fn();
			const user = userEvent.setup();
			const component = <Checkbox disabled onChange={handleChange} />;

			// act(s)
			render(component);
			await user.click(screen.getByRole('checkbox'));

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(handleChange).not.toHaveBeenCalled();
		});

		test('should not execute onChange handler when disabled and label is clicked', async () => {
			// arrange(s)
			const handleChange = jest.fn();
			const user = userEvent.setup();
			const component = <Checkbox disabled label='label test' onChange={handleChange} />;

			// act(s)
			render(component);
			await user.click(screen.getByText('label test'));

			// assert(s)
			expect(screen.getByText('label test')).toBeDefined();
			expect(handleChange).not.toHaveBeenCalled();
		});

		test('should execute onChange handler when has custom icons and is clicked', () => {
			// arrange(s)
			const handleChange = jest.fn();
			const component = <Checkbox icon={<MockIcon />} checkedIcon={<MockIcon fill />} onChange={handleChange} />;

			// act(s)
			render(component);
			fireEvent.click(screen.getByRole('checkbox'));

			// assert(s)
			expect(screen.getByRole('checkbox')).toBeDefined();
			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ value: true }));
		});
	});
});
