import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Radio from '../root';

jest.mock('../../text/root');
jest.mock('../../icon/root');

describe('components/radio', () => {
	describe('Layout', () => {
		test('should render by default', () => {
			const component = <Radio />;

			const { container } = render(component);

			expect(screen.getByRole('radio')).toBeInTheDocument();
			expect(screen.getByRole('radio')).not.toBeChecked();
			expect(container.firstChild).toHaveClass('radio');
		});

		test('should generate id when not provided', () => {
			const component = <Radio />;

			render(component);

			expect(screen.getByRole('radio')).toHaveAttribute('id', expect.stringMatching(/^radio-/));
		});

		test('should use provided id', () => {
			const component = <Radio id='radio-id' />;

			render(component);

			expect(screen.getByRole('radio')).toHaveAttribute('id', 'radio-id');
		});

		test('should have name attribute when provided', () => {
			const component = <Radio name='test-name' />;

			render(component);

			expect(screen.getByRole('radio')).toHaveAttribute('name', 'test-name');
		});

		test('should have value attribute when provided', () => {
			const component = <Radio value='value-test' />;

			render(component);

			expect(screen.getByRole('radio')).toHaveAttribute('value', 'value-test');
		});

		test('should render as checked', () => {
			const component = <Radio checked={true} />;

			render(component);

			expect(screen.getByRole('radio')).toBeChecked();
		});

		test('should render as disabled', () => {
			const component = <Radio disabled />;

			const { container } = render(component);

			expect(screen.getByRole('radio')).toBeDisabled();
			expect(container.firstChild).toHaveAttribute('aria-disabled', 'true');
		});

		test('should render as required', () => {
			const component = <Radio required />;

			render(component);

			expect(screen.getByRole('radio')).toBeRequired();
		});

		test('should apply custom className', () => {
			const component = <Radio className='custom-className' />;

			const { container } = render(component);

			expect(container.firstChild).toHaveClass('radio', 'custom-className');
		});

		test('should render label as string', () => {
			const component = <Radio label='label-test' />;

			render(component);

			expect(screen.getByText('label-test')).toBeInTheDocument();
		});

		test('should render label as TextProperties object', () => {
			const component = <Radio label={{ content: 'label-test', color: 'blue' }} />;

			render(component);

			expect(screen.getByText('label-test')).toBeInTheDocument();
		});

		test('should render label as ReactElement', () => {
			const MockLabel = () => <em>React Element label</em>;
			const component = <Radio label={<MockLabel />} />;

			render(component);

			expect(screen.getByText('React Element label')).toBeInTheDocument();
		});

		test('should render label as function returning ReactElement', () => {
			const component = <Radio label={() => <em>Function Element</em>} />;

			render(component);

			expect(screen.getByText('Function Element')).toBeInTheDocument();
		});

		test('should render children as custom label content', () => {
			const component = (
				<Radio>
					<span>Custom content</span>
				</Radio>
			);

			render(component);

			expect(screen.getByText('Custom content')).toBeInTheDocument();
		});

		test('should not render label slot when no label or children', () => {
			const component = <Radio />;

			const { container } = render(component);

			expect(container.querySelector('.label')).not.toBeInTheDocument();
		});

		test('should render icon when not checked', () => {
			const component = <Radio icon={{ name: 'radio_button_unchecked' }} checked={false} />;

			render(component);

			expect(screen.getByText('radio_button_unchecked')).toBeInTheDocument();
			expect(screen.queryByText('radio_button_checked')).not.toBeInTheDocument();
		});

		test('should render checkedIcon when checked', () => {
			const component = (
				<Radio
					icon={{ name: 'radio_button_unchecked' }}
					checkedIcon={{ name: 'radio_button_checked', fill: true }}
					checked={true}
				/>
			);

			render(component);

			expect(screen.getByText('radio_button_checked')).toBeInTheDocument();
			expect(screen.queryByText('radio_button_unchecked')).not.toBeInTheDocument();
		});

		test('should support native HTML input element attributes', () => {
			const handleFocus = jest.fn();
			const component = (
				<Radio aria-label='Radio option' data-testid='native-radio' tabIndex={2} onFocus={handleFocus} />
			);

			render(component);
			const radio = screen.getByTestId('native-radio');

			expect(radio).toHaveAttribute('aria-label', 'Radio option');
			expect(radio).toHaveAttribute('tabIndex', '2');
		});
	});

	describe('Events', () => {
		test('should execute onChange when clicked', () => {
			const handleChange = jest.fn();
			const component = <Radio onChange={handleChange} />;

			render(component);
			fireEvent.click(screen.getByRole('radio'));

			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		test('should pass event and properties to onChange', () => {
			const handleChange = jest.fn();
			const component = <Radio value='value-test' onChange={handleChange} />;

			render(component);
			fireEvent.click(screen.getByRole('radio'));

			expect(handleChange).toHaveBeenCalledWith(
				expect.any(Object),
				expect.objectContaining({ value: 'value-test', checked: true })
			);
		});

		test('should allow clicking label to trigger change', () => {
			const handleChange = jest.fn();
			const component = <Radio label='label-test' onChange={handleChange} />;

			render(component);
			fireEvent.click(screen.getByText('label-test'));

			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		test('should not execute onChange when disabled', async () => {
			const handleChange = jest.fn();
			const user = userEvent.setup();
			const component = <Radio disabled onChange={handleChange} />;

			render(component);
			await user.click(screen.getByRole('radio'));

			expect(handleChange).not.toHaveBeenCalled();
		});
	});
});
