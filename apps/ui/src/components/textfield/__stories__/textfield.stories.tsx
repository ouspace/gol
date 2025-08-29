/* eslint-disable n/no-extraneous-import */
// cspell:ignore autodocs typescale
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { useCallback, useState } from 'react';

// ⬇️ Ajusta este import según tu carpeta real: '../text-field' o '../textfield'
import TextFieldComponent from '../text-field';

import styles from './storybook.module.css';
import {
	EMAIL_REGEX,
	MAX_BIO_LENGTH,
	createIcon,
	omitKey,
	useControlledString,
	validateForm,
	type FormData,
	type InputTypesState,
	type InteractiveState,
	type ValidationErrors,
} from './helpers';

// =======================
// Meta de Storybook
// =======================
const meta: Meta<typeof TextFieldComponent> = {
	title: 'Components/TextField',
	component: TextFieldComponent,
	parameters: {
		docs: {
			description: {
				component:
          'TextField basado en Material Design 3; soporta variantes `filled` y `outlined` y distintos tipos de input.',
			},
		},
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['filled', 'outlined'],
		},
		type: {
			control: { type: 'select' },
			options: ['text', 'password', 'email', 'tel', 'url', 'search', 'number'],
		},
		value: { control: { type: 'text' } },
		label: { control: { type: 'text' } },
		placeholder: { control: { type: 'text' } },
		supportingText: { control: { type: 'text' } },
		errorText: { control: { type: 'text' } },
		prefix: { control: { type: 'text' } },
		suffix: { control: { type: 'text' } },
		maxLength: { control: { type: 'number' } },
		required: { control: { type: 'boolean' } },
		disabled: { control: { type: 'boolean' } },
		readOnly: { control: { type: 'boolean' } },
		error: { control: { type: 'boolean' } },
		showCounter: { control: { type: 'boolean' } },
		autoFocus: { control: { type: 'boolean' } },
	},
};

export default meta;

type Story = StoryObj<typeof TextFieldComponent>;
type TextFieldProperties = ComponentProps<typeof TextFieldComponent>;

// =======================
// Wrapper controlado
// =======================
/**
 * Enlaza el `value` a un estado local para que las stories sean interactivas,
 * pero permite que Storybook siga controlando el resto de props vía `args`.
 */
const TextFieldWithState = (properties: Partial<TextFieldProperties>) => {
	const initial = (properties.value ?? '') as string;
	const { value, onChange, setValue } = useControlledString(initial);

	// Si cambian los args desde controles, sincronizamos el estado local.
	// (solo si el valor proviene de controles y difiere del local)
	const syncFromArguments = String(properties.value ?? '');
	if (syncFromArguments !== value) setTimeout(() => setValue(syncFromArguments), 0);

	const handleChange = useCallback(
		(v: string) => {
			onChange(v);
			properties.onChange?.(v as never);
		},
		[onChange, properties],
	);

	return <TextFieldComponent {...(properties as TextFieldProperties)} value={value} onChange={handleChange} />;
};

// =======================
// Stories básicas
// =======================
export const Filled: Story = {
	render: (arguments_) => <TextFieldWithState {...arguments_} />,
	args: {
		variant: 'filled',
		label: 'Username',
		placeholder: 'Enter your username',
	},
};

export const Outlined: Story = {
	render: (arguments_) => <TextFieldWithState {...arguments_} />,
	args: {
		variant: 'outlined',
		label: 'Email Address',
		placeholder: 'Enter your email',
		type: 'email',
	},
};

export const WithSupportingText: Story = {
	render: (arguments_) => <TextFieldWithState {...arguments_} />,
	args: {
		variant: 'filled',
		label: 'Full Name',
		supportingText: 'Enter your first and last name',
		placeholder: 'John Doe',
	},
};

export const ErrorState: Story = {
	render: (arguments_) => <TextFieldWithState {...arguments_} />,
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
	render: (arguments_) => <TextFieldWithState {...arguments_} />,
	args: {
		variant: 'filled',
		label: 'Required Field',
		required: true,
		placeholder: 'This field is required',
	},
};

export const Disabled: Story = {
	render: (arguments_) => <TextFieldWithState {...arguments_} />,
	args: {
		variant: 'outlined',
		label: 'Disabled Field',
		disabled: true,
		value: 'This field is disabled',
	},
};

export const ReadOnly: Story = {
	render: (arguments_) => <TextFieldWithState {...arguments_} />,
	args: {
		variant: 'filled',
		label: 'Read Only Field',
		readOnly: true,
		value: 'This field is read-only',
	},
};

export const WithCounter: Story = {
	render: (arguments_) => <TextFieldWithState {...arguments_} />,
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
	render: (arguments_) => <TextFieldWithState {...arguments_} />,
	args: {
		variant: 'filled',
		label: 'Price',
		prefix: '$',
		suffix: 'USD',
		type: 'number',
		placeholder: '0.00',
	},
};

export const WithLeadingIcon: Story = {
	render: (arguments_) => <TextFieldWithState {...arguments_} />,
	args: {
		variant: 'outlined',
		label: 'Search',
		leadingIcon: createIcon('🔍', styles.icon),
		placeholder: 'Search...',
		type: 'search',
	},
};

export const WithTrailingIcon: Story = {
	render: (arguments_) => <TextFieldWithState {...arguments_} />,
	args: {
		variant: 'filled',
		label: 'Password',
		type: 'password',
		trailingIcon: createIcon('👁️', styles.icon),
		trailingIconLabel: 'Toggle password visibility',
		placeholder: 'Enter password',
	},
};

export const PhoneNumber: Story = {
	render: (arguments_) => <TextFieldWithState {...arguments_} />,
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
	render: (arguments_) => <TextFieldWithState {...arguments_} />,
	args: {
		variant: 'filled',
		label: 'Website',
		type: 'url',
		prefix: 'https://',
		placeholder: 'example.com',
	},
};

// =======================
// Demos compuestas
// =======================
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
			useCallback((v: string) => { setValues((previous) => ({ ...previous, [key]: v })); }, [key]);

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
					setForm((previous) => ({ ...previous, [field]: v }));
					if (errors[field]) setErrors((previous) => omitKey(previous, field));
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
					leadingIcon={createIcon('📧', styles.icon)}
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
			useCallback((v: string) => { setValues((previous) => ({ ...previous, [key]: v })); }, [key]);

		const supporting = focused === 'focused' ? 'Field is focused!' : 'Click to focus this field';

		return (
			<div className={styles.container}>
				<TextFieldComponent variant="filled" label="Normal State" value={values.normal} onChange={onValue('normal')} />

				<TextFieldComponent
					variant="outlined"
					label="Focus State"
					value={values.focused}
					onChange={onValue('focused')}
					onFocus={() => { setFocused('focused'); }}
					onBlur={() => { setFocused(''); }}
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
