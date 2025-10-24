import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { useCallback, useState, useEffect } from 'react';

import TextFieldComponent from '../text-field';
import Icon from '../../icon/root'; // ✅ Ruta corregida

import styles from './storybook.module.css';
import {
	EMAIL_REGEX,
	MAX_BIO_LENGTH,
	omitKey,
	validateForm,
	type FormData,
	type InputTypesState,
	type InteractiveState,
	type ValidationErrors,
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
		maxLength: { control: 'number' },
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
type TextFieldProperties = ComponentProps<typeof TextFieldComponent>;

const TextFieldWithState = (props: Partial<TextFieldProperties>) => {
	const [localValue, setLocalValue] = useState((props.value ?? '') as string);

	useEffect(() => {
		if (props.value !== undefined && props.value !== localValue) {
			setLocalValue(props.value as string);
		}
	}, [props.value]);

	const handleChange = useCallback(
		(v: string) => {
			setLocalValue(v);
			props.onChange?.(v as never);
		},
		[props],
	);

	return <TextFieldComponent {...(props as TextFieldProperties)} value={localValue} onChange={handleChange} />;
};

export const Filled: Story = {
	render: (args) => <TextFieldWithState {...args} />,
	args: { variant: 'filled', label: 'Username', placeholder: 'Enter your username' },
};

export const Outlined: Story = {
	render: (args) => <TextFieldWithState {...args} />,
	args: { variant: 'outlined', label: 'Email Address', placeholder: 'Enter your email', type: 'email' },
};

export const WithSupportingText: Story = {
	render: (args) => <TextFieldWithState {...args} />,
	args: { variant: 'filled', label: 'Full Name', supportingText: 'Enter your first and last name', placeholder: 'John Doe' },
};

export const ErrorState: Story = {
	render: (args) => <TextFieldWithState {...args} />,
	args: {
		variant: 'outlined',
		label: 'Password',
		type: 'password',
		error: true,
		errorText: 'Password must be at least 8 characters long',
		value: '123',
	},
};

export const Required: Story = {
	render: (args) => <TextFieldWithState {...args} />,
	args: { variant: 'filled', label: 'Required Field', required: true, placeholder: 'This field is required' },
};

export const Disabled: Story = {
	render: (args) => <TextFieldWithState {...args} />,
	args: { variant: 'outlined', label: 'Disabled Field', disabled: true, value: 'This field is disabled' },
};

export const ReadOnly: Story = {
	render: (args) => <TextFieldWithState {...args} />,
	args: { variant: 'filled', label: 'Read Only Field', readOnly: true, value: 'This field is read-only' },
};

export const WithCounter: Story = {
	render: (args) => <TextFieldWithState {...args} />,
	args: {
		variant: 'outlined',
		label: 'Description',
		maxLength: 100,
		showCounter: true,
		placeholder: 'Enter a brief description',
		supportingText: 'Maximum 100 characters',
	},
};

export const WithPrefixSuffix: Story = {
	render: (args) => <TextFieldWithState {...args} />,
	args: { variant: 'filled', label: 'Price', prefix: '$', suffix: 'USD', type: 'number', placeholder: '0.00' },
};

export const WithLeadingIcon: Story = {
	render: (args) => (
		<TextFieldWithState
			{...args}
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
	render: (args) => (
		<TextFieldWithState
			{...args}
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
	render: (args) => <TextFieldWithState {...args} />,
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
	render: (args) => <TextFieldWithState {...args} />,
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

		const makeChange = (key: keyof InputTypesState) =>
			useCallback((v: string) => setValues((prev) => ({ ...prev, [key]: v })), [key]);

		return (
			<div className={styles.container}>
				<TextFieldComponent variant="filled" label="Text" type="text" value={values.text} onChange={makeChange('text')} />
				<TextFieldComponent variant="outlined" label="Email" type="email" value={values.email} onChange={makeChange('email')} />
				<TextFieldComponent variant="filled" label="Password" type="password" value={values.password} onChange={makeChange('password')} />
				<TextFieldComponent variant="outlined" label="Phone" type="tel" value={values.tel} onChange={makeChange('tel')} />
				<TextFieldComponent variant="filled" label="URL" type="url" value={values.url} onChange={makeChange('url')} />
				<TextFieldComponent variant="outlined" label="Search" type="search" value={values.search} onChange={makeChange('search')} />
				<TextFieldComponent variant="filled" label="Number" type="number" value={values.number} onChange={makeChange('number')} />
			</div>
		);
	},
};

export const FormExample: Story = {
	render: () => {
		const [form, setForm] = useState<FormData>({
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			bio: '',
		});
		const [errors, setErrors] = useState<ValidationErrors>({});

		const onField = (field: keyof FormData) =>
			useCallback(
				(v: string) => {
					setForm((prev) => ({ ...prev, [field]: v }));
					if (errors[field]) setErrors((prev) => omitKey(prev, field));
				},
				[field, errors],
			);

		const submit = useCallback(() => {
			const next = validateForm(form);
			setErrors(next);
			if (Object.keys(next).length === 0) {
				alert('Form is valid!');
			}
		}, [form]);

		return (
			<div className={styles.container}>
				<div className={styles.formRow}>
					<TextFieldComponent
						variant="outlined"
						label="First Name"
						required
						value={form.firstName}
						onChange={onField('firstName')}
						error={!!errors.firstName}
						errorText={errors.firstName}
					/>
					<TextFieldComponent
						variant="outlined"
						label="Last Name"
						required
						value={form.lastName}
						onChange={onField('lastName')}
						error={!!errors.lastName}
						errorText={errors.lastName}
					/>
				</div>

				<TextFieldComponent
					variant="filled"
					label="Email Address"
					type="email"
					required
					value={form.email}
					onChange={onField('email')}
					error={!!errors.email}
					errorText={errors.email}
					leadingIcon={<Icon name="mail" size="small" />}
				/>

				<TextFieldComponent
					variant="outlined"
					label="Phone Number"
					type="tel"
					value={form.phone}
					onChange={onField('phone')}
					prefix="+1"
				/>

				<TextFieldComponent
					variant="filled"
					label="Bio"
					value={form.bio}
					onChange={onField('bio')}
					maxLength={MAX_BIO_LENGTH}
					showCounter
					supportingText="Tell us about yourself"
				/>

				<button type="button" className={styles.submitButton} onClick={submit}>
					Submit Form
				</button>
			</div>
		);
	},
};

export const InteractiveStates: Story = {
	render: () => {
		const [focused, setFocused] = useState('');
		const [values, setValues] = useState<InteractiveState>({
			normal: 'Normal state',
			focused: 'Click to focus',
			error: 'Error state',
			disabled: 'Disabled state',
		});

		const onValue = (key: keyof InteractiveState) =>
			useCallback((v: string) => setValues((prev) => ({ ...prev, [key]: v })), [key]);

		const supporting = focused === 'focused' ? 'Field is focused!' : 'Click to focus this field';

		return (
			<div className={styles.container}>
				<TextFieldComponent variant="filled" label="Normal State" value={values.normal} onChange={onValue('normal')} />
				<TextFieldComponent
					variant="outlined"
					label="Focus State"
					value={values.focused}
					onChange={onValue('focused')}
					onFocus={() => setFocused('focused')}
					onBlur={() => setFocused('')}
					supportingText={supporting}
				/>
				<TextFieldComponent
					variant="filled"
					label="Error State"
					error
					errorText="This field has an error"
					value={values.error}
					onChange={onValue('error')}
				/>
				<TextFieldComponent variant="outlined" label="Disabled State" disabled value={values.disabled} onChange={onValue('disabled')} />
			</div>
		);
	},
};