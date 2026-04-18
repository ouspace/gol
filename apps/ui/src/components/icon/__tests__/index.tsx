import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { SyntheticEvent } from 'react';

import { Icon } from '../index';

describe('components/icon', () => {
	describe('layouts', () => {
		test('should be render by default', () => {
			// arrange(s)
			const component = <Icon />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveClass('icon');
		});

		test('should be render a named icon', () => {
			// arrange(s)
			const component = <Icon name="10k" />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveAttribute('name', '10k');
		});

		test('should be render a rotated icon by default', () => {
			// arrange(s)
			const component = <Icon rotated />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveClass('rotated');
			expect(screen.getByRole('icon')).toHaveStyle('--icon-rotate-inject: 180deg');
		});

		test('should be render a rotated icon at north', () => {
			// arrange(s)
			const component = <Icon rotated="north" />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveClass('rotated');
			expect(screen.getByRole('icon')).toHaveStyle('--icon-rotate-inject: 0deg');
		});

		test('should be render a rotated icon at east', () => {
			// arrange(s)
			const component = <Icon rotated="east" />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveClass('rotated');
			expect(screen.getByRole('icon')).toHaveStyle('--icon-rotate-inject: 90deg');
		});

		test('should be render a rotated icon at south', () => {
			// arrange(s)
			const component = <Icon rotated="south" />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveClass('rotated');
			expect(screen.getByRole('icon')).toHaveStyle('--icon-rotate-inject: 180deg');
		});

		test('should be render a rotated icon at west', () => {
			// arrange(s)
			const component = <Icon rotated="west" />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveClass('rotated');
			expect(screen.getByRole('icon')).toHaveStyle('--icon-rotate-inject: 270deg');
		});

		test('should be render a rotated icon by radian unit', () => {
			// arrange(s)
			const component = <Icon rotated={{ value: 0.25, unit: 'rad' }} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveClass('rotated');
			expect(screen.getByRole('icon')).toHaveStyle('--icon-rotate-inject: 0.25rad');
		});

		test('should be render a rotated icon by turn unit', () => {
			// arrange(s)
			const component = <Icon rotated={{ value: 1, unit: 'turn' }} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveClass('rotated');
			expect(screen.getByRole('icon')).toHaveStyle('--icon-rotate-inject: 1turn');
		});

		test('should be render a rotated icon by opposite direction', () => {
			// arrange(s)
			const component = <Icon rotated={{ value: 90, unit: 'deg', direction: 'counter-clockwise' }} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveClass('rotated');
			expect(screen.getByRole('icon')).toHaveStyle('--icon-rotate-inject: -90deg');
		});

		test('should be render a weighted icon by default', () => {
			// arrange(s)
			const component = <Icon weight='normal' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveStyle('--icon-weight-inject: 400;');
		});

		test('should be render a weighted icon as lightest', () => {
			// arrange(s)
			const component = <Icon weight='lightest' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveStyle('--icon-weight-inject: 100;');
		});

		test('should be render a weighted icon as light', () => {
			// arrange(s)
			const component = <Icon weight='light' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveStyle('--icon-weight-inject: 200;');
		});

		test('should be render a weighted icon as lightless', () => {
			// arrange(s)
			const component = <Icon weight='lightless' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveStyle('--icon-weight-inject: 300;');
		});

		test('should be render a weighted icon as boldless', () => {
			// arrange(s)
			const component = <Icon weight='boldless' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveStyle('--icon-weight-inject: 500;');
		});

		test('should be render a weighted icon as bold', () => {
			// arrange(s)
			const component = <Icon weight='bold' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveStyle('--icon-weight-inject: 600;');
		});

		test('should be render a weighted icon as boldest', () => {
			// arrange(s)
			const component = <Icon weight='boldest' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).toHaveStyle('--icon-weight-inject: 700;');
		});

		test('should be render as smallest size', () => {
			// arrange(s)
			const component = <Icon size='smallest' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toHaveClass('smallest');
		});

		test('should be render as biggest size', () => {
			// arrange(s)
			const component = <Icon size='biggest' />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toHaveClass('biggest');
		});

		test('should be render a weighted icon by positive number', () => {
			// arrange(s)
			const component = <Icon weight={450} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).not.toHaveStyle('--icon-weight-inject: 450;');
		});

		test('should not be set a weighted icon by zero', () => {
			// arrange(s)
			const component = <Icon weight={0} />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(screen.getByRole('icon')).not.toHaveStyle('--icon-weight-inject: 0;');
		});

		xtest('should be render a filled icon', () => {
			// arrange(s)
			const component = <Icon name='10k' fill />;

			// act(s)
			render(component);

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
		});
	});

	describe('events', () => {
		test('should be clicked', async () => {
			// arrange(s)
			let eventMock: SyntheticEvent | null = null;
			const onClick = jest.fn((event: SyntheticEvent) => { eventMock = event; });
			const user = userEvent.setup();
			const component = <Icon onClick={onClick} />;

			// act(s)
			render(component);
			await user.click(screen.getByRole('icon'));

			// assert(s)
			expect(screen.getByRole('icon')).toBeDefined();
			expect(onClick).toHaveBeenCalled();
			expect(onClick).toHaveBeenCalledWith(eventMock, {
				disabled: false,
				variant: 'outlined',
				viewBox: '120 -840 720 720',
			});
		});
	});

	test('should not be clicked when disabled', async () => {
		// arrange(s)
		const onClick = jest.fn();
		const user = userEvent.setup();
		const component = <Icon onClick={onClick} disabled />;

		// act(s)
		render(component);
		await user.click(screen.getByRole('icon'));

		// assert(s)
		expect(screen.getByRole('icon')).toBeDefined();
		expect(onClick).not.toHaveBeenCalled();
	});
});
