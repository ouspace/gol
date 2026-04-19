import type { ChangeEvent, InputHTMLAttributes, ReactNode, RefAttributes } from 'react';
import type { Properties as IconProperties } from '../icon/types';
import type { Properties as TextProperties } from '../text/types';

type TextLike = ReactNode | TextProperties | (() => TextProperties | ReactNode);
type TextFieldInputMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
type TextFieldSize = 'small' | 'normal' | 'large';
type ColorName =
	| 'orange'
	| 'yellow'
	| 'olive'
	| 'teal'
	| 'violet'
	| 'purple'
	| 'pink'
	| 'brown'
	| 'grey'
	| 'red'
	| 'green'
	| 'blue'
	| 'black';

type TextFieldColor =
	| ColorName
	| `rgb(${string})`
	| `rgba(${string})`
	| `hsl(${string})`
	| `hsla(${string})`
	| `#${string}`;

type LengthConstrained = {
	/**
	 * Defines the maximum number of characters a user can enter.
	 *
	 * @example
	 * maxLength={100}
	 */
	maxLength?: number;

	/**
	 * Defines the minimum number of characters a user must enter.
	 *
	 * @example
	 * minLength={3}
	 */
	minLength?: number;
};

type BaseProperties = RefAttributes<HTMLInputElement | HTMLTextAreaElement> & {
	/**
	 * Defines the visual style of the text field.
	 *
	 * @default "filled"
	 * @example
	 * variant="outlined"
	 */
	variant?: 'filled' | 'outlined';

	/**
	 * Defines the height/density of the text field.
	 *
	 * @default "normal"
	 * @example
	 * size="small"
	 * size="large"
	 */
	size?: TextFieldSize;

	/**
	 * Defines the accent color used on focus (indicator, border, floating label).
	 * Supports named colors, `rgb`, `rgba`, `hsl`, `hsla`, and `hex`.
	 *
	 * @example
	 * color="teal"
	 * color="#ff0000"
	 * color="rgb(255, 0, 0)"
	 */
	color?: TextFieldColor;

	/**
	 * If `true`, the text field stretches to fill its container width.
	 *
	 * @default false
	 * @example
	 * fullWidth
	 * fullWidth={true}
	 */
	fullWidth?: boolean;

	/**
	 * Defines the floating label of the text field.
	 * Supports ReactNode, TextProperties, or a function returning either.
	 *
	 * @example
	 * label="Email"
	 * label={<strong>Email</strong>}
	 * label={{ content: "Email", scale: "label-medium" }}
	 */
	label?: TextLike;

	/**
	 * If `true`, shows an asterisk next to the label when the field is required.
	 *
	 * @default true
	 * @example
	 * asterisk={false}
	 */
	asterisk?: boolean;

	/**
	 * If `true`, the text field is rendered in an error state.
	 * When combined with `errorText`, the supporting text is replaced by the error message.
	 *
	 * @default false
	 * @example
	 * error={true}
	 */
	error?: boolean;

	/**
	 * Defines the message shown in place of `supportingText` when `error` is `true`.
	 *
	 * @example
	 * errorText="Invalid email address"
	 * errorText={{ content: "Invalid email", scale: "body-small" }}
	 */
	errorText?: TextLike;

	/**
	 * Defines the text displayed below the text field to provide additional context.
	 * Replaced by `errorText` when `error` is `true`.
	 *
	 * @example
	 * supportingText="At least 8 characters"
	 * supportingText={{ content: "Max 200 chars", scale: "body-small" }}
	 */
	supportingText?: TextLike;

	/**
	 * Hints at the kind of virtual keyboard to display on mobile devices.
	 *
	 * @example
	 * inputMode="numeric"
	 * inputMode="email"
	 */
	inputMode?: TextFieldInputMode;

	/**
	 * Defines a prefix rendered before the input value (e.g. currency symbol).
	 *
	 * @example
	 * prefixText="$"
	 */
	prefixText?: string;

	/**
	 * Defines a suffix rendered after the input value (e.g. unit).
	 *
	 * @example
	 * suffixText="kg"
	 */
	suffixText?: string;

	/**
	 * Defines the controlled value of the text field.
	 *
	 * @example
	 * value="hello"
	 */
	value?: string | number;

	/**
	 * Defines the initial value for an uncontrolled text field.
	 *
	 * @example
	 * defaultValue="hello"
	 */
	defaultValue?: string | number;

	/**
	 * If `true`, marks the text field as required for form submission.
	 *
	 * @default false
	 * @example
	 * required={true}
	 */
	required?: boolean;

	/**
	 * If `true`, the text field is read-only and cannot be edited by the user.
	 *
	 * @default false
	 * @example
	 * readOnly={true}
	 */
	readOnly?: boolean;

	/**
	 * Defines the placeholder text shown when the field has no value.
	 *
	 * @example
	 * placeholder="name@example.com"
	 */
	placeholder?: string;

	/**
	 * Defines the browser autocomplete hint for the input.
	 *
	 * @example
	 * autoComplete="email"
	 * autoComplete="new-password"
	 */
	autoComplete?: string;

	/**
	 * Defines the name attribute of the input element, used when submitting a form.
	 *
	 * @example
	 * name="email"
	 */
	name?: string;

	/**
	 * If `true`, the text field is disabled and does not emit events.
	 *
	 * @default false
	 * @example
	 * disabled={true}
	 */
	disabled?: boolean;

	/**
	 * Overrides the input text CSS `direction`.
	 * Useful for RTL languages that use LTR notation for fractions.
	 *
	 * @example
	 * textDirection="rtl"
	 */
	textDirection?: 'rtl' | 'ltr' | 'auto';

	/**
	 * Defines an icon rendered at the start of the text field.
	 * Supports IconProperties or any ReactNode.
	 *
	 * @example
	 * leadingIcon={{ name: "search" }}
	 * leadingIcon={<Icon name="search"/>}
	 */
	leadingIcon?: IconProperties | ReactNode;

	/**
	 * Defines an icon rendered at the end of the text field.
	 * Supports IconProperties or any ReactNode.
	 *
	 * @example
	 * trailingIcon={{ name: "close" }}
	 * trailingIcon={<Icon name="visibility"/>}
	 */
	trailingIcon?: IconProperties | ReactNode;

	/**
	 * Callback fired when the input value changes.
	 * Not fired when the text field is disabled.
	 *
	 * @param event - The native change event
	 * @param properties - The component properties
	 *
	 * @example
	 * onChange={(event, props) => console.log(event.target.value)}
	 */
	onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, properties: Properties) => void;

	/**
	 * Defines the CSS class name applied to the root element.
	 *
	 * @example
	 * className="custom-text-field"
	 */
	className?: string;
};

type TextTypeProperties = LengthConstrained & {
	/**
	 * Defines the `<input>` type.
	 *
	 * @default "text"
	 * @example
	 * type="password"
	 * type="search"
	 */
	type?: 'text' | 'password' | 'search' | 'tel' | 'url';

	/**
	 * Defines a regular expression the value must match to pass constraint validation.
	 *
	 * @example
	 * pattern="[A-Za-z0-9]+"
	 */
	pattern?: string;
};

type EmailTypeProperties = LengthConstrained & {
	/**
	 * Defines the `<input>` type as `email`.
	 *
	 * @example
	 * type="email"
	 */
	type: 'email';

	/**
	 * Defines a regular expression the value must match to pass constraint validation.
	 *
	 * @example
	 * pattern="[^@]+@[^@]+\.[^@]+"
	 */
	pattern?: string;

	/**
	 * If `true`, allows the user to enter multiple comma-separated email addresses.
	 *
	 * @default false
	 * @example
	 * multiple={true}
	 */
	multiple?: boolean;
};

type NumberTypeProperties = {
	/**
	 * Defines the `<input>` type as `number`.
	 *
	 * @example
	 * type="number"
	 */
	type: 'number';

	/**
	 * Defines the greatest value in the range of permitted values.
	 *
	 * @example
	 * max="100"
	 */
	max?: string;

	/**
	 * Defines the most negative value in the range of permitted values.
	 *
	 * @example
	 * min="0"
	 */
	min?: string;

	/**
	 * Defines the increment between permitted values.
	 *
	 * @example
	 * step="1"
	 * step="0.1"
	 */
	step?: string;

	/**
	 * If `false`, hides the native spinner controls for `type="number"`.
	 *
	 * @default true
	 * @example
	 * spinner={false}
	 */
	spinner?: boolean;
};

type TextareaTypeProperties = LengthConstrained & {
	/**
	 * Defines the element type as `textarea` (multi-line input).
	 *
	 * @example
	 * type="textarea"
	 */
	type: 'textarea';

	/**
	 * Defines the initial number of visible rows for the textarea.
	 *
	 * @default 2
	 * @example
	 * rows={4}
	 */
	rows?: number;

	/**
	 * Defines the visible width (in average character widths) of the textarea.
	 *
	 * @example
	 * cols={40}
	 */
	cols?: number;
};

type TextFieldTypeProperties = TextTypeProperties | EmailTypeProperties | NumberTypeProperties | TextareaTypeProperties;

/**
 * Native HTML input attributes (aria-*, data-*, onFocus, onBlur, tabIndex, etc.)
 * excluding those already handled by the component's own API.
 */
export type NativeProperties = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	| 'type'
	| 'onChange'
	| 'value'
	| 'defaultValue'
	| 'prefix'
	| 'size'
	| 'maxLength'
	| 'minLength'
	| 'max'
	| 'min'
	| 'step'
	| 'pattern'
	| 'multiple'
	| 'required'
	| 'readOnly'
	| 'placeholder'
	| 'autoComplete'
	| 'disabled'
	| 'name'
	| 'inputMode'
>;

/**
 * TextField component properties
 */
export type Properties = NativeProperties & BaseProperties & TextFieldTypeProperties;
