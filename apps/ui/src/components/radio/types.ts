import type { ReactNode, RefAttributes, SyntheticEvent } from 'react';
import type { Properties as TextProperties } from '../text/types';

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

type CustomProperties = RefAttributes<HTMLElement> & {
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
	 * Supports ReactNode or TextProperties.
	 *
	 * @example
	 * label="label test"
	 * label={<strong>Bold label</strong>}
	 * label={{ content: "label test", color: "red" }}
	 */
	label?: ReactNode | TextProperties;

	/**
	 * Defines the position of the label relative to the radio button.
	 *
	 * @default "right"
	 * @example
	 * labelPosition="left"
	 */
	labelPosition?: 'top' | 'right' | 'bottom' | 'left';

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
