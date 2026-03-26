import type { Meta, StoryObj } from '@storybook/react-vite';
import Checkbox from '../checkbox';
import { Icon } from '../../icon';
import { Text } from '../../text';

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
	},
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Basic
export const Default: Story = {
	args: {
		label: 'Default Checkbox',
		value: false,
	},
};

// States
export const States: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
			<Checkbox label='Unchecked' value={false} />
			<Checkbox label='Checked' value={true} />
			<Checkbox label='Indeterminate' value={null} />
		</div>
	),
};

// Disabled
export const Disabled: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<Checkbox label='Unchecked' disabled value={false} />
			<Checkbox label='Checked' disabled value={true} />
			<Checkbox label='Indeterminate' disabled value={null} />
			<Checkbox
				label='With Icon'
				disabled
				value={true}
				icon={<Icon name='favorite' size={18} variant='outlined' />}
				checkedIcon={<Icon name='favorite' size={18} fill variant='outlined' />}
				color='red'
			/>
		</div>
	),
};

// Sizes
export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
			<Checkbox label='Small' size='small' value={true} />
			<Checkbox label='Normal' size='normal' value={true} />
			<Checkbox label='Big' size='big' value={true} />
		</div>
	),
};

// Colors
export const Colors: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
			<Checkbox label={{ content: 'Blue', color: 'blue' }} color='blue' value={true} />
			<Checkbox label={{ content: 'Red', color: 'red' }} color='red' value={true} />
			<Checkbox label={{ content: 'Green', color: 'green' }} color='green' value={true} />
			<Checkbox label={{ content: 'Purple', color: 'purple' }} color='purple' value={true} />
			<Checkbox label={{ content: 'Custom', color: '#ff6b35' }} color='#ff6b35' value={true} />
		</div>
	),
};

// Label
export const Labels: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
			<Checkbox label={{ content: 'Right position', position: 'right' }} value={true} />
			<Checkbox label={{ content: 'Left position', position: 'left' }} value={true} />
			<Checkbox label={{ content: 'Top position', position: 'top' }} value={true} />
			<Checkbox label={{ content: 'Bottom position', position: 'bottom' }} value={true} />
			<Checkbox label={{ content: 'Colored label', color: 'red' }} value={true} />
			<Checkbox label={{ content: <strong>Bold label</strong> }} value={true} />
		</div>
	),
};

// Custom Icons
export const CustomIcons: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
			<Checkbox
				label='Favorite'
				value={false}
				icon={<Icon name='favorite' size={18} variant='outlined' color='red' />}
				checkedIcon={<Icon name='favorite' size={18} fill variant='outlined' color='red' />}
				color='red'
			/>
			<Checkbox
				label='Favorite'
				value={true}
				icon={<Icon name='favorite' size={18} variant='outlined' color='red' />}
				checkedIcon={<Icon name='favorite' size={18} fill variant='outlined' color='red' />}
				color='red'
			/>
			<Checkbox
				label='Star'
				value={false}
				icon={<Icon name='star' size={20} variant='outlined' color='orange' />}
				checkedIcon={<Icon name='star' size={20} fill variant='outlined' color='orange' />}
				color='orange'
			/>
			<Checkbox
				label='Star'
				value={true}
				icon={<Icon name='star' size={20} variant='outlined' color='orange' />}
				checkedIcon={<Icon name='star' size={20} fill variant='outlined' color='orange' />}
				color='orange'
			/>
			<Checkbox
				value={false}
				icon={<Icon name='bookmark' size={18} variant='outlined' color='blue' />}
				checkedIcon={<Icon name='bookmark' size={18} fill variant='outlined' color='blue' />}
				color='blue'>
				<Text size='small'>Bookmark</Text>
			</Checkbox>
			<Checkbox
				value={true}
				icon={<Icon name='bookmark' size={18} variant='outlined' color='blue' />}
				checkedIcon={<Icon name='bookmark' size={18} fill variant='outlined' color='blue' />}
				color='blue'>
				<Text size='small'>Bookmark</Text>
			</Checkbox>
		</div>
	),
};

// Circular
export const Circular: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
			<Checkbox label='Unchecked' circular value={false} />
			<Checkbox label='Checked' circular value={true} />
		</div>
	),
};
