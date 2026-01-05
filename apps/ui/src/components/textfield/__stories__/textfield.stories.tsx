import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import TextFieldComponent from '../text-field';
import Icon from '../../icon/root';

import styles from './storybook.module.css';
import {
	type InputTypesState,
} from './helpers';

const meta: Meta<typeof TextFieldComponent> = {
	title: 'Components/TextField',
	component: TextFieldComponent,
	parameters: {
		docs: {
			description: {
				component: 'Material Design 3 text field supporting `filled` and `outlined` variants.',
			},
		},
	},
	argTypes: {
		variant: { control: 'select', options: ['filled', 'outlined'] },
		type: { control: 'select', options: ['text', 'password', 'email', 'tel', 'url', 'search', 'number'] },
		value: { control: 'text' },
		label: { control: 'text' },
		placeholder: { control: 'text' },
		supportingText: { control: 'text' },
		errorText: { control: 'text' },
		prefix: { control: 'text' },
		suffix: { control: 'text' },
		max: { control: 'number' },
		required: { control: 'boolean' },
		disabled: { control: 'boolean' },
		readOnly: { control: 'boolean' },
		error: { control: 'boolean' },
		showCounter: { control: 'boolean' },
		autoFocus: { control: 'boolean' },
	},
};

export default meta;

type Story = StoryObj<typeof TextFieldComponent>;

export const Filled: Story = {
	args: { variant: 'filled', label: 'Username', placeholder: 'Enter your username' },
};

export const Outlined: Story = {
	args: { variant: 'outlined', label: 'Email Address', placeholder: 'Enter your email', type: 'email' },
};

export const WithSupportingText: Story = {
	args: { variant: 'filled', label: 'Full Name', supportingText: 'Enter your first and last name', placeholder: 'John Doe' },
};

export const ErrorState: Story = {
	args: {
		variant: 'outlined',
		label: 'Password',
		type: 'password',
		error: true,
		errorText: 'Password must be at least 8 characters long',
		defaultValue: '123',
	},
};

export const Required: Story = {
	args: { variant: 'filled', label: 'Required Field', required: true, placeholder: 'This field is required' },
};

export const Disabled: Story = {
	args: { variant: 'outlined', label: 'Disabled Field', disabled: true, defaultValue: 'This field is disabled' },
};

export const ReadOnly: Story = {
	args: { variant: 'filled', label: 'Read Only Field', readOnly: true, defaultValue: 'This field is read-only' },
};

export const WithCounter: Story = {
	args: {
		variant: 'outlined',
		label: 'Description',
		max: 100,
		showCounter: true,
		placeholder: 'Enter a brief description',
		supportingText: 'Maximum 100 characters',
	},
};

export const WithPrefixSuffix: Story = {
	args: { variant: 'filled', label: 'Price', prefix: '$', suffix: 'USD', type: 'number', placeholder: '0.00' },
};

export const WithLeadingIcon: Story = {
	render: (properties) => (
		<TextFieldComponent
			{...properties}
			leadingIcon={<Icon name="search" size="small" />}
		/>
	),
	args: {
		variant: 'outlined',
		label: 'Search',
		placeholder: 'Search...',
		type: 'search',
	},
};

export const WithTrailingIcon: Story = {
	render: (properties) => (
		<TextFieldComponent
			{...properties}
			trailingIcon={<Icon name="visibility" size="small" />}
			trailingIconLabel="Toggle password visibility"
			type="password"
		/>
	),
	args: {
		variant: 'filled',
		label: 'Password',
		placeholder: 'Enter password',
	},
};

export const PhoneNumber: Story = {
	args: {
		variant: 'outlined',
		label: 'Phone Number',
		type: 'tel',
		prefix: '+1',
		placeholder: '(555) 123-4567',
		pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
	},
};

export const WebsiteURL: Story = {
	args: {
		variant: 'filled',
		label: 'Website',
		type: 'url',
		prefix: 'https://',
		placeholder: 'example.com',
	},
};

export const InputTypes: Story = {
	render: () => {
		const [values, setValues] = useState<InputTypesState>({
			text: '',
			email: '',
			password: '',
			tel: '',
			url: '',
			search: '',
			number: '',
		});

		const handleValueChange = (key: keyof InputTypesState) =>
			(value: string) => setValues((previous) => ({ ...previous, [key]: value }));

		return (
			<div className={styles.container}>
				<TextFieldComponent variant="filled" label="Text" type="text" value={values.text} onChange={handleValueChange('text')} />
				<TextFieldComponent variant="outlined" label="Email" type="email" value={values.email} onChange={handleValueChange('email')} />
				<TextFieldComponent variant="filled" label="Password" type="password" value={values.password} onChange={handleValueChange('password')} />
				<TextFieldComponent variant="outlined" label="Phone" type="tel" value={values.tel} onChange={handleValueChange('tel')} />
				<TextFieldComponent variant="filled" label="URL" type="url" value={values.url} onChange={handleValueChange('url')} />
				<TextFieldComponent variant="outlined" label="Search" type="search" value={values.search} onChange={handleValueChange('search')} />
				<TextFieldComponent variant="filled" label="Number" type="number" value={values.number} onChange={handleValueChange('number')} />
			</div>
		);
	},
};



export const NormalState: Story = {
	args: { variant: 'filled', label: 'Normal State', defaultValue: 'Normal state' },
};

export const FocusedState: Story = {
	render: (properties) => {
		const [isFocused, setIsFocused] = useState(false);
		return (
			<TextFieldComponent
				{...properties}
				variant="outlined"
				label="Focus State"
				defaultValue="Click to focus"
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				supportingText={isFocused ? 'Field is focused!' : 'Click to focus this field'}
			/>
		);
	},
};

export const ErrorStateManual: Story = {
	args: {
		variant: 'filled',
		label: 'Error State',
		error: true,
		errorText: 'This field has an error',
		defaultValue: 'Error state',
	},
};

export const DisabledState: Story = {
	args: { variant: 'outlined', label: 'Disabled State', disabled: true, defaultValue: 'Disabled state' },
};