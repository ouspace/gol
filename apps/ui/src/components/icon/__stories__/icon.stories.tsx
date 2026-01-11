import type { Meta, StoryObj } from '@storybook/react-vite';

import Icon from '../root';

export default {
	title: 'components/Icon',
	component: Icon,
	parameters: {
		layout: 'centered',
		docs: {
			codePanel: true,
		}
	},
	tags: ['autodocs', 'typescript', '!dev'],
	argTypes: {
		size: {
			options: ['smallest', 'small', 'smallless', 'normal', 'bigless', 'big', 'biggest'],
			control: { type: 'select' },
			table: {
				type: { summary: 'enum | number' },
			},
		}
	}
} as Meta<typeof Icon>;

type Story = StoryObj<typeof Icon>;

// Default
export const Default: Story = {
	args: {
		name: '10k'
	}
};
