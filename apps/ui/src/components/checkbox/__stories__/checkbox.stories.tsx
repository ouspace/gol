import type { Meta, StoryObj } from '@storybook/react';
import { default as Checkbox } from '../checkbox';

const meta: Meta<typeof Checkbox> = {
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {
		onChange: { action: 'changed' },
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'error'],
		},
		indeterminate: {
			control: 'boolean',
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

export const Indeterminate: Story = {
	args: {
		label: 'Indeterminate Checkbox',
		indeterminate: true,
	},
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Checkbox',
		disabled: true,
	},
};

export const VariantSecondary: Story = {
	args: {
		label: 'Secondary Variant',
		checked: true,
		variant: 'secondary',
	},
};

export const ThemeError: Story = {
	args: {
		label: 'Error Variant',
		checked: true,
		variant: 'error',
	},
};