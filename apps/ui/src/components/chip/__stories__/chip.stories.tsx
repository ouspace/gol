import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from '@storybook/test';

import Chip from '../root';
import { Icon } from '../../icon';

const meta: Meta<typeof Chip> = {
	title: 'Components/Chip',
	component: Chip,
	tags: ['autodocs'],
	parameters: {
		a11y: {
			disable: false,
		},
		docs: {
			description: {
				component:
					'Chips are compact elements that represent an input, attribute, or action. Supports four roles: assist, filter, input, and suggestion.',
			},
		},
	},
	argTypes: {
		role: {
			control: 'select',
			options: ['assist', 'filter', 'input', 'suggestion'],
		},
		color: {
			control: 'select',
			options: ['default', 'primary', 'secondary', 'error', 'success', 'warning'],
		},
		variant: {
			control: 'select',
			options: ['filled', 'outlined'],
		},
		radius: {
			control: 'select',
			options: ['square', 'rounded'],
		},
		size: {
			control: 'select',
			options: ['small', 'normal', 'big'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Chip>;

// Basic
export const Default: Story = {
	args: {
		label: 'Default Chip',
	},
};

// Roles
export const Roles: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
			<Chip role='assist' label='Assist' icon={<Icon name='help' size='small' />} onClick={fn()} />
			<Chip role='filter' label='Filter' icon={<Icon name='filter_list' size='small' />} onToggle={fn()} />
			<Chip role='input' label='Input' avatar={<img src='https://i.pravatar.cc/32' alt='Avatar' />} onRemove={fn()} />
			<Chip role='suggestion' label='Suggestion' onClick={fn()} />
		</div>
	),
};

// Variants
export const States: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
			<Chip color='primary' variant='filled' label='Default' />
			<Chip color='primary' variant='filled' label='Disabled' disabled />
			<Chip color='primary' variant='filled' role='filter' label='Selected' selected />
			<Chip color='primary' variant='outlined' label='Outlined' />
			<Chip color='primary' variant='outlined' role='filter' label='Outlined selected' selected />
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
			{(['default', 'primary', 'secondary', 'success', 'warning', 'error'] as const).map((color) => (
				<div key={color} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
					<span style={{ width: '64px', fontSize: '12px', textTransform: 'capitalize', color: '#666' }}>{color}</span>
					<Chip color={color} variant='filled' label={`Filled ${color}`} />
					<Chip color={color} variant='outlined' label={`Outlined ${color}`} />
				</div>
			))}
		</div>
	),
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
			<div style={{ display: 'flex', gap: '8px', flexDirection: 'column', alignItems: 'center' }}>
				<Chip variant='filled' color='primary' label='Filled' />
			</div>
			<div style={{ display: 'flex', gap: '8px', flexDirection: 'column', alignItems: 'center' }}>
				<Chip variant='outlined' color='primary' label='Outlined' />
			</div>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
			<Chip size='small' label='Small' />
			<Chip size='normal' label='Normal' />
			<Chip size='big' label='Big' />
		</div>
	),
};

// Customization
export const Customization: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
				<Chip radius='square' label='Square' />
				<Chip radius='rounded' label='Rounded' />
				<Chip radius={4} label='Numeric 4' />
				<Chip radius='50%' label='Pill' />
			</div>
			<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
				<Chip color='#FF6B35' variant='outlined' label='Brand' />
				<Chip color='rgb(99 102 241)' label='Custom RGB' />
				<Chip color='hsl(340 82% 52%)' label='Custom HSL' />
			</div>
		</div>
	),
};

// Polymorphism
export const AsLink: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
			<Chip label='Button chip' />
			<Chip href='/dashboard' label='Internal link' />
			<Chip
				href='https://storybook.js.org/'
				target='_blank'
				label='External link'
				icon={<Icon name='link' size='small' />}
			/>
		</div>
	),
};

// Interactions
export const Interactions: Story = {
	render: () => {
		const [count, setCount] = React.useState(0);
		const [selected, setSelected] = React.useState(false);
		const [visible, setVisible] = React.useState(true);

		return (
			<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
				<Chip role='assist' label={`Clicked ${count} times`} onClick={() => setCount((c) => c + 1)} />
				<Chip
					role='filter'
					label={selected ? 'Active' : 'Inactive'}
					selected={selected}
					onToggle={(_e, next) => setSelected(next)}
				/>
				{visible && <Chip role='input' label='Removable' onRemove={() => setVisible(false)} />}
				{!visible && <span>Removed</span>}
				<Chip role='assist' label='Disabled' disabled onClick={fn()} />
			</div>
		);
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const clickChip = canvas.getByRole('button', { name: /clicked 0 times/i });
		const toggleChip = canvas.getByRole('button', { name: /inactive/i });
		const removeButton = canvas.getByLabelText(/remove/i);
		const disabledChip = canvas.getByRole('button', { name: /disabled/i });

		await step('Click increments counter', async () => {
			await userEvent.click(clickChip);
			await expect(canvas.getByText('Clicked 1 times')).toBeInTheDocument();
		});

		await step('Toggle filter updates aria-pressed', async () => {
			await userEvent.click(toggleChip);
			await expect(toggleChip).toHaveAttribute('aria-pressed', 'true');
			await userEvent.click(toggleChip);
			await expect(toggleChip).toHaveAttribute('aria-pressed', 'false');
		});

		await step('Remove button hides input chip', async () => {
			await userEvent.click(removeButton);
			await expect(canvas.getByText('Removed')).toBeInTheDocument();
		});

		await step('Disabled chip ignores clicks', async () => {
			await userEvent.click(disabledChip);
			await expect(disabledChip).toBeDisabled();
		});
	},
};

export const InteractionsKeyboard: Story = {
	render: () => {
		const [pressed, setPressed] = React.useState(false);
		return <Chip role='assist' label={pressed ? 'Activated' : 'Press me'} onClick={() => setPressed(true)} />;
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const chip = canvas.getByRole('button', { name: /press me/i });

		await step('Tab focuses the chip', async () => {
			await userEvent.tab();
			await expect(chip).toHaveFocus();
		});

		await step('Enter activates onClick', async () => {
			await userEvent.keyboard('{Enter}');
			await expect(canvas.getByText('Activated')).toBeInTheDocument();
		});
	},
};
