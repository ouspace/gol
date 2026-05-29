import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import { Checkbox } from '../index';

jest.mock('../../text/root');
jest.mock('../../icon/root');

const getCheckbox = () => screen.getByRole<HTMLInputElement>('checkbox');

describe('apps/ui/src/components/checkbox', () => {
	describe('layouts', () => {
		test('should be render by default', () => {
			const target = <Checkbox />;

			render(target);
			const checkbox = getCheckbox();

			expect(checkbox).toBeDefined();
			expect(checkbox).not.toBeChecked();
			expect(checkbox).not.toBeDisabled();
		});

		test('should render with aria-checked attribute as false by default', () => {
			const target = <Checkbox />;

			render(target);
			const checkbox = getCheckbox();

			expect(checkbox).toBeDefined();
			expect(checkbox).toHaveAttribute('aria-checked', 'false');
		});

		test('should render the label text', () => {
			const target = <Checkbox label='label test' />;

			render(target);
			const label = screen.getByText('label test');

			expect(label).toBeDefined();
			expect(label).toBeInTheDocument();
		});

		test('should render as checked when value is true', () => {
			const target = <Checkbox value={true} />;

			render(target);
			const checkbox = getCheckbox();

			expect(checkbox).toBeDefined();
			expect(checkbox).toBeChecked();
			expect(checkbox).toHaveAttribute('aria-checked', 'true');
		});

		test('should render with indeterminate state when value is null', () => {
			const target = <Checkbox value={null} />;

			render(target);
			const checkbox = getCheckbox();

			expect(checkbox).toBeDefined();
			expect(checkbox.indeterminate).toBe(true);
			expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
			expect(checkbox).not.toBeChecked();
		});

		test('should render as disabled', () => {
			const target = <Checkbox disabled />;

			render(target);
			const checkbox = getCheckbox();

			expect(checkbox).toBeDefined();
			expect(checkbox).toBeDisabled();
		});

		test('should render with small size', () => {
			const target = <Checkbox size='small' />;

			const { container } = render(target);

			expect(getCheckbox()).toBeDefined();
			expect(container.firstChild).toHaveClass('small');
		});

		test('should render with normal size', () => {
			const target = <Checkbox size='normal' />;

			const { container } = render(target);

			expect(getCheckbox()).toBeDefined();
			expect(container.firstChild).toHaveClass('normal');
		});

		test('should render with big size', () => {
			const target = <Checkbox size='big' />;

			const { container } = render(target);

			expect(getCheckbox()).toBeDefined();
			expect(container.firstChild).toHaveClass('big');
		});

		test('should render with circular styling', () => {
			const target = <Checkbox circular />;

			const { container } = render(target);

			expect(getCheckbox()).toBeDefined();
			expect(container.firstChild).toHaveClass('circular');
		});

		test('should render with label on top', () => {
			const target = <Checkbox label={{ content: 'label test', position: 'top' }} />;

			const { container } = render(target);

			expect(getCheckbox()).toBeDefined();
			expect(container.firstChild).toHaveClass('top');
		});

		test('should render with label on right', () => {
			const target = <Checkbox label={{ content: 'label test', position: 'right' }} />;

			const { container } = render(target);

			expect(getCheckbox()).toBeDefined();
			expect(container.firstChild).toHaveClass('right');
		});

		test('should render with label on bottom', () => {
			const target = <Checkbox label={{ content: 'label test', position: 'bottom' }} />;

			const { container } = render(target);

			expect(getCheckbox()).toBeDefined();
			expect(container.firstChild).toHaveClass('bottom');
		});

		test('should render with label on left', () => {
			const target = <Checkbox label={{ content: 'label test', position: 'left' }} />;

			const { container } = render(target);

			expect(getCheckbox()).toBeDefined();
			expect(container.firstChild).toHaveClass('left');
		});

		test('should render with custom icons', () => {
			const target = (
				<Checkbox icon={{ name: 'favorite' }} checkedIcon={{ name: 'favorite', fill: true }} value={true} />
			);

			render(target);
			const checkbox = getCheckbox();

			expect(checkbox).toBeDefined();
			expect(checkbox).toBeChecked();
		});

		test('should render indeterminate when value is null and icons are provided', () => {
			const target = (
				<Checkbox icon={{ name: 'favorite' }} checkedIcon={{ name: 'favorite', fill: true }} value={null} />
			);

			render(target);
			const checkbox = getCheckbox();

			expect(checkbox).toBeDefined();
			expect(checkbox.indeterminate).toBe(true);
		});

		test('should have proper id attribute when provided', () => {
			const target = <Checkbox id='custom-id' />;

			render(target);
			const checkbox = getCheckbox();

			expect(checkbox).toBeDefined();
			expect(checkbox).toHaveAttribute('id', 'custom-id');
		});

		test('should have proper name attribute when provided', () => {
			const target = <Checkbox name='test' />;

			render(target);
			const checkbox = getCheckbox();

			expect(checkbox).toBeDefined();
			expect(checkbox).toHaveAttribute('name', 'test');
		});

		test('should render label as TextProperties object', () => {
			const target = <Checkbox label={{ content: 'styled label', color: 'red' }} />;

			render(target);
			const label = screen.getByText('styled label');

			expect(label).toBeDefined();
			expect(label).toBeInTheDocument();
		});

		test('should render label as ReactElement', () => {
			const MockLabel = () => <em>React Element label</em>;
			const target = <Checkbox label={<MockLabel />} />;

			render(target);
			const label = screen.getByText('React Element label');

			expect(label).toBeDefined();
			expect(label).toBeInTheDocument();
		});

		test('should render label as function returning ReactElement', () => {
			const target = <Checkbox label={() => <em>Function Element</em>} />;

			render(target);
			const label = screen.getByText('Function Element');

			expect(label).toBeDefined();
			expect(label).toBeInTheDocument();
		});

		test('should render children as custom label content', () => {
			const target = (
				<Checkbox value={true}>
					<strong>Label text</strong>
				</Checkbox>
			);

			render(target);
			const label = screen.getByText('Label text');

			expect(label).toBeDefined();
			expect(label).toBeInTheDocument();
		});

		test('should not render label slot when no label or children', () => {
			const target = <Checkbox />;

			const { container } = render(target);

			expect(getCheckbox()).toBeDefined();
			expect(container.querySelector('.label')).not.toBeInTheDocument();
		});

		test('should inject CSS variables via inline style when size and color are provided', () => {
			const target = <Checkbox size='big' color='red' />;

			const { container } = render(target);

			expect(container.firstChild).toHaveStyle({
				'--checkbox-size-inject': '22px',
				'--checkbox-color-inject': 'red',
			});
		});

		test('should merge consumer style with CSS variables', () => {
			const target = <Checkbox size='normal' color='blue' style={{ margin: '10px' }} />;

			const { container } = render(target);

			expect(container.firstChild).toHaveStyle({
				'--checkbox-size-inject': '18px',
				'--checkbox-color-inject': 'blue',
				margin: '10px',
			});
		});

		test('should auto-generate ID when no id prop provided', () => {
			const target = <Checkbox />;

			render(target);
			const checkbox = getCheckbox();

			expect(checkbox).toBeDefined();
			expect(checkbox.id).toBeTruthy();
		});

		test('should use explicit id prop over generated ID', () => {
			const target = <Checkbox id='explicit-id' />;

			render(target);
			const checkbox = getCheckbox();

			expect(checkbox).toBeDefined();
			expect(checkbox).toHaveAttribute('id', 'explicit-id');
		});

		test('should have aria-label fallback when no label provided', () => {
			const target = <Checkbox />;

			render(target);
			const checkbox = getCheckbox();

			expect(checkbox).toBeDefined();
			expect(checkbox).toHaveAttribute('aria-label', 'Checkbox');
		});

		test('should not have aria-label when label is provided', () => {
			const target = <Checkbox label='Visible label' />;

			render(target);
			const checkbox = getCheckbox();

			expect(checkbox).toBeDefined();
			expect(checkbox).not.toHaveAttribute('aria-label');
		});

		test('should attach ref to root label element', () => {
			const reference = createRef<HTMLLabelElement>();
			const target = <Checkbox ref={reference} />;

			render(target);

			expect(reference.current).toBeDefined();
			expect(reference.current).toBeInstanceOf(HTMLLabelElement);
			expect(reference.current?.tagName).toBe('LABEL');
		});

		test('should render as disabled when disabled is explicitly true', () => {
			const target = <Checkbox disabled={true} aria-label='test' />;

			render(target);
			const checkbox = getCheckbox();

			expect(checkbox).toBeDefined();
			expect(checkbox).toBeDisabled();
		});
	});

	describe('events', () => {
		test('should execute onChange handler when clicked', () => {
			const handleChange = jest.fn();
			const target = <Checkbox onChange={handleChange} />;

			render(target);
			fireEvent.click(getCheckbox());

			expect(getCheckbox()).toBeDefined();
			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		test('should toggle when label is clicked', () => {
			const handleChange = jest.fn();
			const target = <Checkbox label='label test' onChange={handleChange} />;

			render(target);
			fireEvent.click(screen.getByText('label test'));

			expect(screen.getByText('label test')).toBeDefined();
			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		test('should toggle to unchecked when clicked and currently checked', () => {
			const handleChange = jest.fn();
			const target = <Checkbox value={true} onChange={handleChange} />;

			render(target);
			fireEvent.click(getCheckbox());

			expect(getCheckbox()).toBeDefined();
			expect(handleChange).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ value: false }));
		});

		test('should toggle to checked when clicked and currently unchecked', () => {
			const handleChange = jest.fn();
			const target = <Checkbox value={false} onChange={handleChange} />;

			render(target);
			fireEvent.click(getCheckbox());

			expect(getCheckbox()).toBeDefined();
			expect(handleChange).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ value: true }));
		});

		test('should pass event and properties to onChange handler', () => {
			const handleChange = jest.fn();
			const target = <Checkbox label='label test' onChange={handleChange} />;

			render(target);
			fireEvent.click(getCheckbox());

			expect(getCheckbox()).toBeDefined();
			expect(handleChange).toHaveBeenCalledWith(
				expect.any(Object),
				expect.objectContaining({
					label: 'label test',
					value: true,
				})
			);
		});

		test('should not execute onChange handler when disabled and clicked', async () => {
			const handleChange = jest.fn();
			const user = userEvent.setup();
			const target = <Checkbox disabled onChange={handleChange} />;

			render(target);
			await user.click(getCheckbox());

			expect(getCheckbox()).toBeDefined();
			expect(handleChange).not.toHaveBeenCalled();
		});

		test('should not execute onChange handler when disabled and label is clicked', async () => {
			const handleChange = jest.fn();
			const user = userEvent.setup();
			const target = <Checkbox disabled label='label test' onChange={handleChange} />;

			render(target);
			await user.click(screen.getByText('label test'));

			expect(screen.getByText('label test')).toBeDefined();
			expect(handleChange).not.toHaveBeenCalled();
		});

		test('should execute onChange handler when has custom icons and is clicked', () => {
			const handleChange = jest.fn();
			const target = (
				<Checkbox icon={{ name: 'favorite' }} checkedIcon={{ name: 'favorite', fill: true }} onChange={handleChange} />
			);

			render(target);
			fireEvent.click(getCheckbox());

			expect(getCheckbox()).toBeDefined();
			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ value: true }));
		});
	});
});
