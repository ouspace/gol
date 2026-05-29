import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, type SyntheticEvent } from 'react';

import { Chip } from '../index';

jest.mock('../../text/root');
jest.mock('../../icon/root');

describe('components/chip', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('Layout', () => {
		test('should render by default', () => {
			const component = <Chip>Test Chip</Chip>;

			const { container } = render(component);

			expect(screen.getByText('Test Chip')).toBeInTheDocument();
			expect(container.firstChild).toHaveClass('chip', 'filled');
			expect(container.firstChild).not.toHaveClass('selected', 'disabled', 'assist');
		});

		test('should render as a button element by default', () => {
			const component = <Chip>Test Chip</Chip>;

			render(component);

			const chip = screen.getByRole('button', { name: 'Test Chip' });
			expect(chip).toBeInTheDocument();
			expect(chip).toHaveAttribute('type', 'button');
		});

		test('should render as an anchor element when href is provided', () => {
			const component = <Chip href='/test'>Test Chip</Chip>;

			render(component);

			const chip = screen.getByRole('link', { name: 'Test Chip' });
			expect(chip).toBeInTheDocument();
			expect(chip).toHaveAttribute('href', '/test');
		});

		test('should have target attribute when provided', () => {
			const component = (
				<Chip href='/test' target='_blank'>
					Test Chip
				</Chip>
			);

			const { container } = render(component);

			expect(screen.getByText('Test Chip')).toBeInTheDocument();
			expect(container.firstChild).toHaveAttribute('target', '_blank');
		});

		test('should render with icon for assist role', () => {
			const component = (
				<Chip role='assist' icon={<span />}>
					Test Chip
				</Chip>
			);

			const { container } = render(component);

			expect(screen.getByText('Test Chip')).toBeInTheDocument();
			expect(container.querySelector('.icon')).toBeInTheDocument();
		});

		test('should render with icon for filter role', () => {
			const component = (
				<Chip role='filter' icon={<span />}>
					Filter Chip
				</Chip>
			);

			const { container } = render(component);

			expect(screen.getByText('Filter Chip')).toBeInTheDocument();
			expect(container.querySelector('.icon')).toBeInTheDocument();
		});

		test('should render remove button for input role when onRemove is provided', () => {
			const handleRemove = jest.fn();
			const component = (
				<Chip role='input' onRemove={handleRemove}>
					Input Chip
				</Chip>
			);

			render(component);

			expect(screen.getByText('Input Chip')).toBeInTheDocument();
			expect(screen.getByLabelText('Remove')).toBeInTheDocument();
		});

		test('should render with avatar for input role', () => {
			const mockAvatar = <img src='avatar.png' alt='avatar' />;
			const component = (
				<Chip role='input' avatar={mockAvatar}>
					Input Chip
				</Chip>
			);

			render(component);

			expect(screen.getByText('Input Chip')).toBeInTheDocument();
			expect(screen.getByAltText('avatar')).toBeInTheDocument();
		});

		test('should prioritize avatar over icon when both are provided', () => {
			const mockAvatar = <img src='avatar.png' alt='avatar' />;
			const component = (
				<Chip role='input' icon={<span />} avatar={mockAvatar}>
					Input Chip
				</Chip>
			);

			const { container } = render(component);

			expect(screen.getByText('Input Chip')).toBeInTheDocument();
			expect(container.querySelector('.avatar')).toBeInTheDocument();
			expect(container.querySelector('.icon')).not.toBeInTheDocument();
			expect(screen.getByAltText('avatar')).toBeInTheDocument();
		});

		test('should not render icon for suggestion role even when provided', () => {
			const component = (
				<Chip role='suggestion' icon={<span />}>
					Suggestion Chip
				</Chip>
			);

			const { container } = render(component);

			expect(screen.getByText('Suggestion Chip')).toBeInTheDocument();
			expect(container.querySelector('.icon')).not.toBeInTheDocument();
		});

		test('should not render remove button for assist role', () => {
			const handleRemove = jest.fn();
			const component = (
				<Chip role='assist' onRemove={handleRemove}>
					Assist Chip
				</Chip>
			);

			render(component);

			expect(screen.getByText('Assist Chip')).toBeInTheDocument();
			expect(screen.queryByLabelText('Remove')).not.toBeInTheDocument();
		});

		test('should not render remove button for filter role', () => {
			const handleRemove = jest.fn();
			const component = (
				<Chip role='filter' onRemove={handleRemove}>
					Filter Chip
				</Chip>
			);

			render(component);

			expect(screen.getByText('Filter Chip')).toBeInTheDocument();
			expect(screen.queryByLabelText('Remove')).not.toBeInTheDocument();
		});

		test('should not render remove button for suggestion role', () => {
			const handleRemove = jest.fn();
			const component = (
				<Chip role='suggestion' onRemove={handleRemove}>
					Suggestion Chip
				</Chip>
			);

			render(component);

			expect(screen.getByText('Suggestion Chip')).toBeInTheDocument();
			expect(screen.queryByLabelText('Remove')).not.toBeInTheDocument();
		});

		test('should render with disabled class when disabled', () => {
			const component = <Chip disabled>Disabled Chip</Chip>;

			const { container } = render(component);

			expect(screen.getByText('Disabled Chip')).toBeInTheDocument();
			expect(container.firstChild).toHaveClass('disabled');
		});

		test('should render with selected class when selected', () => {
			const component = (
				<Chip role='input' selected>
					Selected Chip
				</Chip>
			);

			const { container } = render(component);

			expect(screen.getByText('Selected Chip')).toBeInTheDocument();
			expect(container.firstChild).toHaveClass('selected');
		});

		test('should set the disabled attribute on the rendered button when disabled', () => {
			const component = <Chip disabled>Disabled Chip</Chip>;

			const { container } = render(component);

			expect(screen.getByText('Disabled Chip')).toBeInTheDocument();
			expect(container.firstChild).toBeDisabled();
		});

		test('should set aria-pressed attribute when selected', () => {
			const component = <Chip selected>Selected Chip</Chip>;

			const { container } = render(component);

			expect(screen.getByText('Selected Chip')).toBeInTheDocument();
			expect(container.firstChild).toHaveAttribute('aria-pressed', 'true');
		});

		test('should apply custom className', () => {
			const component = <Chip className='my-custom-class'>Test</Chip>;

			const { container } = render(component);

			expect(screen.getByText('Test')).toBeInTheDocument();
			expect(container.firstChild).toHaveClass('chip', 'my-custom-class');
		});

		test('should render label as string', () => {
			const component = <Chip label='chip label' />;

			render(component);

			expect(screen.getByText('chip label')).toBeInTheDocument();
		});

		test('should render label as TextProperties object', () => {
			const component = <Chip label={{ content: 'styled chip', color: 'blue' }} />;

			render(component);

			expect(screen.getByText('styled chip')).toBeInTheDocument();
		});

		test('should render label as ReactElement', () => {
			const MockLabel = () => <em>React Element label</em>;
			const component = <Chip label={<MockLabel />} />;

			render(component);

			expect(screen.getByText('React Element label')).toBeInTheDocument();
		});

		test('should render label as function returning ReactElement', () => {
			const component = <Chip label={() => <em>Function Element</em>} />;

			render(component);

			expect(screen.getByText('Function Element')).toBeInTheDocument();
		});

		test('should prioritize children over label', () => {
			const component = <Chip label='ignored'>Children win</Chip>;

			render(component);

			expect(screen.getByText('Children win')).toBeInTheDocument();
			expect(screen.queryByText('ignored')).not.toBeInTheDocument();
		});

		test('should forward a ref to the underlying element', () => {
			const reference = createRef<HTMLElement>();

			render(<Chip ref={reference}>Ref chip</Chip>);

			expect(reference.current).toBeInstanceOf(HTMLElement);
			expect(reference.current).toHaveTextContent('Ref chip');
		});

		test('should forward a ref to the underlying anchor when href is provided', () => {
			const reference = createRef<HTMLAnchorElement>();

			render(
				<Chip ref={reference} href='/test'>
					Ref anchor chip
				</Chip>
			);

			expect(reference.current).toBeInstanceOf(HTMLAnchorElement);
			expect(reference.current).toHaveAttribute('href', '/test');
		});
	});

	describe('Events', () => {
		test('should execute onClick handler when clicked for assist role', async () => {
			const handleClick = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='assist' onClick={handleClick}>
					Test Chip
				</Chip>
			);

			render(component);
			await user.click(screen.getByText('Test Chip'));

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		test('should execute onClick handler when clicked for suggestion role', async () => {
			const handleClick = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='suggestion' onClick={handleClick}>
					Suggestion Chip
				</Chip>
			);

			render(component);
			await user.click(screen.getByText('Suggestion Chip'));

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		test('should pass event and properties to onClick handler', async () => {
			let eventMock: SyntheticEvent | null = null;
			const handleClick = jest.fn((event: SyntheticEvent) => {
				eventMock = event;
			});
			const user = userEvent.setup();
			const component = <Chip onClick={handleClick}>Test Chip</Chip>;

			render(component);
			await user.click(screen.getByText('Test Chip'));

			expect(handleClick).toHaveBeenCalledWith(eventMock, expect.objectContaining({ children: 'Test Chip' }));
		});

		test('should execute onToggle handler when clicked for filter role', async () => {
			const handleToggle = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='filter' selected={false} onToggle={handleToggle}>
					Filter Chip
				</Chip>
			);

			render(component);
			await user.click(screen.getByText('Filter Chip'));

			expect(handleToggle).toHaveBeenCalledTimes(1);
			expect(handleToggle).toHaveBeenCalledWith(expect.any(Object), true, expect.any(Object));
		});

		test('should toggle to unselected when currently selected for filter role', async () => {
			const handleToggle = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='filter' selected={true} onToggle={handleToggle}>
					Filter Chip
				</Chip>
			);

			render(component);
			await user.click(screen.getByText('Filter Chip'));

			expect(handleToggle).toHaveBeenCalledWith(expect.any(Object), false, expect.any(Object));
		});

		test('should execute onToggle instead of onClick for filter role', async () => {
			const handleClick = jest.fn();
			const handleToggle = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='filter' onClick={handleClick} onToggle={handleToggle}>
					Filter Chip
				</Chip>
			);

			render(component);
			await user.click(screen.getByText('Filter Chip'));

			expect(handleToggle).toHaveBeenCalledTimes(1);
			expect(handleClick).not.toHaveBeenCalled();
		});

		test('should execute onRemove handler when remove button is clicked', async () => {
			const handleRemove = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='input' onRemove={handleRemove}>
					Input Chip
				</Chip>
			);

			render(component);
			await user.click(screen.getByLabelText('Remove'));

			expect(handleRemove).toHaveBeenCalledTimes(1);
		});

		test('should pass event and properties to onRemove handler', async () => {
			let eventMock: SyntheticEvent | null = null;
			const handleRemove = jest.fn((event: SyntheticEvent) => {
				eventMock = event;
			});
			const user = userEvent.setup();
			const component = (
				<Chip role='input' onRemove={handleRemove}>
					Input Chip
				</Chip>
			);

			render(component);
			await user.click(screen.getByLabelText('Remove'));

			expect(handleRemove).toHaveBeenCalledWith(eventMock, expect.objectContaining({ role: 'input' }));
		});

		test('should not execute onClick when remove button is clicked', async () => {
			const handleClick = jest.fn();
			const handleRemove = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='input' onClick={handleClick} onRemove={handleRemove}>
					Input Chip
				</Chip>
			);

			render(component);
			await user.click(screen.getByLabelText('Remove'));

			expect(handleRemove).toHaveBeenCalledTimes(1);
			expect(handleClick).not.toHaveBeenCalled();
		});

		test('should not execute onClick handler when disabled', async () => {
			const handleClick = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip disabled onClick={handleClick}>
					Disabled Chip
				</Chip>
			);

			render(component);
			await user.click(screen.getByText('Disabled Chip'));

			expect(handleClick).not.toHaveBeenCalled();
		});

		test('should not execute onToggle handler when disabled for filter role', async () => {
			const handleToggle = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='filter' disabled onToggle={handleToggle}>
					Disabled Filter
				</Chip>
			);

			render(component);
			await user.click(screen.getByText('Disabled Filter'));

			expect(handleToggle).not.toHaveBeenCalled();
		});

		test('should not execute onRemove handler when disabled for input role', async () => {
			const handleRemove = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='input' disabled onRemove={handleRemove}>
					Disabled Input
				</Chip>
			);

			render(component);
			await user.click(screen.getByLabelText('Remove'));

			expect(handleRemove).not.toHaveBeenCalled();
		});
	});
});
