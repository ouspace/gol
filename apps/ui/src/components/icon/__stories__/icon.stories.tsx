import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from '@storybook/test';

import Icon from '../root';

const meta: Meta<typeof Icon> = {
	title: 'components/Icon',
	component: Icon,
	parameters: {
		layout: 'centered',
		docs: {
			codePanel: true,
		}
	},
	tags: ['autodocs', '!dev'],
	argTypes: {
		size: {
			options: ['smallest', 'small', 'smallless', 'normal', 'bigless', 'big', 'biggest'],
			control: { type: 'select' },
			table: {
				type: { summary: 'enum | number' },
			},
		}
	}
};

export default meta;
type Story = StoryObj<typeof Icon>;

/**
 * @summary the default icon rendered by name from the Material Symbols dictionary
 */
export const Default: Story = {
	args: {
		name: '10k'
	}
};

/**
 * @summary an interactive icon acting as a button — focusable and clickable via onClick
 */
export const InteractiveClick: Story = {
	args: {
		name: '10k',
		onClick: fn(),
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const iconButton = canvas.getByRole('button');

		await step('Click icon and verify it receives focus', async () => {
			await userEvent.click(iconButton);
			await expect(iconButton).toHaveFocus();
		});
	}
};
