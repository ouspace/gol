import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';

import Radio from '../root';

const meta: Meta<typeof Radio> = {
	title: 'Components/Radio',
	component: Radio,
	tags: ['autodocs'],
	parameters: {
		a11y: {
			disable: false,
		},
		docs: {
			description: {
				component:
					'Radio buttons allow users to select a single option from a set. Supports custom sizes, colors, icons, and label positioning.',
			},
		},
	},
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
		checked: { control: 'boolean' },
		disabled: { control: 'boolean' },
		required: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof Radio>;

/**
 * @summary the default checked radio — the simplest single-choice control
 */
export const Default: Story = {
	args: {
		label: 'Default radio button',
		checked: true,
	},
};

/**
 * @summary the key states (unchecked, checked, disabled, disabled+checked, required) shown together
 */
export const States: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
			<Radio label='Unchecked' />
			<Radio label='Checked' checked />
			<Radio label='Disabled' disabled />
			<Radio label='Disabled Checked' disabled checked />
			<Radio label='Required' required />
			<Radio label='Required Checked' required checked />
		</div>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const radios = canvas.getAllByRole('radio');

		await step('Unchecked radio is not checked', async () => {
			await expect(radios[0]).not.toBeChecked();
		});

		await step('Checked radio is checked', async () => {
			await expect(radios[1]).toBeChecked();
		});

		await step('Disabled radios are disabled', async () => {
			await expect(radios[2]).toBeDisabled();
			await expect(radios[3]).toBeDisabled();
			await expect(radios[3]).toBeChecked();
		});

		await step('Required radios are marked required', async () => {
			await expect(radios[4]).toBeRequired();
			await expect(radios[5]).toBeRequired();
			await expect(radios[5]).toBeChecked();
		});
	},
};

/**
 * @summary the three preset sizes plus numeric (px) and string (rem) custom sizes
 */
export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
			<Radio label='Small' size='small' checked />
			<Radio label='Normal' size='normal' checked />
			<Radio label='Big' size='big' checked />
			<Radio label='Custom (26px)' size={26} checked />
			<Radio label='Custom (2rem)' size='2rem' checked />
		</div>
	),
};

/**
 * @summary the full preset color palette with checked and unchecked examples for each
 */
export const Colors: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			{(['blue', 'red', 'green', 'purple', 'orange', 'yellow', 'teal', 'violet', 'pink', 'brown', 'grey', 'black'] as const).map(
				(color) => (
					<div key={color} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
						<span style={{ width: '64px', fontSize: '12px', textTransform: 'capitalize', color: '#666' }}>{color}</span>
						<Radio color={color} label={{ content: `Unchecked`, position: 'right' }} />
						<Radio color={color} label={`Checked`} checked />
					</div>
				)
			)}
		</div>
	),
};

/**
 * @summary label positioning (right/left/top/bottom), colored labels, and JSX content for rich labels
 */
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
			<Radio label={<>With <em>JSX</em> content</>} checked />
		</div>
	),
};

/**
 * @summary replacing the default radio dot with custom unchecked/checked icons (e.g. favorite, star)
 */
export const Icons: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
				<Radio
					label={{ content: 'Default unchecked', color: 'purple' }}
					icon={{ name: 'radio_button_unchecked', size: 24, color: 'purple' }}
					checkedIcon={{ name: 'radio_button_checked', size: 24, color: 'purple' }}
					color='purple'
				/>
				<Radio
					label={{ content: 'Default checked', color: 'purple' }}
					icon={{ name: 'radio_button_unchecked', size: 24, color: 'purple' }}
					checkedIcon={{ name: 'radio_button_checked', size: 24, color: 'purple' }}
					color='purple'
					checked
				/>
			</div>
			<div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
				<Radio
					label={{ content: 'Custom unchecked (favorite)', color: 'red' }}
					icon={{ name: 'favorite', size: 18, color: 'red' }}
					checkedIcon={{ name: 'favorite', size: 18, fill: true, color: 'red' }}
					color='red'
				/>
				<Radio
					label={{ content: 'Custom checked (favorite)', color: 'red' }}
					icon={{ name: 'favorite', size: 18, color: 'red' }}
					checkedIcon={{ name: 'favorite', size: 18, fill: true, color: 'red' }}
					color='red'
					checked
				/>
			</div>
		</div>
	),
};

/**
 * @summary interactive single-selection — grouping radios by `name` lets only one stay checked at a time
 */
export const Interactions: Story = {
	render: () => {
		const [value, setValue] = useState('option1');
		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
				<Radio
					name='group'
					value='option1'
					label='Option 1'
					checked={value === 'option1'}
					onChange={() => {
						setValue('option1');
					}}
				/>
				<Radio
					name='group'
					value='option2'
					label='Option 2'
					checked={value === 'option2'}
					onChange={() => {
						setValue('option2');
					}}
				/>
				<Radio name='group' value='option3' label='Option 3 (disabled)' disabled />
			</div>
		);
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const radios = canvas.getAllByRole('radio');

		await step('Option 1 is initially checked', async () => {
			await expect(radios[0]).toBeChecked();
		});

		await step('Clicking Option 2 selects it and deselects Option 1', async () => {
			await userEvent.click(canvas.getByText('Option 2'));
			await expect(radios[1]).toBeChecked();
			await expect(radios[0]).not.toBeChecked();
		});

		await step('Option 3 is disabled and cannot be selected', async () => {
			await expect(radios[2]).toBeDisabled();
		});

		await step('Clicking back on Option 1 re-selects it', async () => {
			await userEvent.click(canvas.getByText('Option 1'));
			await expect(radios[0]).toBeChecked();
			await expect(radios[1]).not.toBeChecked();
		});
	},
};

/**
 * @summary keyboard navigation — Tab focuses the group and ArrowDown moves selection between options
 */
export const InteractionsKeyboard: Story = {
	render: () => {
		const [value, setValue] = useState('option1');
		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
				<Radio
					name='keyboard-group'
					value='option1'
					label='Option 1'
					checked={value === 'option1'}
					onChange={() => {
						setValue('option1');
					}}
				/>
				<Radio
					name='keyboard-group'
					value='option2'
					label='Option 2'
					checked={value === 'option2'}
					onChange={() => {
						setValue('option2');
					}}
				/>
				<Radio
					name='keyboard-group'
					value='option3'
					label='Option 3'
					checked={value === 'option3'}
					onChange={() => {
						setValue('option3');
					}}
				/>
			</div>
		);
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const radios = canvas.getAllByRole('radio');
		const opt1 = radios[0];

		await step('Tab focuses the first radio in the group', async () => {
			await userEvent.tab();
			await expect(opt1).toHaveFocus();
		});

		await step('ArrowDown moves focus and checks Option 2', async () => {
			await userEvent.keyboard('{ArrowDown}');
			await expect(radios[1]).toBeChecked();
		});

		await step('ArrowDown again moves to Option 3', async () => {
			await userEvent.keyboard('{ArrowDown}');
			await expect(radios[2]).toBeChecked();
		});
	},
};
