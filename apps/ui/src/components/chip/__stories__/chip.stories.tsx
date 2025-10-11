import type { Meta, StoryObj } from '@storybook/react';
import Chip from '../chip';
import { Icon } from '../../icon/index';

const meta: Meta<typeof Chip> = {
	title: 'Components/Chip',
	component: Chip,
	tags: ['autodocs'],
	argTypes: {
		role: {
			control: 'select',
			options: ['assist', 'filter', 'input', 'suggestion'],
		},
		color: {
			control: 'select',
			options: ['default', 'primary', 'secondary', 'error', 'success', 'warning','red','blue','green','yellow','#fff000','rgb(255,0,0)','rgba(0,255,0,0.5)','hsl(240,100%,50%)','hsla(120,100%,50%,0.3)'],
		},
		variant: {
			control: 'select',
			options: ['filled', 'outlined'],
		},
		radius: {
			control: 'select',
			options: ['square', 'rounded', 8, '50%', '2rem','1em'],
		},
		size: {
			control: 'select',
			options: ['small', 'normal', 'big', 24, 32, 40],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Chip>;

// Basic chips
export const Default: Story = {
	args: {
		children: 'Default Chip',
	},
};

export const WithIcon: Story = {
	args: {
		children: 'Chip with Icon',
		icon: <Icon name="star" size="small" weight="bold" color="red"/>,
	},
};

// Role variants
export const Assist: Story = {
	args: {
		role: 'assist',
		children: 'Assist Chip',
		icon: <Icon name="help" size="small" />,
		onClick: (event, properties) => {
			console.log('onChange', event, properties);
		},
	},
};

export const Filter: Story = {
	args: {
		role: 'filter',
		children: 'Filter Chip',
		selected: false,
		icon: <Icon name="filter_list" size="small" />,
		onToggle: (event, selected, properties) => {
			console.log('onChange', event, selected, properties);
		},
	},
};

export const FilterSelected: Story = {
	args: {
		role: 'filter',
		children: 'Selected Filter',
		selected: true,
		icon: <Icon name="check" size="small" />,
		onToggle: (event, selected, properties) => {
			console.log('onChange', event, selected, properties);
		},
	},
};

export const Input: Story = {
	args: {
		role: 'input',
		children: 'Input Chip',
		onRemove: (event, properties) => {
			console.log('onChange', event, properties);
		},
	},
};

export const InputWithAvatar: Story = {
	args: {
		role: 'input',
		children: 'John Doe',
		avatar: <img src="https://i.pravatar.cc/32" />,
		onRemove: (event, properties) => {
			console.log('onChange', event, properties);
		},
	},
};

export const Suggestion: Story = {
	args: {
		role: 'suggestion',
		children: 'Suggestion Chip',
		onClick: (event, properties) => {
			console.log('onChange', event, properties);
		},
	},
};

// Color variants
export const Colors: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
			<Chip color="default">Default</Chip>
			<Chip color="primary">Primary</Chip>
			<Chip color="secondary">Secondary</Chip>
			<Chip color="success">Success</Chip>
			<Chip color="warning">Warning</Chip>
			<Chip color="error" size="small">Error</Chip>
		</div>
	),
};

// Variant styles
export const Variants: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
			<Chip variant="filled" color="primary">Filled</Chip>
			<Chip variant="outlined" color="primary">Outlined</Chip>
		</div>
	),
};

// States
export const Disabled: Story = {
	args: {
		children: 'Disabled Chip',
		disabled: true,
		icon: <Icon name="lock" size="big" />,
	},
};

export const AsLink: Story = {
	args: {
		children: 'Link Chip',
		href: 'https://storybook.js.org/',
		target: '_blank',
		icon: <Icon name="link" size="small" />,
	},
};
