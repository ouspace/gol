import type { Meta, StoryObj } from '@storybook/react';
import BaseButton from '../button';


const meta: Meta<typeof BaseButton> = {
	title: 'Components/Buttons',
	component: BaseButton,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BaseButton>;

// Filled variant
export const Filled: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Filled</BaseButton>,
	args: {
		variant: 'filled',
	},
};

// Elevated variant
export const Elevated: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Elevated</BaseButton>,
	args: {
		variant: 'elevated',
	},
};

// Tonal variant
export const Tonal: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Tonal</BaseButton>,
	args: {
		variant: 'tonal',
	},
};

// Outlined variant
export const Outlined: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Outlined</BaseButton>,
	args: {
		variant: 'outlined',
	},
};

// Text variant
export const Text: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Text</BaseButton>,
	args: {
		variant: 'text',
	},
};

// Icon button example
export const Icon: Story = {
	render: (arguments_) => (
		<BaseButton {...arguments_} icon={<span style={{ fontSize: '20px' }}>🔍</span>}>
      Download
		</BaseButton>
	),
	args: {
		variant: 'text',
	},
};

// Floating Action Button (FAB)
export const FAB: Story = {
	render: (arguments_) => (
		<BaseButton {...arguments_} icon={<span style={{ fontSize: '24px' }}>➕</span>}>
      FAB
		</BaseButton>
	),
	args: {
		variant: 'filled',
		fullWidth: false,
	},
};

// Segmented group of buttons
export const Segmented: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '0.5rem' }}>
			<BaseButton variant="filled">Option 1</BaseButton>
			<BaseButton variant="outlined">Option 2</BaseButton>
		</div>
	),
};

// Button with onClick handler
export const Clickable: Story = {
	render: () => {
		const handleClick = () => {
			const result = document.querySelector('#click-result');
			if (result) result.innerText = 'Clicked!';
		};

		return (
			<>
				<BaseButton onClick={handleClick}>Click Me</BaseButton>
				<div id="click-result" />
			</>
		);
	},
};

// Button rendered as anchor tag
export const AsLink: Story = {
	render: () => (
		<BaseButton variant="filled" href="/dashboard">
      Go to Dashboard
		</BaseButton>
	),
};

// Disabled button
export const Disabled: Story = {
	render: () => (
		<BaseButton disabled>Disabled</BaseButton>
	),
};

// Empty button (no text or icon)
export const Empty: Story = {
	render: () => (
		<BaseButton />
	),
};

// Layout and fullWidth example
export const Layout: Story = {
	render: () => (
		<BaseButton layout="horizontal" fullWidth>
      Layout Test
		</BaseButton>
	),
};
