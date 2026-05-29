import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { SyntheticEvent } from 'react';

import Text from '../root';
const supportedElements = [
	{ tag: 'p', name: 'P' },
	{ tag: 'span', name: 'SPAN' },
	{ tag: 'div', name: 'DIV' },
	{ tag: 'h1', name: 'H1' },
	{ tag: 'h2', name: 'H2' },
	{ tag: 'h3', name: 'H3' },
	{ tag: 'h4', name: 'H4' },
	{ tag: 'h5', name: 'H5' },
	{ tag: 'h6', name: 'H6' },
	{ tag: 'label', name: 'LABEL' },
] as const;

describe('components/text', () => {
	describe('Layout', () => {
		test('should be render by default', () => {
			const component = <Text>Default text</Text>;

			render(component);

			expect(screen.getByText('Default text')).toBeDefined();
			expect(screen.getByText('Default text')).toHaveClass('text');
			expect(screen.getByText('Default text').nodeName).toBe('SPAN');
			expect(screen.getByText('Default text')).not.toHaveStyle('--text-color-inject: black');
			expect(screen.getByText('Default text')).not.toHaveStyle('--text-align-inject: left');
			expect(screen.getByText('Default text')).not.toHaveStyle('--text-decoration-inject: none');
			expect(screen.getByText('Default text')).not.toHaveStyle('--text-font-style-inject: normal');
			expect(screen.getByText('Default text')).not.toHaveStyle('--text-transform-inject: none');
			expect(screen.getByText('Default text')).not.toHaveStyle('--text-white-space-inject: normal');
			expect(screen.getByText('Default text')).not.toHaveStyle('--text-user-select-inject: auto');
			expect(screen.getByText('Default text')).not.toHaveStyle('--text-opacity-inject: 1');
			expect(screen.getByText('Default text')).not.toHaveStyle('--text-cursor-inject: inherit');
		});

		test.each(supportedElements)('should be render as a $tag element', ({ tag, name }) => {
			const component = <Text as={tag}>{`Render as ${tag}`}</Text>;

			render(component);

			expect(screen.getByText(`Render as ${tag}`).nodeName).toBe(name);
		});

		test('should be prioritize children over content properties', () => {
			const component = <Text content='Content text'>Children text</Text>;

			render(component);

			expect(screen.getByText('Children text')).toBeDefined();
			expect(screen.queryByText('Content text')).toBeNull();
		});
	});

	describe('Events', () => {
		test('should be clicked', async () => {
			let eventMock: SyntheticEvent | null = null;
			const onClick = jest.fn((event: SyntheticEvent) => {
				eventMock = event;
			});
			const user = userEvent.setup();
			const component = <Text onClick={onClick} content='Click me' />;

			render(component);
			await user.click(screen.getByText('Click me'));

			expect(screen.getByText('Click me')).toBeDefined();
			expect(onClick).toHaveBeenCalled();
			expect(onClick).toHaveBeenCalledWith(eventMock, {
				content: 'Click me',
				as: 'span',
				color: 'black',
				align: 'left',
				decoration: 'none',
				italic: false,
				wrap: true,
				unselectable: false,
				disabled: false,
			});
		});

		test('should not be clicked when disabled', async () => {
			const onClick = jest.fn();
			const user = userEvent.setup();
			const component = (
				<Text disabled onClick={onClick}>
					Disabled text
				</Text>
			);

			render(component);
			await user.click(screen.getByText('Disabled text'));

			expect(screen.getByText('Disabled text')).toBeDefined();
			expect(onClick).not.toHaveBeenCalled();
			expect(screen.getByText('Disabled text')).toHaveClass('disabled');
		});
	});
});
