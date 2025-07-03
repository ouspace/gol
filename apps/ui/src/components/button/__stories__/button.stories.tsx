import type { Meta, StoryObj } from '@storybook/react';
import Button from '../button';

const meta: Meta<typeof Button> = {
	component: Button,
	//👇 Enables auto-generated documentation for this component and includes all stories in this file
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		as: '',
		children: null,
	}
};
