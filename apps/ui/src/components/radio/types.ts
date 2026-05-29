import type { ReactNode, RefAttributes, SyntheticEvent } from 'react';
import type { TextProperties as BaseTextProperties } from '../text';
import type { IconProperties } from '../icon';
import type { CssColor, Size } from '../../types/tokens';

export type TextProperties = BaseTextProperties & {
	/**
	 * Defines the position of the label relative to the radio button.
	 *
	 * @default "right"
	 * @example
	 * labelPosition="left"
	 */
	position?: 'top' | 'right' | 'bottom' | 'left';
};

export type BaseProperties = RefAttributes<HTMLElement> & {
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
	label?: ReactNode | TextProperties | (() => TextProperties | React.ReactNode);

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
	 * icon={{ name: "radio_button_unchecked" }}
	 */
	icon?: IconProperties;

	/**
	 * Defines the icon displayed when the radio button is checked.
	 *
	 * @example
	 * checkedIcon={{ name: "radio_button_checked" }}
	 */
	checkedIcon?: IconProperties;

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
	color?: CssColor;

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
export type NativeProperties = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'>;

export type Properties = BaseProperties & NativeProperties & RefAttributes<HTMLLabelElement>;
