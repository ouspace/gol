import type { ReactNode, RefAttributes, SyntheticEvent } from 'react';

type Size<TValue extends string> = TValue | number;
type Color<TValue extends string> = TValue | `rgb(${string})` | `rgba(${string})` | `hsl(${string})` | `hsla(${string})` | `#${string}`;
type NameColor = 'orange' | 'yellow' | 'olive' | 'teal' | 'violet' | 'purple' | 'pink' | 'brown' | 'grey' | 'red' | 'green' | 'blue' | 'black';

/**
 * Label properties 
 */
export type TextProperties = {
	/**
	 * Label text content
	 *
	 * @example
	 * value: "label test"
	 */
	value?: string;

	/**
	 * Position of the label relative to the checkbox
	 *
	 * @default "right"
	 * @example
	 * position: "left"
	 */
	position?: 'top' | 'right' | 'bottom' | 'left';

	/**
	 * Color of the label text
	 *
	 * @example
	 * color: "red"
	 * color: "#ff0000"
	 */
	color?: Color<NameColor>;

	/**
	 * Additional CSS class names for the label
	 *
	 * @example
	 * className: "custom-label"
	 */
	className?: string;
};

export type Properties = RefAttributes<HTMLElement> & {
	/**
	 * Unique identifier for the checkbox input element
	 *
	 * @example
	 * id="test-checkbox"
	 */
	id?: string;

	/**
	 * Name attribute for the checkbox input
	 *
	 * @example
	 * name="test-checkbox"
	 */
	name?: string;

	/**
	 * Label for the checkbox
	 *
	 * @example
	 * // String
	 * label="label test"
	 *
	 * //TextProperties
	 * label={{ value: "label test", position: "left", color: "red" }}
	 *
	 * //ReactNode
	 * label={<span>content</span>}
	 */
	label?: string | TextProperties | ReactNode;

	/**
	 * Current state of the checkbox
	 * - true: checked
	 * - false: unchecked
	 * - null: indeterminate
	 *
	 * @default false
	 * @example
	 * value={true}
	 */
	value?: boolean | null;

	/**
	 * Disables the checkbox interaction
	 *
	 * @default false
	 * @example
	 * disabled={true}
	 */
	disabled?: boolean;

	/**
	 * Icon displayed when checkbox is unchecked
	 *
	 * @example
	 * icon={<Icon name="favorite"/>}
	 */
	icon?: ReactNode;

	/**
	 * Icon displayed when checkbox is checked
	 *
	 * @example
	 * checkedIcon={<Icon name="favorite" fill />}
	 */
	checkedIcon?: ReactNode;

	/**
	 * Size of the checkbox
	 *
	 * @default "normal"
	 * @example
	 * size="small"
	 * size="big"
	 * size={20}
	 */
	size?: Size<'normal' | 'small' | 'big'>;

	/**
	 * Defines the checkbox color, and supports `rgb` | `rgba` | `hsl` | `hsla` | `hex` | `named colors`
	 *
	 * @default "blue"
	 * @example
	 * color="red"
	 * color="#f00"
	 * color="rgb(255, 0, 0)"
	 */
	color?: Color<NameColor>;

	/**
	 * Applies circular styling to the checkbox
	 *
	 * @default false
	 * @example
	 * circular={true}
	 */
	circular?: boolean;

	/**
	 * Additional CSS class names to apply
	 *
	 * @example
	 * className="custom-checkbox"
	 */
	className?: string;

	/**
	 * Callback fired when the checkbox state changes
	 *
	 * @param event - The change event
	 * @param properties - Updated properties including the new value
	 *
	 * @example
	 * onChange={(event, props) => console.log(props.value)}
	 */
	onChange?: (event: SyntheticEvent, properties: Properties) => void;
}
