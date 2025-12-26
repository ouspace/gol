import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Chip from '../chip';

describe('components/chip', () => {
	describe('Layout', () => {
		test('should render with default properties', () => {
			const { container } = render(
				<Chip>
					Test Chip
				</Chip>
			);

			expect(screen.getByText('Test Chip')).toBeInTheDocument();
			expect(container.firstChild).toHaveClass('chip', 'assist', 'filled');
			expect(container.firstChild).not.toHaveClass('selected', 'disabled');
		});

		test('should render as span element by default', () => {
			const { container } = render(
				<Chip>
					Test Chip
				</Chip>
			);

			expect(container.firstChild?.nodeName).toBe('SPAN');
		});

		test('should render as anchor element when href is provided', () => {
			const { container } = render(
				<Chip href="/test">
					Test Chip
				</Chip>
			);

			expect(container.firstChild?.nodeName).toBe('A');
			expect(container.firstChild).toHaveAttribute('href', '/test');
		});

		test('should have target attribute when provided', () => {
			const { container } = render(
				<Chip href="/test" target="_blank">
					Test Chip
				</Chip>
			);

			expect(container.firstChild).toHaveAttribute('target', '_blank');
		});

		test('should render with icon for assist role', () => {
			const mockIcon = <i>✅</i>;
			render(
				<Chip role="assist" icon={mockIcon}>
					Test Chip
				</Chip>
			);

			expect(screen.getByText('✅')).toBeInTheDocument();
		});

		test('should render with icon for filter role', () => {
			const mockIcon = <i>✅</i>;
			render(
				<Chip role="filter" icon={mockIcon}>
					Filter Chip
				</Chip>
			);

			expect(screen.getByText('✅')).toBeInTheDocument();
		});

		test('should render remove button for input role when onRemove is provided', () => {
			const handleRemove = jest.fn();
			const { container } = render(
				<Chip role="input" onRemove={handleRemove}>
					Input Chip
				</Chip>
			);
			const removeButton = container.querySelector('.chip__remove');

			expect(removeButton).toBeInTheDocument();
		});

		test('should render with avatar for input role', () => {
			const mockAvatar = <img src="avatar.png" alt="avatar" />;
			const { container } = render(
				<Chip role="input" avatar={mockAvatar}>
					Input Chip
				</Chip>
			);
			const avatar = container.querySelector('.chip__avatar');

			expect(avatar).toBeInTheDocument();
			expect(screen.getByAltText('avatar')).toBeInTheDocument();
		});

		test('should prioritize avatar over icon when both are provided', () => {
			const mockIcon = <i>✅</i>;
			const mockAvatar = <img src="avatar.png" alt="avatar" />;
			const { container } = render(
				<Chip role="input" icon={mockIcon} avatar={mockAvatar}>
					Input Chip
				</Chip>
			);
			const avatar = container.querySelector('.chip__avatar');
			const icon = container.querySelector('.chip__icon');

			expect(avatar).toBeInTheDocument();
			expect(icon).not.toBeInTheDocument();
			expect(screen.getByAltText('avatar')).toBeInTheDocument();
		});

		test('should not render icon for suggestion role even when provided', () => {
			const mockIcon = <i>✅</i>;
			render(
				<Chip role="suggestion" icon={mockIcon}>
					Suggestion Chip
				</Chip>
			);

			expect(screen.queryByText('✅')).not.toBeInTheDocument();
		});

		test('should not render remove button for assist role', () => {
			const handleRemove = jest.fn();
			const { container } = render(
				<Chip role="assist" onRemove={handleRemove}>
					Assist Chip
				</Chip>
			);
			const removeButton = container.querySelector('.chip__remove');

			expect(removeButton).not.toBeInTheDocument();
		});

		test('should not render remove button for filter role', () => {
			const handleRemove = jest.fn();
			const { container } = render(
				<Chip role="filter" onRemove={handleRemove}>
					Filter Chip
				</Chip>
			);
			const removeButton = container.querySelector('.chip__remove');

			expect(removeButton).not.toBeInTheDocument();
		});

		test('should not render remove button for suggestion role', () => {
			const handleRemove = jest.fn();
			const { container } = render(
				<Chip role="suggestion" onRemove={handleRemove}>
					Suggestion Chip
				</Chip>
			);
			const removeButton = container.querySelector('.chip__remove');

			expect(removeButton).not.toBeInTheDocument();
		});

		test('should render with disabled class when disabled', () => {
			const { container } = render(
				<Chip disabled>
					Disabled Chip
				</Chip>
			);

			expect(container.firstChild).toHaveClass('disabled');
		});

		test('should render with selected class when selected', () => {
			const { container } = render(
				<Chip role="input" selected>
					Selected Chip
				</Chip>
			);

			expect(container.firstChild).toHaveClass('selected');
		});

		test('should have aria-disabled attribute when disabled', () => {
			const { container } = render(
				<Chip disabled>
					Disabled Chip
				</Chip>
			);

			expect(container.firstChild).toHaveAttribute('aria-disabled', 'true');
		});

		test('should have aria-pressed attribute when selected', () => {
			const { container } = render(
				<Chip selected>
					Selected Chip
				</Chip>
			);

			expect(container.firstChild).toHaveAttribute('aria-pressed', 'true');
		});

		test('should apply custom className', () => {
  			const { container } = render(
				<Chip className="my-custom-class">
					Test
				</Chip>
			);
			
  			expect(container.firstChild).toHaveClass('chip', 'my-custom-class');
  		});
	});

	describe('Events', () => {
		test('should execute onClick handler when clicked for assist role', () => {
			const handleClick = jest.fn();
			render(
				<Chip role="assist" onClick={handleClick}>
					Test Chip
				</Chip>
			);

			fireEvent.click(screen.getByText('Test Chip'));

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		test('should execute onClick handler when clicked for suggestion role', () => {
			const handleClick = jest.fn();
			render(
				<Chip role="suggestion" onClick={handleClick}>
					Suggestion Chip
				</Chip>
			);

			fireEvent.click(screen.getByText('Suggestion Chip'));

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		test('should pass event and properties to onClick handler', () => {
			const handleClick = jest.fn();
			render(
				<Chip onClick={handleClick}>
					Test Chip
				</Chip>
			);

			fireEvent.click(screen.getByText('Test Chip'));

			expect(handleClick).toHaveBeenCalledWith(
				expect.any(Object),
				expect.objectContaining({ children: 'Test Chip' })
			);
		});

		test('should execute onToggle handler when clicked for filter role', () => {
			const handleToggle = jest.fn();
			render(
				<Chip role="filter" selected={false} onToggle={handleToggle}>
					Filter Chip
				</Chip>
			);

			fireEvent.click(screen.getByText('Filter Chip'));

			expect(handleToggle).toHaveBeenCalledTimes(1);
			expect(handleToggle).toHaveBeenCalledWith(
				expect.any(Object),
				true,
				expect.any(Object)
			);
		});

		test('should toggle to unselected when currently selected for filter role', () => {
			const handleToggle = jest.fn();
			render(
				<Chip role="filter" selected={true} onToggle={handleToggle}>
					Filter Chip
				</Chip>
			);

			fireEvent.click(screen.getByText('Filter Chip'));

			expect(handleToggle).toHaveBeenCalledWith(
				expect.any(Object),
				false,
				expect.any(Object)
			);
		});

		test('should execute onToggle instead of onClick for filter role', () => {
			const handleClick = jest.fn();
			const handleToggle = jest.fn();
			render(
				<Chip role="filter" onClick={handleClick} onToggle={handleToggle}>
					Filter Chip
				</Chip>
			);

			fireEvent.click(screen.getByText('Filter Chip'));

			expect(handleToggle).toHaveBeenCalledTimes(1);
			expect(handleClick).not.toHaveBeenCalled();
		});

		test('should execute onRemove handler when remove button is clicked', () => {
			const handleRemove = jest.fn();
			render(
				<Chip role="input" onRemove={handleRemove}>
					Input Chip
				</Chip>
			);

			fireEvent.click(screen.getByLabelText('Remove'));

			expect(handleRemove).toHaveBeenCalledTimes(1);
		});

		test('should pass event and properties to onRemove handler', () => {
			const handleRemove = jest.fn();
			render(
				<Chip role="input" onRemove={handleRemove}>
					Input Chip
				</Chip>
			);

			fireEvent.click(screen.getByLabelText('Remove'));

			expect(handleRemove).toHaveBeenCalledWith(
				expect.any(Object),
				expect.objectContaining({ role: 'input' })
			);
		});

		test('should not execute onClick when remove button is clicked', () => {
			const handleClick = jest.fn();
			const handleRemove = jest.fn();
			render(
				<Chip role="input" onClick={handleClick} onRemove={handleRemove}>
					Input Chip
				</Chip>
			);

			fireEvent.click(screen.getByLabelText('Remove'));

			expect(handleRemove).toHaveBeenCalledTimes(1);
			expect(handleClick).not.toHaveBeenCalled();
		});

		test('should not execute onClick handler when disabled', () => {
			const handleClick = jest.fn();
			render(
				<Chip disabled onClick={handleClick}>
					Disabled Chip
				</Chip>
			);

			fireEvent.click(screen.getByText('Disabled Chip'));

			expect(handleClick).not.toHaveBeenCalled();
		});

		test('should not execute onToggle handler when disabled for filter role', () => {
			const handleToggle = jest.fn();
			render(
				<Chip role="filter" disabled onToggle={handleToggle}>
					Disabled Filter
				</Chip>
			);

			fireEvent.click(screen.getByText('Disabled Filter'));

			expect(handleToggle).not.toHaveBeenCalled();
		});

		test('should not execute onRemove handler when disabled for input role', () => {
			const handleRemove = jest.fn();
			render(
				<Chip role="input" disabled onRemove={handleRemove}>
					Disabled Input
				</Chip>
			);

			fireEvent.click(screen.getByLabelText('Remove'));

			expect(handleRemove).not.toHaveBeenCalled();
		});
	});
});
