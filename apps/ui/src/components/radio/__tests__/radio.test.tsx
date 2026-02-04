import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Radio from '../radio';

const MockIcon = ({ fill }: { fill?: boolean }) => <i>{fill ? '✅' : '☐'}</i>;

describe('Components/radio', () => {
	describe('Layout', () => {
		test('should render with default properties', () => {
			render(<Radio />);
			const radio = screen.getByRole('radio');

			expect(radio).toBeInTheDocument();
			expect(radio).not.toBeChecked();
			expect(radio).not.toBeDisabled();
		});

		test('should generate id when not provided', () => {
			render(<Radio />);
			const radio = screen.getByRole('radio');

			expect(radio).toHaveAttribute('id', expect.stringMatching(/^radio-/));
		});

		test('should use provided id', () => {
			render(<Radio id='radio-id' />);
			const radio = screen.getByRole('radio');

			expect(radio).toHaveAttribute('id', 'radio-id');
		});

		test('should have name attribute when provided', () => {
			render(<Radio name='test-name' />);
			const radio = screen.getByRole('radio');

			expect(radio).toHaveAttribute('name', 'test-name');
		});

		test('should have value attribute when provided', () => {
			render(<Radio value='value-test' />);
			const radio = screen.getByRole('radio');

			expect(radio).toHaveAttribute('value', 'value-test');
		});

		test('should render as checked', () => {
			render(<Radio checked={true} />);
			const radio = screen.getByRole('radio');

			expect(radio).toBeChecked();
		});

		test('should render as disabled', () => {
			const { container } = render(<Radio disabled />);
			const radio = screen.getByRole('radio');
			const labelElement = container.querySelector('label');

			expect(radio).toBeDisabled();
			expect(labelElement).toHaveAttribute('aria-disabled', 'true');
		});

		test('should render as required', () => {
			render(<Radio required />);
			const radio = screen.getByRole('radio');

			expect(radio).toBeRequired();
		});

		test('should apply custom className', () => {
			const { container } = render(<Radio className='custom-className' />);
			const labelElement = container.querySelector('label');

			expect(labelElement).toHaveClass('radio', 'custom-className');
		});

		test('should render label as string', () => {
			render(<Radio label='label-test' />);
			const text = screen.getByText('label-test');

			expect(text).toBeInTheDocument();
		});

		test('should render label as TextProperties object', () => {
			render(<Radio label={{ content: 'label-test', color: 'blue' }} labelPosition='left' />);

			expect(screen.getByText('label-test')).toBeInTheDocument();
		});

		test('should render children as custom label content', () => {
			render(
				<Radio>
					<span>Custom content</span>
				</Radio>
			);

			expect(screen.getByText('Custom content')).toBeInTheDocument();
		});

		test('should allow clicking label to trigger change', () => {
			const handleClick = jest.fn();
			render(<Radio label='label-test' onChange={handleClick} />);

			fireEvent.click(screen.getByText('label-test'));

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		test('should render icon when not checked', () => {
			render(<Radio icon={<MockIcon />} checked={false} />);

			expect(screen.getByText('☐')).toBeInTheDocument();
			expect(screen.queryByText('✅')).not.toBeInTheDocument();
		});

		test('should render checkedIcon when checked', () => {
			render(<Radio icon={<MockIcon />} checkedIcon={<MockIcon fill />} checked={true} />);

			expect(screen.getByText('✅')).toBeInTheDocument();
			expect(screen.queryByText('☐')).not.toBeInTheDocument();
		});

		test('should support native HTML input element attributes', () => {
			const handleFocus = jest.fn();
			render(<Radio aria-label='Radio option' data-testid='native-radio' tabIndex={2} onFocus={handleFocus} />);

			const radio = screen.getByTestId('native-radio');

			expect(radio).toHaveAttribute('aria-label', 'Radio option');
			expect(radio).toHaveAttribute('tabIndex', '2');

			fireEvent.focus(radio);
			expect(handleFocus).toHaveBeenCalledTimes(1);
		});
	});

	describe('Events', () => {
		test('should execute onChange when clicked', () => {
			const handleClick = jest.fn();
			render(<Radio onChange={handleClick} />);

			fireEvent.click(screen.getByRole('radio'));

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		test('should pass event and properties to onChange', () => {
			const handleClick = jest.fn();
			render(<Radio value='value-test' onChange={handleClick} />);

			fireEvent.click(screen.getByRole('radio'));

			expect(handleClick).toHaveBeenCalledWith(
				expect.any(Object),
				expect.objectContaining({ value: 'value-test', checked: true })
			);
		});

		test('should not execute onChange when disabled', () => {
			const handleClick = jest.fn();
			render(<Radio disabled onChange={handleClick} />);

			fireEvent.click(screen.getByRole('radio'));
			expect(handleClick).not.toHaveBeenCalled();
		});
	});
});
