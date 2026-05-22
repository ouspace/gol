import type { Meta, StoryObj } from '@storybook/react-vite';
import Radio from '../radio';
import { Icon } from '../../icon';

const meta: Meta<typeof Radio> = {
	title: 'Components/Radio',
	component: Radio,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'normal', 'big'],
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
			<Radio label={{ content: 'Blue', color: 'blue' }} color='blue' checked />
			<Radio label={{ content: 'Red', color: 'red' }} color='red' checked />
			<Radio label={{ content: 'Green', color: 'green' }} color='green' checked />
			<Radio label={{ content: 'Purple', color: 'purple' }} color='purple' checked />
			<Radio label={{ content: 'Orange', color: 'orange' }} color='orange' checked />
			<Radio label={{ content: 'Custom (#ff1744)', color: '#ff1744' }} color='#ff1744' checked />
		</div>
	),
};

export const Labels: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<Radio label={{ content: 'Right position', position: 'right' }} checked />
			<Radio label={{ content: 'Left position', position: 'left' }} checked />
			<Radio label={{ content: 'Top position', position: 'top' }} checked />
			<Radio label={{ content: 'Bottom position', position: 'bottom' }} checked />
			<Radio label={{ content: 'Colored label', color: 'red' }} checked color='red' />
			<Radio checked>
				<strong>Bold label</strong>
			</Radio>
		</div>
	),
};

export const Icons: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
			<Radio
				label={{ content: 'Custom icon unchecked', color: 'purple' }}
				icon={<Icon name='radio_button_unchecked' size={24} color='purple' />}
				checkedIcon={<Icon name='radio_button_checked' size={24} color='purple' />}
				color='purple'
			/>
			<Radio
				label={{ content: 'Custom icon checked', color: 'purple' }}
				icon={<Icon name='radio_button_unchecked' size={24} color='purple' />}
				checkedIcon={<Icon name='radio_button_checked' size={24} color='purple' />}
				checked
			/>
			<Radio
				label={{ content: 'Custom icon unchecked', color: 'red' }}
				icon={<Icon name='favorite' size={18} color='red' />}
				checkedIcon={<Icon name='favorite' size={18} fill color='red' />}
				color='red'
			/>
			<Radio
				label={{ content: 'Custom icon checked', color: 'red' }}
				icon={<Icon name='favorite' size={18} color='red' />}
				checkedIcon={<Icon name='favorite' size={18} fill color='red' />}
				color='red'
				checked
			/>
		</div>
	),
};
