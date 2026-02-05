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

export type Properties = RefAttributes<HTMLElement> & {
	/**
	 * Defines the custom content for the label.
	 * Overrides the `label` prop if provided.
	 *
	 * @example
	 * <Checkbox>Label children</Checkbox>
	 */
	children?: ReactNode;

	/**
	 * Defines the id of the input element.
	 *
	 * @example
	 * id="test-checkbox"
	 */
	id?: string;

	/**
	 * Defines the name attribute of the input element.
	 *
	 * @example
	 * name="test-checkbox"
	 */
	name?: string;

	/**
	 * Defines the label for the checkbox.
	 * Supports ReactNode or TextProperties.
	 *
	 * @example
	 * label="label test"
	 * label={<strong>Bold label</strong>}
	 * label={{ content: "label test", color: "red" }}
	 */
	label?: ReactNode | TextProperties;

	/**
	 * Defines the position of the label relative to the checkbox.
	 *
	 * @default "right"
	 * @example
	 * labelPosition="left"
	 * labelPosition="top"
	 */
	labelPosition?: 'top' | 'right' | 'bottom' | 'left';

	/**
	 * Defines the current state of the checkbox.
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
	 * If `true`, the checkbox is disabled.
	 *
	 * @default false
	 * @example
	 * disabled={true}
	 */
	disabled?: boolean;

	/**
	 * Defines the icon displayed when checkbox is unchecked.
	 *
	 * @example
	 * icon={<Icon name="favorite"/>}
	 */
	icon?: ReactNode;

	/**
	 * Defines the icon displayed when checkbox is checked.
	 *
	 * @example
	 * checkedIcon={<Icon name="favorite" fill />}
	 */
	checkedIcon?: ReactNode;

	/**
	 * Defines the checkbox size.
	 *
	 * @default "normal"
	 * @example
	 * size="small"
	 * size="big"
	 * size={20}
	 */
	size?: Size<'normal' | 'small' | 'big'>;

	/**
	 * Defines the checkbox color.
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
	 * If `true`, renders the checkbox with a circular border.
	 *
	 * @default false
	 * @example
	 * circular={true}
	 */
	circular?: boolean;

	/**
	 * Defines the CSS class name for the checkbox.
	 *
	 * @example
	 * className="custom-checkbox"
	 */
	className?: string;

	/**
	 * Callback fired when the checkbox state changes.
	 *
	 * @param event - The change event
	 * @param properties - Updated properties including the new value
	 *
	 * @example
	 * onChange={(event, props) => console.log(props.value)}
	 */
	onChange?: (event: SyntheticEvent, properties: Properties) => void;
};
