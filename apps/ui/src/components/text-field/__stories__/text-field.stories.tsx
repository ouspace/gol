import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from '../index';

const meta: Meta<typeof TextField> = {
	title: 'Components/TextField',
	component: TextField,
	tags: ['autodocs'],
	args: {
		variant: 'filled',
		placeholder: 'Placeholder',
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['filled', 'outlined'],
		},
		size: {
			control: 'select',
			options: ['small', 'normal', 'large'],
		},
		type: {
			control: 'select',
			options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url', 'textarea'],
		},
		inputMode: {
			control: 'select',
			options: ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'],
		},
		textDirection: {
			control: 'select',
			options: ['ltr', 'rtl', 'auto'],
		},
		disabled: { control: 'boolean' },
		readOnly: { control: 'boolean' },
		required: { control: 'boolean' },
		error: { control: 'boolean' },
		asterisk: { control: 'boolean' },
		spinner: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const Variants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '480px' }}>
			<div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
				<TextField variant='filled' label='Filled' placeholder='Placeholder' />
				<TextField variant='outlined' label='Outlined' placeholder='Placeholder' />
			</div>
			<TextField fullWidth label='Full width filled' placeholder='Stretches to container' />
			<TextField fullWidth variant='outlined' label='Full width outlined' placeholder='Stretches to container' />
		</div>
	),
};

export const States: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
			<TextField label='Default' placeholder='Placeholder' />
			<TextField label='With value' defaultValue='Some text' />
			<TextField label='Required' required />
			<TextField label='Required (no asterisk)' required asterisk={false} />
			<TextField label='Disabled' disabled defaultValue='No editable' />
			<TextField label='Read only' readOnly defaultValue='Solo lectura' />
			<TextField label='Error' error defaultValue='invalid-value' />
		</div>
	),
};

export const Types: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
			<TextField label='Text' type='text' placeholder='Plain text' />
			<TextField label='Email' type='email' placeholder='user@example.com' />
			<TextField label='Password' type='password' placeholder='Password' />
			<TextField label='Number (spinner)' type='number' defaultValue='42' min='0' max='100' step='1' />
			<TextField label='Number (no spinner)' type='number' defaultValue='42' spinner={false} />
			<TextField label='Search' type='search' placeholder='Search...' />
			<TextField label='Tel' type='tel' placeholder='+1 555 000 0000' />
			<TextField label='URL' type='url' placeholder='https://example.com' />
			<TextField label='Textarea' type='textarea' placeholder='Write something...' rows={4} />
		</div>
	),
};

export const Icons: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
			<TextField icon={{ name: 'search', viewBox: '0 -960 960 960' }} label='Leading' placeholder='Search' />
			<TextField icon={{ name: 'close', viewBox: '0 -960 960 960', position: 'right' }} label='Trailing' placeholder='Clear' />
			<TextField
				icon={[
					{ name: 'search', viewBox: '0 -960 960 960' },
					{ name: 'close', position: 'right' },
				]}
				label='Both icons'
				placeholder='Search & clear'
			/>
			<TextField
				type='password'
				label='Password'
				placeholder='Password'
				icon={{
					name: 'visibility',
					viewBox: '0 -960 960 960',
					position: 'right',
					onClick: () => {
						console.log('toggle visibility');
					},
				}}
			/>
			<TextField prefixText='$' suffixText='.00' label='Price' defaultValue='10' />
			<TextField prefixText='https://' suffixText='.com' placeholder='domain' />
		</div>
	),
};

export const Error: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
			<TextField label='Helper text' supportingText='At least 8 characters' />
			<TextField variant='outlined' label='Helper outlined' supportingText='Letters and numbers only' />
			<TextField label='Error filled' error errorText='Password is too short' defaultValue='123' />
			<TextField
				variant='outlined'
				label='Error outlined'
				error
				errorText='Invalid email'
				defaultValue='not-an-email'
			/>
			<TextField
				label='Error replaces helper'
				supportingText='At least 8 characters'
				errorText='Password is too short'
				error
				defaultValue='123'
			/>
			<TextField
				label='Resolved error'
				supportingText='At least 8 characters'
				errorText='Password is too short'
				error={false}
				defaultValue='correct-password'
			/>
		</div>
	),
};

export const Size: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
			<div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
				<TextField size='small' label='Small' placeholder='Placeholder' />
				<TextField size='normal' label='Normal' placeholder='Placeholder' />
				<TextField size='large' label='Large' placeholder='Placeholder' />
			</div>
			<div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
				<TextField size='small' variant='outlined' label='Small' placeholder='Placeholder' />
				<TextField
					size='normal'
					variant='outlined'
					label='Normal'
					placeholder='Placeholder'
					icon={{ name: 'search', viewBox: '0 -960 960 960' }}
				/>
				<TextField size='large' variant='outlined' label='Large' placeholder='Placeholder' />
			</div>
			<div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
				<TextField
					size='small'
					color='teal'
					icon={{ name: 'search', viewBox: '0 -960 960 960' }}
					label='Small teal'
				/>
				<TextField
					size='normal'
					color='#2196f3'
					icon={{ name: 'search', viewBox: '0 -960 960 960' }}
					label='Normal blue'
				/>
				<TextField
					size='large'
					color='#e91e63'
					icon={{ name: 'search', viewBox: '0 -960 960 960' }}
					label='Large pink'
				/>
			</div>
		</div>
	),
};
