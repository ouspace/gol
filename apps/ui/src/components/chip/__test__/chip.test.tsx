import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { SyntheticEvent } from 'react';

import Chip from '../chip';

jest.mock('../../text/text');

describe('components/chip', () => {
	describe('Layout', () => {
		test('should be render by default', () => {
			// arrange(s)
			const component = <Chip>Test Chip</Chip>;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByText('Test Chip')).toBeDefined();
			expect(container.firstChild).toHaveClass('chip', 'assist', 'filled');
			expect(container.firstChild).not.toHaveClass('selected', 'disabled');
		});

		test('should be render as span element by default', () => {
			// arrange(s)
			const component = <Chip>Test Chip</Chip>;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByText('Test Chip')).toBeDefined();
			expect(container.firstChild?.nodeName).toBe('SPAN');
		});

		test('should be render as anchor element when href is provided', () => {
			// arrange(s)
			const component = <Chip href='/test'>Test Chip</Chip>;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByText('Test Chip')).toBeDefined();
			expect(container.firstChild?.nodeName).toBe('A');
			expect(container.firstChild).toHaveAttribute('href', '/test');
		});

		test('should have target attribute when provided', () => {
			// arrange(s)
			const component = (
				<Chip href='/test' target='_blank'>
					Test Chip
				</Chip>
			);

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByText('Test Chip')).toBeDefined();
			expect(container.firstChild).toHaveAttribute('target', '_blank');
		});

		test('should render with icon for assist role', () => {
			// arrange(s)
			const mockIcon = <i>✅</i>;
			const component = (
				<Chip role='assist' icon={mockIcon}>
					Test Chip
				</Chip>
			);

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('Test Chip')).toBeDefined();
			expect(screen.getByText('✅')).toBeInTheDocument();
		});

		test('should render with icon for filter role', () => {
			// arrange(s)
			const mockIcon = <i>✅</i>;
			const component = (
				<Chip role='filter' icon={mockIcon}>
					Filter Chip
				</Chip>
			);

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('Filter Chip')).toBeDefined();
			expect(screen.getByText('✅')).toBeInTheDocument();
		});

		test('should render remove button for input role when onRemove is provided', () => {
			// arrange(s)
			const handleRemove = jest.fn();
			const component = (
				<Chip role='input' onRemove={handleRemove}>
					Input Chip
				</Chip>
			);

			// act(s)
			const { container } = render(component);
			const removeButton = container.querySelector('.chip__remove');

			// assert(s)
			expect(screen.getByText('Input Chip')).toBeDefined();
			expect(removeButton).toBeInTheDocument();
		});

		test('should render with avatar for input role', () => {
			// arrange(s)
			const mockAvatar = <img src='avatar.png' alt='avatar' />;
			const component = (
				<Chip role='input' avatar={mockAvatar}>
					Input Chip
				</Chip>
			);

			// act(s)
			const { container } = render(component);
			const avatar = container.querySelector('.chip__avatar');

			// assert(s)
			expect(screen.getByText('Input Chip')).toBeDefined();
			expect(avatar).toBeInTheDocument();
			expect(screen.getByAltText('avatar')).toBeInTheDocument();
		});

		test('should prioritize avatar over icon when both are provided', () => {
			// arrange(s)
			const mockIcon = <i>✅</i>;
			const mockAvatar = <img src='avatar.png' alt='avatar' />;
			const component = (
				<Chip role='input' icon={mockIcon} avatar={mockAvatar}>
					Input Chip
				</Chip>
			);

			// act(s)
			const { container } = render(component);
			const avatar = container.querySelector('.chip__avatar');
			const icon = container.querySelector('.chip__icon');

			// assert(s)
			expect(screen.getByText('Input Chip')).toBeDefined();
			expect(avatar).toBeInTheDocument();
			expect(icon).not.toBeInTheDocument();
			expect(screen.getByAltText('avatar')).toBeInTheDocument();
		});

		test('should not render icon for suggestion role even when provided', () => {
			// arrange(s)
			const mockIcon = <i>✅</i>;
			const component = (
				<Chip role='suggestion' icon={mockIcon}>
					Suggestion Chip
				</Chip>
			);

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('Suggestion Chip')).toBeDefined();
			expect(screen.queryByText('✅')).not.toBeInTheDocument();
		});

		test('should not render remove button for assist role', () => {
			// arrange(s)
			const handleRemove = jest.fn();
			const component = (
				<Chip role='assist' onRemove={handleRemove}>
					Assist Chip
				</Chip>
			);

			// act(s)
			const { container } = render(component);
			const removeButton = container.querySelector('.chip__remove');

			// assert(s)
			expect(screen.getByText('Assist Chip')).toBeDefined();
			expect(removeButton).not.toBeInTheDocument();
		});

		test('should not render remove button for filter role', () => {
			// arrange(s)
			const handleRemove = jest.fn();
			const component = (
				<Chip role='filter' onRemove={handleRemove}>
					Filter Chip
				</Chip>
			);

			// act(s)
			const { container } = render(component);
			const removeButton = container.querySelector('.chip__remove');

			// assert(s)
			expect(screen.getByText('Filter Chip')).toBeDefined();
			expect(removeButton).not.toBeInTheDocument();
		});

		test('should not render remove button for suggestion role', () => {
			// arrange(s)
			const handleRemove = jest.fn();
			const component = (
				<Chip role='suggestion' onRemove={handleRemove}>
					Suggestion Chip
				</Chip>
			);

			// act(s)
			const { container } = render(component);
			const removeButton = container.querySelector('.chip__remove');

			// assert(s)
			expect(screen.getByText('Suggestion Chip')).toBeDefined();
			expect(removeButton).not.toBeInTheDocument();
		});

		test('should render with disabled class when disabled', () => {
			// arrange(s)
			const component = <Chip disabled>Disabled Chip</Chip>;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByText('Disabled Chip')).toBeDefined();
			expect(container.firstChild).toHaveClass('disabled');
		});

		test('should render with selected class when selected', () => {
			// arrange(s)
			const component = (
				<Chip role='input' selected>
					Selected Chip
				</Chip>
			);

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByText('Selected Chip')).toBeDefined();
			expect(container.firstChild).toHaveClass('selected');
		});

		test('should have aria-disabled attribute when disabled', () => {
			// arrange(s)
			const component = <Chip disabled>Disabled Chip</Chip>;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByText('Disabled Chip')).toBeDefined();
			expect(container.firstChild).toHaveAttribute('aria-disabled', 'true');
		});

		test('should have aria-pressed attribute when selected', () => {
			// arrange(s)
			const component = <Chip selected>Selected Chip</Chip>;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByText('Selected Chip')).toBeDefined();
			expect(container.firstChild).toHaveAttribute('aria-pressed', 'true');
		});

		test('should apply custom className', () => {
			// arrange(s)
			const component = <Chip className='my-custom-class'>Test</Chip>;

			// act(s)
			const { container } = render(component);

			// assert(s)
			expect(screen.getByText('Test')).toBeDefined();
			expect(container.firstChild).toHaveClass('chip', 'my-custom-class');
		});

		test('should render label as string', () => {
			// arrange(s)
			const component = <Chip label='chip label' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('chip label')).toBeDefined();
			expect(screen.getByText('chip label')).toBeInTheDocument();
		});

		test('should render label as TextProperties object', () => {
			// arrange(s)
			const component = <Chip label={{ content: 'styled chip', color: 'blue' }} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('styled chip')).toBeDefined();
			expect(screen.getByText('styled chip')).toBeInTheDocument();
		});

		test('should render label as ReactElement', () => {
			// arrange(s)
			const MockLabel = () => <em>React Element label</em>;
			const component = <Chip label={<MockLabel />} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('React Element label')).toBeDefined();
			expect(screen.getByText('React Element label')).toBeInTheDocument();
		});

		test('should render label as function returning ReactElement', () => {
			// arrange(s)
			const component = <Chip label={() => <em>Function Element</em>} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('Function Element')).toBeDefined();
			expect(screen.getByText('Function Element')).toBeInTheDocument();
		});

		test('should prioritize children over label', () => {
			// arrange(s)
			const component = <Chip label='ignored'>Children win</Chip>;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByText('Children win')).toBeDefined();
			expect(screen.getByText('Children win')).toBeInTheDocument();
			expect(screen.queryByText('ignored')).not.toBeInTheDocument();
		});
	});

	describe('Events', () => {
		test('should execute onClick handler when clicked for assist role', async () => {
			// arrange(s)
			const handleClick = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='assist' onClick={handleClick}>
					Test Chip
				</Chip>
			);

			// act(s)
			render(component);
			await user.click(screen.getByText('Test Chip'));

			// assert(s)
			expect(screen.getByText('Test Chip')).toBeDefined();
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		test('should execute onClick handler when clicked for suggestion role', async () => {
			// arrange(s)
			const handleClick = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='suggestion' onClick={handleClick}>
					Suggestion Chip
				</Chip>
			);

			// act(s)
			render(component);
			await user.click(screen.getByText('Suggestion Chip'));

			// assert(s)
			expect(screen.getByText('Suggestion Chip')).toBeDefined();
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		test('should pass event and properties to onClick handler', async () => {
			// arrange(s)
			let eventMock: SyntheticEvent | null = null;
			const handleClick = jest.fn((event: SyntheticEvent) => {
				eventMock = event;
			});
			const user = userEvent.setup();
			const component = <Chip onClick={handleClick}>Test Chip</Chip>;

			// act(s)
			render(component);
			await user.click(screen.getByText('Test Chip'));

			// assert(s)
			expect(screen.getByText('Test Chip')).toBeDefined();
			expect(handleClick).toHaveBeenCalledWith(eventMock, expect.objectContaining({ children: 'Test Chip' }));
		});

		test('should execute onToggle handler when clicked for filter role', async () => {
			// arrange(s)
			const handleToggle = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='filter' selected={false} onToggle={handleToggle}>
					Filter Chip
				</Chip>
			);

			// act(s)
			render(component);
			await user.click(screen.getByText('Filter Chip'));

			// assert(s)
			expect(screen.getByText('Filter Chip')).toBeDefined();
			expect(handleToggle).toHaveBeenCalledTimes(1);
			expect(handleToggle).toHaveBeenCalledWith(expect.any(Object), true, expect.any(Object));
		});

		test('should toggle to unselected when currently selected for filter role', async () => {
			// arrange(s)
			const handleToggle = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='filter' selected={true} onToggle={handleToggle}>
					Filter Chip
				</Chip>
			);

			// act(s)
			render(component);
			await user.click(screen.getByText('Filter Chip'));

			// assert(s)
			expect(screen.getByText('Filter Chip')).toBeDefined();
			expect(handleToggle).toHaveBeenCalledWith(expect.any(Object), false, expect.any(Object));
		});

		test('should execute onToggle instead of onClick for filter role', async () => {
			// arrange(s)
			const handleClick = jest.fn();
			const handleToggle = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='filter' onClick={handleClick} onToggle={handleToggle}>
					Filter Chip
				</Chip>
			);

			// act(s)
			render(component);
			await user.click(screen.getByText('Filter Chip'));

			// assert(s)
			expect(screen.getByText('Filter Chip')).toBeDefined();
			expect(handleToggle).toHaveBeenCalledTimes(1);
			expect(handleClick).not.toHaveBeenCalled();
		});

		test('should execute onRemove handler when remove button is clicked', async () => {
			// arrange(s)
			const handleRemove = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='input' onRemove={handleRemove}>
					Input Chip
				</Chip>
			);

			// act(s)
			render(component);
			await user.click(screen.getByLabelText('Remove'));

			// assert(s)
			expect(screen.getByText('Input Chip')).toBeDefined();
			expect(handleRemove).toHaveBeenCalledTimes(1);
		});

		test('should pass event and properties to onRemove handler', async () => {
			// arrange(s)
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

			// act(s)
			render(component);
			await user.click(screen.getByLabelText('Remove'));

			// assert(s)
			expect(screen.getByText('Input Chip')).toBeDefined();
			expect(handleRemove).toHaveBeenCalledWith(eventMock, expect.objectContaining({ role: 'input' }));
		});

		test('should not execute onClick when remove button is clicked', async () => {
			// arrange(s)
			const handleClick = jest.fn();
			const handleRemove = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='input' onClick={handleClick} onRemove={handleRemove}>
					Input Chip
				</Chip>
			);

			// act(s)
			render(component);
			await user.click(screen.getByLabelText('Remove'));

			// assert(s)
			expect(screen.getByText('Input Chip')).toBeDefined();
			expect(handleRemove).toHaveBeenCalledTimes(1);
			expect(handleClick).not.toHaveBeenCalled();
		});

		test('should not execute onClick handler when disabled', async () => {
			// arrange(s)
			const handleClick = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip disabled onClick={handleClick}>
					Disabled Chip
				</Chip>
			);

			// act(s)
			render(component);
			await user.click(screen.getByText('Disabled Chip'));

			// assert(s)
			expect(screen.getByText('Disabled Chip')).toBeDefined();
			expect(handleClick).not.toHaveBeenCalled();
		});

		test('should not execute onToggle handler when disabled for filter role', async () => {
			// arrange(s)
			const handleToggle = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='filter' disabled onToggle={handleToggle}>
					Disabled Filter
				</Chip>
			);

			// act(s)
			render(component);
			await user.click(screen.getByText('Disabled Filter'));

			// assert(s)
			expect(screen.getByText('Disabled Filter')).toBeDefined();
			expect(handleToggle).not.toHaveBeenCalled();
		});

		test('should not execute onRemove handler when disabled for input role', async () => {
			// arrange(s)
			const handleRemove = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Chip role='input' disabled onRemove={handleRemove}>
					Disabled Input
				</Chip>
			);

			// act(s)
			render(component);
			await user.click(screen.getByLabelText('Remove'));

			// assert(s)
			expect(screen.getByText('Disabled Input')).toBeDefined();
			expect(handleRemove).not.toHaveBeenCalled();
		});
	});
});
