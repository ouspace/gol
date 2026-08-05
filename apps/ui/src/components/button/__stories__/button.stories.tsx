import type { Meta, StoryObj } from '@storybook/react-vite';
import BaseButton from '../button';

const meta: Meta<typeof BaseButton> = {
	title: 'Components/Buttons',
	component: BaseButton,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BaseButton>;

/**
 * @summary the filled variant — default emphasis for the primary action in a view
 */
export const Filled: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Filled</BaseButton>,
	args: {
		variant: 'filled',
	},
};

/**
 * @summary the elevated variant — filled with a shadow for lifted, attention-grabbing actions
 */
export const Elevated: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Elevated</BaseButton>,
	args: {
		variant: 'elevated',
	},
};

/**
 * @summary the tonal variant — secondary action with a surface-tinted fill
 */
export const Tonal: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Tonal</BaseButton>,
	args: {
		variant: 'tonal',
	},
};

/**
 * @summary the outlined variant — important but low-emphasis action with a border
 */
export const Outlined: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Outlined</BaseButton>,
	args: {
		variant: 'outlined',
	},
};

/**
 * @summary the text variant — lowest-emphasis action, no fill or border, for dense UIs
 */
export const Text: Story = {
	render: (arguments_) => <BaseButton {...arguments_}>Text</BaseButton>,
	args: {
		variant: 'text',
	},
};

/**
 * @summary adding a leading icon to reinforce the action's meaning (icon stays before the label)
 */
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

/**
 * @summary a Floating Action Button (FAB) for the primary action of a screen, with a leading plus icon
 */
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

/**
 * @summary two related actions grouped as a segmented pair (demonstrates contrast between filled and outlined)
 */
export const Segmented: Story = {
	tags: ['!manifest'],
	render: () => (
		<div style={{ display: 'flex', gap: '0.5rem' }}>
			<BaseButton variant='filled'>Option 1</BaseButton>
			<BaseButton variant='outlined'>Option 2</BaseButton>
		</div>
	),
};

/**
 * @summary wiring an onClick handler to respond to user taps
 */
export const Clickable: Story = {
	render: () => {
		const handleClick = () => {
			const result = document.querySelector('#click-result');
			if (result) result.textContent = 'Clicked!';
		};

		return (
			<>
				<BaseButton onClick={handleClick}>Click Me</BaseButton>
				<div id='click-result' />
			</>
		);
	},
};

/**
 * @summary rendering the button as a link by passing `href` (renders an <a> instead of a <button>)
 */
export const AsLink: Story = {
	render: () => (
		<BaseButton variant='filled' href='/dashboard'>
			Go to Dashboard
		</BaseButton>
	),
};

/**
 * @summary the disabled state blocks interaction and signals an unavailable action
 */
export const Disabled: Story = {
	render: () => (
		<BaseButton disabled>Disabled</BaseButton>
	),
};

/**
 * @summary an empty button with no text or icon falls back to a default label (edge case, for instruction only)
 */
export const Empty: Story = {
	tags: ['!manifest'],
	render: () => (
		<BaseButton />
	),
};

/**
 * @summary the horizontal layout with fullWidth stretches the button to fill its container
 */
export const Layout: Story = {
	tags: ['!manifest'],
	render: () => (
		<BaseButton layout='horizontal' fullWidth>
			Layout Test
		</BaseButton>
	),
};
