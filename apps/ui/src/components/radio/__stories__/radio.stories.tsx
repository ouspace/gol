import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Radio from '../radio';
import { Icon } from '../../icon/index';

const meta: Meta<typeof Radio> = {
	title: 'Components/Radio',
	component: Radio,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'normal', 'big', 14, 18, 22, 26],
		},
		color: {
			control: 'select',
			options: [
				'blue',
				'red',
				'green',
				'purple',
				'orange',
				'yellow',
				'teal',
				'violet',
				'pink',
				'brown',
				'grey',
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

export const Default: Story = {
	args: {
		label: 'Default radio button',
		checked: true,
	},
};

export const States: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
			<Radio label='Unchecked' />
			<Radio label='Checked' checked />
			<Radio label='Disabled' disabled />
			<Radio label='Disabled Checked' disabled checked />
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
			<Radio label='Small' size='small' checked />
			<Radio label='Normal' size='normal' checked />
			<Radio label='Big' size='big' checked />
			<Radio label='Custom (26px)' size={26} checked />
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
			<Radio label='Blue' color='blue' checked />
			<Radio label='Red' color='red' checked />
			<Radio label='Green' color='green' checked />
			<Radio label='Purple' color='purple' checked />
			<Radio label='Orange' color='orange' checked />
			<Radio label='Custom (#ff1744)' color='#ff1744' checked />
		</div>
	),
};

export const Labels: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<Radio label={{ value: 'Right position', position: 'right' }} checked />
			<Radio label={{ value: 'Left position', position: 'left' }} checked />
			<Radio label={{ value: 'Top position', position: 'top' }} checked />
			<Radio label={{ value: 'Bottom position', position: 'bottom' }} checked />
			<Radio label={{ value: 'Colored label', color: 'red' }} checked color='red' />
			<Radio label={<strong>Bold label</strong>} checked />
		</div>
	),
};

export const Icons: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
			<Radio
				label='Custom icon unchecked'
				icon={<Icon name='radio_button_unchecked' size='normal' color='purple' />}
				checkedIcon={<Icon name='radio_button_checked' size='normal' color='purple' />}
				color='purple'
			/>
			<Radio
				label='Custom icon checked'
				icon={<Icon name='radio_button_unchecked' size='normal' color='purple' />}
				checkedIcon={<Icon name='radio_button_checked' size='normal' color='purple' />}
				checked
			/>
			<Radio
				label='Custom icon unchecked'
				icon={<Icon name='favorite' size={18} color='red' />}
				checkedIcon={<Icon name='favorite' size={18} fill color='red' />}
				color='red'
			/>
			<Radio
				label='Custom icon checked'
				icon={<Icon name='favorite' size={18} color='red' />}
				checkedIcon={<Icon name='favorite' size={18} fill color='red' />}
				color='red'
				checked
			/>
		</div>
	),
};
