import type { ReactNode, RefAttributes, SyntheticEvent } from 'react';

type Size<TValue extends string> = TValue | number;

type Color<TValue extends string> =
	| TValue
	| `rgb(${string})`
	| `rgba(${string})`
	| `hsl(${string})`
	| `hsla(${string})`
	| `#${string}`;

type NameColor =
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

/**
 * Label text properties
 */
export type TextProperties = {
	/**
	 * Defines the label text.
	 *
	 * @example
	 * value: "label test"
	 */
	value?: string;

	/**
	 * Defines the position of the label relative to the radio button.
	 *
	 * @default "right"
	 * @example
	 * position: "left"
	 */
	position?: 'top' | 'right' | 'bottom' | 'left';

	/**
	 * Defines the text color of the label.
	 *
	 * @example
	 * color: "red"
	 * color: "#ff0000"
	 */
	color?: Color<NameColor>;

	/**
	 * Defines the CSS class name for the label text.
	 *
	 * @example
	 * className: "custom-label"
	 */
	className?: string;
};

type CustomProperties = {
	/**
	 * Defines the custom content for the label.
	 * Overrides the `label` properties if provided.
	 *
	 * @example
	 * <Radio>
	 * 		<Custom label content/>
	 * </Radio>
	 */
	children?: ReactNode;

	/**
	 * Defines the id of the input element.
	 *
	 * @example
	 * id="id-test"
	 */
	id?: string;

	/**
	 * Defines the name attribute of the input element.
	 *
	 * @example
	 * name="name"
	 */
	name?: string;

	/**
	 * Defines the label for the radio button.
	 * Supports string, TextProperties, or ReactNode.
	 *
	 * @example
	 * label="label test"
	 * label={{ value: "label test", position: "left", color: "red" }}
	 * label={<strong>label test</strong>}
	 */
	label?: string | TextProperties | ReactNode;

	/**
	 * Defines the value of the radio button
	 *
	 * @example
	 * value="option1"
	 */
	value?: string;

	/**
	 * If `true`, the radio button is checked.
	 *
	 * @default false
	 * @example
	 * checked={true}
	 */
	checked?: boolean;

	/**
	 * If `true`, the radio button is disabled.
	 *
	 * @default false
	 * @example
	 * disabled={true}
	 */
	disabled?: boolean;

	/**
	 * If `true`, the radio button is required.
	 *
	 * @default false
	 * @example
	 * required={true}
	 */
	required?: boolean;

	/**
	 * Defines the icon displayed when the radio button is unchecked.
	 *
	 * @example
	 * icon={<Icon name="radio_button_unchecked"/>}
	 */
	icon?: ReactNode;

	/**
	 * Defines the icon displayed when the radio button is checked.
	 *
	 * @example
	 * checkedIcon={<Icon name="radio_button_checked"/>}
	 */
	checkedIcon?: ReactNode;

	/**
	 * Defines the size of the radio button.
	 *
	 * @default "normal"
	 * @example
	 * size="small"
	 * size="big"
	 * size={24}
	 */
	size?: Size<'normal' | 'small' | 'big'>;

	/**
	 * Defines the color of the radio button.
	 * Supports `rgb`, `rgba`, `hsl`, `hsla`, `hex`, and named colors.
	 *
	 * @default "blue"
	 * @example
	 * color="red"
	 * color="#f00"
	 * color="rgb(255, 0, 0)"
	 */
	color?: Color<NameColor>;

	/**
	 * Defines the CSS class for the radio button
	 *
	 * @example
	 * className="custom-radio"
	 */
	className?: string;

	/**
	 * Callback fired when the radio state changes
	 *
	 * @param event
	 * @param properties
	 *
	 * @example
	 * onChange={(event, props) => console.log(props.checked)}
	 */
	onChange?: (event: SyntheticEvent, properties: Properties) => void;
};

/**
 * Native HTML input attributes (aria-*, data-*, onFocus, onBlur, tabIndex, etc.)
 */
type NativeProperties = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'>;

export type Properties = CustomProperties & NativeProperties & RefAttributes<HTMLLabelElement>;
