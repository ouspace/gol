import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../checkbox';

const meta: Meta<typeof Checkbox> = {
	// title: 'Components/Checkbox',
	component: Checkbox,
	//👇 Enables auto-generated documentation for this component and includes all stories in this file
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: {
		label: 'Default Checkbox',
		checked: false,
	},
};

export const Checked: Story = {
	args: {
		label: 'Checked Checkbox',
		checked: true,
	},
};

