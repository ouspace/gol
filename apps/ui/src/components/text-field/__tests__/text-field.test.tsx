import '@testing-library/jest-dom';
import { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from '../index';

jest.mock('../../text/text');
jest.mock('../../icon/root');

describe('components/text-field', () => {
	describe('Layout', () => {
		test('should render by default', () => {
			// arrange(s)
			const component = <TextField />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByRole('textbox')).toBeDefined();
			expect(screen.getByRole('textbox')).toBeInTheDocument();
			expect(container.firstChild).toHaveClass('text-field');
			expect(container.firstChild).toHaveClass('filled');
		});

		test('should render with outlined variant', () => {
			// arrange(s)
			const component = <TextField variant='outlined' />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(container.firstChild).toBeDefined();
			expect(container.firstChild).toHaveClass('outlined');
		});

		test('should render as disabled', () => {
			// arrange(s)
			const component = <TextField disabled />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByRole('textbox')).toBeDefined();
			expect(screen.getByRole('textbox')).toBeDisabled();
			expect(container.firstChild).toHaveClass('disabled');
		});

		test('should render as read-only', () => {
			// arrange(s)
			const component = <TextField readOnly />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByRole('textbox')).toBeDefined();
			expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
			expect(container.firstChild).toHaveClass('read-only');
		});

		test('should render with error state', () => {
			// arrange(s)
			const component = <TextField error />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByRole('textbox')).toBeDefined();
			expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
			expect(container.firstChild).toHaveClass('error');
		});

		test('should apply custom className', () => {
			// arrange(s)
			const component = <TextField className='custom-class' />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(container.firstChild).toBeDefined();
			expect(container.firstChild).toHaveClass('text-field', 'custom-class');
		});

		test('should render label as string', () => {
			// arrange(s)
			const component = <TextField label='Username' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('Username')).toBeDefined();
			expect(screen.getByText('Username')).toBeInTheDocument();
		});

		test('should render label as ReactElement', () => {
			// arrange(s)
			const MockLabel = () => <em>React Element label</em>;
			const component = <TextField label={<MockLabel />} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('React Element label')).toBeDefined();
			expect(screen.getByText('React Element label')).toBeInTheDocument();
		});

		test('should render label as function', () => {
			// arrange(s)
			const component = <TextField label={() => <em>Function label</em>} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('Function label')).toBeDefined();
			expect(screen.getByText('Function label')).toBeInTheDocument();
		});

		test('should render asterisk when required', () => {
			// arrange(s)
			const component = <TextField label='Email' required />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(container.querySelector('.asterisk')).toBeDefined();
			expect(container.querySelector('.asterisk')).toBeInTheDocument();
		});

		test('should not render asterisk when asterisk is false', () => {
			// arrange(s)
			const component = <TextField label='Email' required asterisk={false} />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(container.querySelector('.asterisk')).toBeNull();
		});

		test('should render prefix text', () => {
			// arrange(s)
			const component = <TextField prefixText='$' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('$')).toBeDefined();
			expect(screen.getByText('$')).toBeInTheDocument();
		});

		test('should render suffix text', () => {
			// arrange(s)
			const component = <TextField suffixText='Kg.' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('Kg.')).toBeDefined();
			expect(screen.getByText('Kg.')).toBeInTheDocument();
		});

		test('should render leading icon', () => {
			// arrange(s)
			const component = <TextField icon={{ name: '1k' }} />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(container.querySelector('.icon.left')).toBeDefined();
			expect(container.querySelector('.icon.left')).toBeInTheDocument();
		});

		test('should render trailing icon', () => {
			// arrange(s)
			const component = <TextField icon={{ name: '1k', position: 'right' }} />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(container.querySelector('.icon.right')).toBeDefined();
			expect(container.querySelector('.icon.right')).toBeInTheDocument();
		});

		test('should render supporting text', () => {
			// arrange(s)
			const component = <TextField supportingText='Helper message' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('Helper message')).toBeDefined();
			expect(screen.getByText('Helper message')).toBeInTheDocument();
		});

		test('should render error text when error is true', () => {
			// arrange(s)
			const component = <TextField error errorText='This field is required' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('This field is required')).toBeDefined();
			expect(screen.getByText('This field is required')).toBeInTheDocument();
		});

		test('should hide supporting text when error is true', () => {
			// arrange(s)
			const component = <TextField error supportingText='Helper message' errorText='This field is required' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.queryByText('Helper message')).not.toBeInTheDocument();
			expect(screen.getByText('This field is required')).toBeInTheDocument();
		});

		test('should render textarea when type is textarea', () => {
			// arrange(s)
			const component = <TextField type='textarea' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('textbox')).toBeInstanceOf(HTMLTextAreaElement);
		});

		test('should pass rows and cols to textarea', () => {
			// arrange(s)
			const component = <TextField type='textarea' rows={4} cols={10} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('textbox')).toBeDefined();
			expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4');
			expect(screen.getByRole('textbox')).toHaveAttribute('cols', '10');
		});

		test('should render with defaultValue', () => {
			// arrange(s)
			const component = <TextField defaultValue='initial value' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('textbox')).toBeDefined();
			expect(screen.getByRole('textbox')).toHaveValue('initial value');
		});

		test('should render with type password', () => {
			// arrange(s)
			const component = <TextField type='password' />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(container.querySelector('input[type="password"]')).toBeDefined();
			expect(container.querySelector('input[type="password"]')).toBeInTheDocument();
		});

		test('should pass max, min and step to number input', () => {
			// arrange(s)
			const component = <TextField type='number' max='100' min='0' step='5' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('spinbutton')).toBeDefined();
			expect(screen.getByRole('spinbutton')).toHaveAttribute('max', '100');
			expect(screen.getByRole('spinbutton')).toHaveAttribute('min', '0');
			expect(screen.getByRole('spinbutton')).toHaveAttribute('step', '5');
		});

		test('should apply no-spinner class when type is number and spinner is false', () => {
			// arrange(s)
			const component = <TextField type='number' spinner={false} />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByRole('spinbutton')).toBeDefined();
			expect(container.firstChild).toHaveClass('no-spinner');
		});

		test('should pass maxLength and minLength to email input', () => {
			// arrange(s)
			const component = <TextField type='email' maxLength={50} minLength={5} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('textbox')).toBeDefined();
			expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '50');
			expect(screen.getByRole('textbox')).toHaveAttribute('minLength', '5');
		});

		test('should render placeholder', () => {
			// arrange(s)
			const component = <TextField placeholder='Enter text...' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('textbox')).toBeDefined();
			expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Enter text...');
		});

		test('should support native HTML input element attributes', () => {
			// arrange(s)
			const handleFocus = jest.fn();
			const component = (
				<TextField aria-label='Text input' data-testid='native-text-field' tabIndex={2} onFocus={handleFocus} />
			);

			// act(s)
			render(component);
			const input = screen.getByTestId('native-text-field');

			// assert(s)
			expect(input).toBeDefined();
			expect(input).toHaveAttribute('aria-label', 'Text input');
			expect(input).toHaveAttribute('tabIndex', '2');
		});

		test('should render custom icon as ReactNode with Icon.createFrom', () => {
			// arrange(s)
			const component = <TextField icon={{ name: '1k' }} />;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(container.querySelector('.icon.left')).toBeInTheDocument();
		});

		test('should forward ref to input', () => {
			// arrange(s)
			const reference = createRef<HTMLInputElement | HTMLTextAreaElement>();
			const component = <TextField ref={reference} />;

			// act(s)
			render(component);

			// assert(s)
			expect(reference.current).toBeInstanceOf(HTMLInputElement);
		});

		test('should render as controlled when value is provided', () => {
			// arrange(s)
			const handleChange = jest.fn();
			const component = <TextField value='hello' onChange={handleChange} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('textbox')).toHaveValue('hello');
		});
	});

	describe('Events', () => {
		test('should call onChange when value changes', () => {
			// arrange(s)
			const handleChange = jest.fn();
			const component = <TextField onChange={handleChange} />;

			// act(s)
			render(component);
			fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } });

			// assert(s)
			expect(screen.getByRole('textbox')).toBeDefined();
			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		test('should pass event and properties to onChange', () => {
			// arrange(s)
			const handleChange = jest.fn();
			const component = <TextField name='username' onChange={handleChange} />;

			// act(s)
			render(component);
			fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } });

			// assert(s)
			expect(screen.getByRole('textbox')).toBeDefined();
			expect(handleChange).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ name: 'username' }));
		});

		test('should not call onChange when disabled', async () => {
			// arrange(s)
			const handleChange = jest.fn();
			const user = userEvent.setup();
			const component = <TextField disabled onChange={handleChange} />;

			// act(s)
			render(component);
			await user.type(screen.getByRole('textbox'), 'hello');

			// assert(s)
			expect(screen.getByRole('textbox')).toBeDefined();
			expect(handleChange).not.toHaveBeenCalled();
		});

		test('should pass user properties to onChange as second arg', () => {
			// arrange(s)
			const handleChange = jest.fn();
			const component = <TextField name='username' onChange={handleChange} />;

			// act(s)
			render(component);
			fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } });

			// assert(s)
			expect(handleChange).toHaveBeenCalledWith(
				expect.any(Object),
				expect.objectContaining({ name: 'username', onChange: handleChange })
			);
			expect(handleChange).toHaveBeenCalledWith(
				expect.any(Object),
				expect.not.objectContaining({ variant: expect.anything() as unknown, type: expect.anything() as unknown })
			);
		});
	});
});
