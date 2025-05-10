import type { Meta, StoryObj } from '@storybook/react';
import { default as Checkbox } from '../checkbox';

const meta: Meta<typeof Checkbox> = {
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {
		onChange: { action: 'changed' },
		theme: {
			control: 'select',
			options: ['primary', 'secondary', 'error'],
		}
	}
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

export const Disabled: Story = {
	args: {
		label: 'Disabled Checkbox',
		disabled: true,
	},
};

export const ThemeSecondary: Story = {
	args: {
		label: 'Secondary Theme',
		checked: true,
		theme: 'secondary',
	},
};

export const ThemeError: Story = {
	args: {
		label: 'Error Theme',
		checked: true,
		theme: 'error',
	},
};