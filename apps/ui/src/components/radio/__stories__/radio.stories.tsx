import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Radio from '../radio';
import { Icon } from '../../icon/index';

const meta: Meta<typeof Radio> = {
	title: 'Components/Radio',
	component: Radio,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'normal', 'big', 14, 18, 22],
		},
		color: {
			control: 'select',
			options: [
				'orange',
				'yellow',
				'olive',
				'teal',
				'violet',
				'purple',
				'pink',
				'brown',
				'grey',
				'red',
				'green',
				'blue',
				'black',
				'#ff0000',
				'rgb(0,255,0)',
				'hsl(240,100%,50%)',
			],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Radio>;

// Basic radio
export const Default: Story = {
	args: {
		label: 'Default Radio',
		value: 'default',
		checked: false,
	},
};

export const Checked: Story = {
	args: {
		label: 'Checked Radio',
		value: 'checked',
		checked: true,
	},
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Radio',
		value: 'disabled',
		disabled: true,
		checked: false,
	},
};

export const DisabledChecked: Story = {
	args: {
		label: 'Disabled Checked',
		value: 'disabled-checked',
		disabled: true,
		checked: true,
	},
};

// Sizes
export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
			<Radio label='Small' value='small' size='small' />
			<Radio label='Normal' value='normal' size='normal' />
			<Radio label='Big' value='big' size='big' />
		</div>
	),
};

// Colors
export const Colors: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
			<Radio label='Blue' value='blue' color='blue' checked />
			<Radio label='Red' value='red' color='red' checked />
			<Radio label='Green' value='green' color='green' checked />
			<Radio label='Purple' value='purple' color='purple' checked />
			<Radio label='Orange' value='orange' color='orange' checked />
		</div>
	),
};

// Label positions
export const LabelPositions: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
			<Radio label={{ value: 'Right (default)', position: 'right' }} value='right' checked />
			<Radio label={{ value: 'Left', position: 'left' }} value='left' checked />
			<Radio label={{ value: 'Top', position: 'top' }} value='top' checked />
			<Radio label={{ value: 'Bottom', position: 'bottom' }} value='bottom' checked />
		</div>
	),
};

// Custom icons
export const WithCustomIcons: Story = {
	args: {
		label: 'Custom Icons',
		value: 'custom',
		icon: <Icon name='radio_button_unchecked' size='normal' color='grey' />,
		checkedIcon: <Icon name='radio_button_checked' size='normal' color='blue' />,
		checked: true,
	},
};

// Radio group example
export const RadioGroup: Story = {
	render: () => {
		const [selected, setSelected] = useState('option1');

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
				<Radio
					name='group1'
					value='option1'
					label='Option 1'
					checked={selected === 'option1'}
					onChange={(error, properties) => { setSelected(properties.value ?? ''); }}
				/>
				<Radio
					name='group1'
					value='option2'
					label='Option 2'
					checked={selected === 'option2'}
					onChange={(error, properties) => { setSelected(properties.value ?? ''); }}
				/>
				<Radio
					name='group1'
					value='option3'
					label='Option 3'
					checked={selected === 'option3'}
					onChange={(error, properties) => { setSelected(properties.value ?? ''); }}
				/>
				<p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
					Selected: <strong>{selected}</strong>
				</p>
			</div>
		);
	},
};

// Label with ReactNode
export const WithReactNodeLabel: Story = {
	args: {
		label: (
			<span>
				I agree to the{' '}
				<a href='#' style={{ color: 'blue' }}>
					terms and conditions
				</a>
			</span>
		),
		value: 'terms',
		checked: false,
	},
};

// Required field
export const Required: Story = {
	args: {
		label: 'Required field *',
		value: 'required',
		required: true,
		checked: false,
	},
};
