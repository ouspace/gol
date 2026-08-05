import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';
import Checkbox from '../root';
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

/**
 * @summary the default unchecked checkbox — the most common starting state
 */
export const Default: Story = {
	args: {
		label: 'Default Checkbox',
		value: false,
	},
};

/**
 * @summary the three selection states (unchecked, checked, indeterminate) side by side
 */
export const States: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
			<Checkbox label='Unchecked' value={false} />
			<Checkbox label='Checked' value={true} />
			<Checkbox label='Indeterminate' value={null} />
		</div>
	),
};

/**
 * @summary the disabled state blocks interaction across all three selection states
 */
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
				icon={{ name: 'favorite', size: 24, variant: 'outlined', viewBox: '0 -960 960 960' }}
				checkedIcon={{ name: 'favorite', size: 24, fill: true, variant: 'outlined', viewBox: '0 -960 960 960' }}
				color='red'
			/>
		</div>
	),
};

/**
 * @summary the three sizes (small, normal, big) for fitting different UI densities
 */
export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
			<Checkbox label='Small' size='small' value={true} />
			<Checkbox label='Normal' size='normal' value={true} />
			<Checkbox label='Big' size='big' value={true} />
		</div>
	),
};

/**
 * @summary preset and custom colors (hex) for matching the checkbox to brand or semantic meaning
 */
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

/**
 * @summary label positioning and styling — place the label right/left/top/bottom, recolor it, or use JSX content
 */
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

/**
 * @summary replacing the default check glyph with custom icons for checked and unchecked states
 */
export const CustomIcons: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
			<Checkbox
				label='Favorite'
				value={false}
				icon={{ name: 'favorite', size: 24, variant: 'outlined', viewBox: '0 -960 960 960', color: 'red' }}
				checkedIcon={{
					name: 'favorite',
					size: 24,
					fill: true,
					variant: 'outlined',
					viewBox: '0 -960 960 960',
					color: 'red',
				}}
				color='red'
			/>
			<Checkbox
				label='Favorite'
				value={true}
				icon={{ name: 'favorite', size: 24, variant: 'outlined', viewBox: '0 -960 960 960', color: 'red' }}
				checkedIcon={{
					name: 'favorite',
					size: 24,
					fill: true,
					variant: 'outlined',
					viewBox: '0 -960 960 960',
					color: 'red',
				}}
				color='red'
			/>
			<Checkbox
				label='Star'
				value={false}
				icon={{ name: 'star', size: 24, variant: 'outlined', viewBox: '0 -960 960 960', color: 'orange' }}
				checkedIcon={{
					name: 'star',
					size: 24,
					fill: true,
					variant: 'outlined',
					viewBox: '0 -960 960 960',
					color: 'orange',
				}}
				color='orange'
			/>
			<Checkbox
				label='Star'
				value={true}
				icon={{ name: 'star', size: 24, variant: 'outlined', viewBox: '0 -960 960 960', color: 'orange' }}
				checkedIcon={{
					name: 'star',
					size: 24,
					fill: true,
					variant: 'outlined',
					viewBox: '0 -960 960 960',
					color: 'orange',
				}}
				color='orange'
			/>
			<Checkbox
				value={false}
				icon={{ name: 'bookmark', size: 24, variant: 'outlined', viewBox: '0 -960 960 960', color: 'blue' }}
				checkedIcon={{
					name: 'bookmark',
					size: 24,
					fill: true,
					variant: 'outlined',
					viewBox: '0 -960 960 960',
					color: 'blue',
				}}
				color='blue'>
				<Text size='small'>Bookmark</Text>
			</Checkbox>
			<Checkbox
				value={true}
				icon={{ name: 'bookmark', size: 24, variant: 'outlined', viewBox: '0 -960 960 960', color: 'blue' }}
				checkedIcon={{
					name: 'bookmark',
					size: 24,
					fill: true,
					variant: 'outlined',
					viewBox: '0 -960 960 960',
					color: 'blue',
				}}
				color='blue'>
				<Text size='small'>Bookmark</Text>
			</Checkbox>
		</div>
	),
};

/**
 * @summary the `circular` shape — use when the checkmark should sit in a circular (radio-like) container
 */
export const Circular: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
			<Checkbox label='Unchecked' circular value={false} />
			<Checkbox label='Checked' circular value={true} />
		</div>
	),
};

/**
 * @summary clicking the label or control toggles the value via onChange (interactive)
 */
export const InteractionsToggle: Story = {
	render: () => {
		const [checked, setChecked] = React.useState(false);
		return <Checkbox label='Toggle me' value={checked} onChange={(e, v) => setChecked(v.value!)} />;
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole('checkbox');

		await step('Click checkbox to check', async () => {
			await userEvent.click(canvas.getByText('Toggle me'));
			await expect(checkbox).toBeChecked();
		});
	},
};

/**
 * @summary keyboard users can focus the checkbox with Tab and toggle it with Space
 */
export const InteractionsKeyboard: Story = {
	render: () => {
		const [checked, setChecked] = React.useState(false);
		return <Checkbox label='Keyboard toggle' value={checked} onChange={(e, v) => setChecked(v.value!)} />;
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole('checkbox');

		await step('Tab to focus checkbox', async () => {
			await userEvent.tab();
			await expect(checkbox).toHaveFocus();
		});

		await step('Press Space to toggle', async () => {
			await userEvent.keyboard(' ');
			await expect(checkbox).toBeChecked();
		});
	},
};

/**
 * @summary clicking the label text toggles the checkbox too (useful for larger hit areas)
 */
export const InteractionsLabelClick: Story = {
	render: () => {
		const [checked, setChecked] = React.useState(false);
		return <Checkbox label='Click my label' value={checked} onChange={(e, v) => setChecked(v.value!)} />;
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole('checkbox');

		await step('Click label triggers onChange', async () => {
			await userEvent.click(canvas.getByText('Click my label'));
			await expect(checkbox).toBeChecked();
		});
	},
};

/**
 * @summary a disabled checkbox ignores clicks and stays unchecked with a disabled state
 */
export const InteractionsDisabled: Story = {
	render: () => {
		return <Checkbox label='Disabled checkbox' value={false} disabled />;
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole('checkbox');

		await step('Click disabled checkbox has no effect', async () => {
			await userEvent.click(canvas.getByText('Disabled checkbox'));
			await expect(checkbox).not.toBeChecked();
			await expect(checkbox).toBeDisabled();
		});
	},
};
