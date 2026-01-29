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
			expect(screen.getByRole('icon')).toHaveClass('normal');
			expect(screen.getByRole('icon')).toHaveStyle('--icon-color-inject: black');
			expect(screen.getByRole('icon')).toHaveStyle('--icon-weight-inject: 400');
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
				color: 'black',
				disabled: false,
				fill: false,
				size: 'normal',
				variant: 'outlined',
				viewBox: '120 -840 720 720',
				weight: 'normal',
			});
		});
	});
});
