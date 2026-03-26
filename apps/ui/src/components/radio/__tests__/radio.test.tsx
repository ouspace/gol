import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Radio from '../radio';

jest.mock('../../text/text');

const MockIcon = ({ fill }: { fill?: boolean }) => <i>{fill ? '✅' : '☐'}</i>;

describe('components/radio', () => {
	describe('Layout', () => {
		test('should render by default', () => {
			// arrange(s)
			const component = <Radio />;

			// act(s)
			const { container } = render(component);
			const labelElement = container.querySelector('label');

			// assert(s)
			expect(screen.getByRole('radio')).toBeDefined();
			expect(screen.getByRole('radio')).not.toBeChecked();
			expect(labelElement).toHaveClass('radio');
		});

		test('should generate id when not provided', () => {
			// arrange(s)
			const component = <Radio />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('radio')).toBeDefined();
			expect(screen.getByRole('radio')).toHaveAttribute('id', expect.stringMatching(/^radio-/));
		});

		test('should use provided id', () => {
			// arrange(s)
			const component = <Radio id='radio-id' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('radio')).toBeDefined();
			expect(screen.getByRole('radio')).toHaveAttribute('id', 'radio-id');
		});

		test('should have name attribute when provided', () => {
			// arrange(s)
			const component = <Radio name='test-name' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('radio')).toBeDefined();
			expect(screen.getByRole('radio')).toHaveAttribute('name', 'test-name');
		});

		test('should have value attribute when provided', () => {
			// arrange(s)
			const component = <Radio value='value-test' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('radio')).toBeDefined();
			expect(screen.getByRole('radio')).toHaveAttribute('value', 'value-test');
		});

		test('should render as checked', () => {
			// arrange(s)
			const component = <Radio checked={true} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('radio')).toBeDefined();
			expect(screen.getByRole('radio')).toBeChecked();
		});

		test('should render as disabled', () => {
			// arrange(s)
			const component = <Radio disabled />;

			// act(s)
			const { container } = render(component);
			const labelElement = container.querySelector('label');

			// assert(s)
			expect(screen.getByRole('radio')).toBeDefined();
			expect(screen.getByRole('radio')).toBeDisabled();
			expect(labelElement).toHaveAttribute('aria-disabled', 'true');
		});

		test('should render as required', () => {
			// arrange(s)
			const component = <Radio required />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('radio')).toBeDefined();
			expect(screen.getByRole('radio')).toBeRequired();
		});

		test('should apply custom className', () => {
			// arrange(s)
			const component = <Radio className='custom-className' />;

			// act(s)
			const { container } = render(component);
			const labelElement = container.querySelector('label');

			// assert(s)
			expect(screen.getByRole('radio')).toBeDefined();
			expect(labelElement).toHaveClass('radio', 'custom-className');
		});

		test('should render label as string', () => {
			// arrange(s)
			const component = <Radio label='label-test' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('label-test')).toBeDefined();
			expect(screen.getByText('label-test')).toBeInTheDocument();
		});

		test('should render label as TextProperties object', () => {
			// arrange(s)
			const component = <Radio label={{ content: 'label-test', color: 'blue' }} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('label-test')).toBeDefined();
			expect(screen.getByText('label-test')).toBeInTheDocument();
		});

		test('should render label as ReactElement', () => {
			// arrange(s)
			const MockLabel = () => <em>React Element label</em>;
			const component = <Radio label={<MockLabel />} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('React Element label')).toBeDefined();
			expect(screen.getByText('React Element label')).toBeInTheDocument();
		});

		test('should render label as function returning ReactElement', () => {
			// arrange(s)
			const component = <Radio label={() => <em>Function Element</em>} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('Function Element')).toBeDefined();
			expect(screen.getByText('Function Element')).toBeInTheDocument();
		});

		test('should render children as custom label content', () => {
			// arrange(s)
			const component = (
				<Radio>
					<span>Custom content</span>
				</Radio>
			);

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('Custom content')).toBeDefined();
			expect(screen.getByText('Custom content')).toBeInTheDocument();
		});

		test('should not render label slot when no label or children', () => {
			// arrange(s)
			const component = <Radio />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByRole('radio')).toBeDefined();
			expect(container.querySelector('.radio__label')).not.toBeInTheDocument();
		});

		test('should render icon when not checked', () => {
			// arrange(s)
			const component = <Radio icon={<MockIcon />} checked={false} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('☐')).toBeDefined();
			expect(screen.getByText('☐')).toBeInTheDocument();
			expect(screen.queryByText('✅')).not.toBeInTheDocument();
		});

		test('should render checkedIcon when checked', () => {
			// arrange(s)
			const component = <Radio icon={<MockIcon />} checkedIcon={<MockIcon fill />} checked={true} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('✅')).toBeDefined();
			expect(screen.getByText('✅')).toBeInTheDocument();
			expect(screen.queryByText('☐')).not.toBeInTheDocument();
		});

		test('should support native HTML input element attributes', () => {
			// arrange(s)
			const handleFocus = jest.fn();
			const component = (
				<Radio aria-label='Radio option' data-testid='native-radio' tabIndex={2} onFocus={handleFocus} />
			);

			// act(s)
			render(component);
			const radio = screen.getByTestId('native-radio');

			// assert(s)
			expect(radio).toBeDefined();
			expect(radio).toHaveAttribute('aria-label', 'Radio option');
			expect(radio).toHaveAttribute('tabIndex', '2');
		});
	});

	describe('Events', () => {
		test('should execute onChange when clicked', () => {
			// arrange(s)
			const handleChange = jest.fn();
			const component = <Radio onChange={handleChange} />;

			// act(s)
			render(component);
			fireEvent.click(screen.getByRole('radio'));

			// assert(s)
			expect(screen.getByRole('radio')).toBeDefined();
			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		test('should pass event and properties to onChange', () => {
			// arrange(s)
			const handleChange = jest.fn();
			const component = <Radio value='value-test' onChange={handleChange} />;

			// act(s)
			render(component);
			fireEvent.click(screen.getByRole('radio'));

			// assert(s)
			expect(screen.getByRole('radio')).toBeDefined();
			expect(handleChange).toHaveBeenCalledWith(
				expect.any(Object),
				expect.objectContaining({ value: 'value-test', checked: true })
			);
		});

		test('should allow clicking label to trigger change', () => {
			// arrange(s)
			const handleChange = jest.fn();
			const component = <Radio label='label-test' onChange={handleChange} />;

			// act(s)
			render(component);
			fireEvent.click(screen.getByText('label-test'));

			// assert(s)
			expect(screen.getByText('label-test')).toBeDefined();
			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		test('should not execute onChange when disabled', async () => {
			// arrange(s)
			const handleChange = jest.fn();
			const user = userEvent.setup();
			const component = <Radio disabled onChange={handleChange} />;

			// act(s)
			render(component);
			await user.click(screen.getByRole('radio'));

			// assert(s)
			expect(screen.getByRole('radio')).toBeDefined();
			expect(handleChange).not.toHaveBeenCalled();
		});
	});
});
