import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '../checkbox';

const meta: Meta<typeof Checkbox> = {
	title: 'Components/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {
		onChange: { action: 'changed' },
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'error'],
		},
		value: {
			control: 'select',
			options: [false, true, null],
		}
	}
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: {
		label: 'Default Checkbox',
		value: false,
		onChange: (event, properties) => {
			console.log('onChange', event, properties);
		},
	},
	parameters: {
		docs: {
			source: {
				code: `<Checkbox label="Default Checkbox" value={false} onChange={() => {}} />`,
			},
		},
	},
};

export const Checked: Story = {
	args: {
		label: 'Checked Checkbox',
		value: true,
	},
	parameters: {
		docs: {
			source: {
				code: `<Checkbox label="Checked Checkbox" value={true} onChange={() => {}} />`,
			},
		},
	},
};

export const Indeterminate: Story = {
	args: {
		label: 'Indeterminate Checkbox',
		value: null,
	},
	parameters: {
		docs: {
			source: {
				code: `<Checkbox label="Indeterminate Checkbox" value={null} onChange={() => {}} />`,
			},
		},
	},
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Checkbox',
		disabled: true,
	},
	parameters: {
		docs: {
			source: {
				code: `<Checkbox label="Disabled Checkbox" disabled onChange={() => {}} />`,
			},
		},
	},
};

export const VariantSecondary: Story = {
	args: {
		label: 'Secondary Variant',
		value: true,
		variant: 'secondary',
	},
	parameters: {
		docs: {
			source: {
				code: `<Checkbox label="Secondary Variant" value={true} variant="secondary" onChange={() => {}} />`,
			},
		},
	},
};

export const ThemeError: Story = {
	args: {
		label: 'Error Variant',
		value: true,
		variant: 'error',
	},
	parameters: {
		docs: {
			source: {
				code: `<Checkbox label="Error Variant" value={true} variant="error" onChange={() => {}} />`,
			},
		},
	},
};
