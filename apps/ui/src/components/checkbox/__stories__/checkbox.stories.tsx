import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '../checkbox';
import { Icon } from '../../icon';

const meta: Meta<typeof Checkbox> = {
	title: 'Components/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'normal', 'big'],
		},
		value: {
			control: 'select',
			options: [false, true, null],
		},
		circular: {
			control: 'boolean',
		},
		disabled: {
			control: 'boolean',
		},
		color: {
			control: 'color',
		},
	}
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Basic checkbox
export const Default: Story = {
	args: {
		label: 'Default Checkbox',
		value: false,
	},
};

export const Checked: Story = {
	args: {
		label: 'Checked Checkbox',
		value: true,
	},
};

export const Indeterminate: Story = {
	args: {
		label: 'Indeterminate Checkbox',
		value: null,
	},
};

// States
export const Disabled: Story = {
	args: {
		label: 'Disabled Checkbox',
		disabled: true,
		value: false,
	},
};

export const DisabledChecked: Story = {
	args: {
		label: 'Disabled Checked',
		disabled: true,
		value: true,
	},
};

// Sizes
export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
			<Checkbox label="Small" size="small" value={true} />
			<Checkbox label="Normal" size="normal" value={true} />
			<Checkbox label="Big" size="big" value={true} />
		</div>
	),
};

// Colors
export const Colors: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
			<Checkbox label="Blue" color="blue" value={true} />
			<Checkbox label="Red" color="red" value={true} />
			<Checkbox label="Green" color="green" value={true} />
			<Checkbox label="Purple" color="purple" value={true} />
			<Checkbox label="Custom" color="#ff6b35" value={true} />
		</div>
	),
};

// Label Positions
export const LabelPositions: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
			<Checkbox label={{ value: "Top", position: "top" }} value={true} />
			<Checkbox label={{ value: "Right", position: "right" }} value={true} />
			<Checkbox label={{ value: "Bottom", position: "bottom" }} value={true} />
			<Checkbox label={{ value: "Left", position: "left" }} value={true} />
		</div>
	),
};

// Circular
export const Circular: Story = {
	args: {
		label: 'Circular Checkbox',
		circular: true,
		value: true,
	},
};

// Custom Icons
export const CustomIcons: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
			<Checkbox
				label="Favorite"
				value={false}
				icon={<Icon name="favorite" size={18} variant="outlined" />}
				checkedIcon={<Icon name="favorite" size={18} fill variant="outlined" />}
				color="red"
			/>
			<Checkbox
				label="Favorite"
				value={true}
				icon={<Icon name="favorite" size={18} variant="outlined" />}
				checkedIcon={<Icon name="favorite" size={18} fill variant="outlined" />}
				color="red"
			/>
			<Checkbox
				label="Star"
				value={false}
				icon={<Icon name="star" size={20} variant="outlined" />}
				checkedIcon={<Icon name="star" size={20} fill variant="outlined" />}
				color="orange"
			/>
			<Checkbox
				label="Star"
				value={true}
				icon={<Icon name="star" size={20} variant="outlined" />}
				checkedIcon={<Icon name="star" size={20} fill variant="outlined" />}
				color="orange"
			/>
			<Checkbox
				label="Bookmark"
				value={false}
				icon={<Icon name="bookmark" size={18} variant="outlined" />}
				checkedIcon={<Icon name="bookmark" size={18} fill variant="outlined" />}
				color="blue"
			/>
			<Checkbox
				label="Bookmark"
				value={true}
				icon={<Icon name="bookmark" size={18} variant="outlined" />}
				checkedIcon={<Icon name="bookmark" size={18} fill variant="outlined" />}
				color="blue"
			/>
		</div>
	),
};

// Advanced Label with TextProperties
export const AdvancedLabel: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<Checkbox
				label={{ value: "Simple string label", position: "right" }}
				value={true}
			/>
			<Checkbox
				label={{ value: "Red colored label", position: "right", color: "red" }}
				value={true}
			/>
			<Checkbox
				label={{ value: "Label with custom class", position: "left", className: "custom-label" }}
				value={true}
			/>
			<Checkbox
				label={{ value: "Purple label on top", position: "top", color: "#9c27b0" }}
				value={true}
			/>
		</div>
	),
};

// ReactNode Label
export const ReactNodeLabel: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<Checkbox
				label={<span>I agree to the <a href="/terms" style={{ color: 'blue' }}>terms and conditions</a></span>}
				value={false}
			/>
			<Checkbox
				label={<strong>Bold label text</strong>}
				value={true}
			/>
			<Checkbox
				label={<em style={{ color: 'green' }}>Italic green label</em>}
				value={true}
			/>
		</div>
	),
};
