import type { Meta, StoryObj } from '@storybook/react';
import BaseButton from '../button';

const meta: Meta<typeof BaseButton> = {
	title: 'Components/Buttons',
	component: BaseButton,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BaseButton>;

// Filled Button
export const Filled: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Filled</BaseButton>,
	args: {
		variant: 'filled',
	},
};

// Elevated Button
export const Elevated: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Elevated</BaseButton>,
	args: {
		variant: 'elevated',
	},
};

// Tonal Button
export const Tonal: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Tonal</BaseButton>,
	args: {
		variant: 'tonal',
	},
};

// Outlined Button
export const Outlined: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Outlined</BaseButton>,
	args: {
		variant: 'outlined',
	},
};

// Text Button
export const Text: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Text</BaseButton>,
	args: {
		variant: 'text',
	},
};

// Icon Button
export const Icon: Story = {
	render: (arguments_) => (
		<BaseButton
			{...arguments_}
			icon={<span style={{ fontSize: '20px' }}>🔍</span>}
		>
      Icon
		</BaseButton>
	),
	args: {
		variant: 'text',
	},
};

// FAB - Floating Action Button
export const FAB: Story = {
	render: (arguments_) => (
		<BaseButton
			{...arguments_}
			icon={<span style={{ fontSize: '24px' }}>➕</span>}
		>
      FAB
		</BaseButton>
	),
	args: {
		variant: 'filled',
		fullWidth: false,
	},
};

// Segmented Button (placeholder)
export const Segmented: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '0.5rem' }}>
			<BaseButton variant="filled">Option 1</BaseButton>
			<BaseButton variant="outlined">Option 2</BaseButton>
		</div>
	),
};
