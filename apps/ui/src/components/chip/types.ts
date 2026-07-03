import type { CSSProperties, ReactNode, RefAttributes, SyntheticEvent } from 'react';
import type { TextProperties } from '../text';
import type { Color, Size } from '../../types/tokens';

export type Properties = RefAttributes<HTMLElement> & {
	/**
	 * Inline style applied to the chip's root element.
	 *
	 * The chip injects the following public CSS variables for theming
	 * (overridable from the consumer):
	 * `--chip-color`, `--chip-size`, `--chip-border-radius`.
	 */
	style?: CSSProperties;
	/**
	 * Defines the chip role/type.
	 *
	 * @default "assist"
	 *
	 * Role-specific available properties:
	 * - assist: onClick, icon, href, target
	 * - filter: onClick, onToggle, selected, icon, href, target
	 * - input: onClick, onRemove, selected, icon, avatar, href, target
	 * - suggestion: onClick, href, target
	 *
	 * @example
	 * Assist chips - for actions and help
	 * <Chip role="assist" onClick={handler}>Content</Chip>
	 *
	 * Filter chips - for selectable filters
	 * <Chip role="filter" selected={true} onToggle={handler}>Content</Chip>
	 *
	 * Input chips - for removable tags
	 * <Chip role="input" onRemove={handler} avatar={<UserIcon/>}>Content</Chip>
	 *
	 * Suggestion chips - for clickable suggestions
	 * <Chip role="suggestion" onClick={handler}>Content</Chip>
	 *
	 * @remarks
	 * All roles support: children, color, variant, radius, disabled.
	 * All chips respond to Space and Enter when not disabled.
	 */
	role?: 'assist' | 'filter' | 'input' | 'suggestion';

	/**
	 * Main content of the chip
	 *
	 * @example
	 * children="Primary Chip"
	 * children={<strong>Custom Content</strong>}
	 */
	children?: ReactNode;

	/**
	 * Defines the label for the chip.
	 * Supports ReactNode or TextProperties.
	 *
	 * Priority: children > label
	 *
	 * @example
	 * label="Simple text"
	 * label={<strong>Bold</strong>}
	 * label={{ content: "Label text", color: "red", weight: "bold" }}
	 */
	label?: ReactNode | TextProperties | (() => TextProperties | React.ReactNode);

	/**
	 * Defines the chip color, and supports `rgb` | `rgba` | `hsl` | `hsla` | `hex` | `named colors`
	 *
	 * @default "default"
	 * @example
	 * color="primary"
	 * color="success"
	 * color="error"
	 */
	color?: Color<'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning'>;

	/**
	 * Defines the chip size
	 *
	 * @default "normal"
	 * @example
	 * size="small"
	 * size="normal"
	 * size="big"
	 * size={28}
	 */
	size?: Size<'small' | 'normal' | 'big'>;

	/**
	 * Defines the visual style of the chip
	 *
	 * @default "filled"
	 * @example
	 * variant="filled"
	 * variant="outlined"
	 */
	variant?: 'filled' | 'outlined';

	/**
	 * Defines the border radius of the chip
	 *
	 * @default "rounded"
	 * @example
	 * radius="square"
	 * radius="rounded"
	 * radius={8}
	 * radius="50%"
	 * radius="2rem"
	 */
	radius?: 'square' | 'rounded' | number | `${number}px` | `${number}rem` | `${number}%`;

	/**
	 * Icon displayed at the start of the chip (don't use with avatar)
	 *
	 * @example
	 * icon={<CustomIcon />}
	 *
	 * @remarks
	 * Silently ignored when `role="suggestion"`.
	 */
	icon?: ReactNode;

	/**
	 * Avatar displayed at the start of the chip (only for input chips, don't use with icon)
	 *
	 * @example
	 * avatar={<img src="/user.jpg"/>}
	 *
	 * @remarks
	 * Only rendered when `role="input"`. Silently ignored for other roles.
	 */
	avatar?: ReactNode;

	/**
	 * URL to make the chip a clickable link. When provided, the chip
	 * renders as an `<a>` element; otherwise it renders as a `<button>`.
	 *
	 * @example
	 * href="https://example.com"
	 * href="/dashboard"
	 */
	href?: string;

	/**
	 * Target attribute for the link
	 *
	 * @example
	 * target="_blank"
	 * target="_self"
	 * target="_parent"
	 */
	target?: '_blank' | '_self' | '_parent' | '_top';

	/**
	 * Indicates if the chip is selected (only for filter/input chips)
	 * @default false
	 */
	selected?: boolean;

	/**
	 * Disables the chip interaction
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Defines the chip class name
	 */
	className?: string;

	/**
	 * Click event
	 *
	 * @param event
	 * @param properties - the chip properties after defaults
	 * @returns
	 */
	onClick?: (event: SyntheticEvent, properties: Properties) => void;

	/**
	 * Remove event handler for input chips (shows X button)
	 *
	 * @param event
	 * @param properties
	 * @returns
	 *
	 * @remarks
	 * Only fired when `role="input"`. Silently ignored for other roles.
	 */
	onRemove?: (event: SyntheticEvent, properties: Properties) => void;

	/**
	 * Toggle event handler for filter chips
	 *
	 * @param event
	 * @param selected - the new (next) selected state
	 * @param properties
	 * @returns
	 *
	 * @remarks
	 * Only fired when `role="filter"`. Silently ignored for other roles.
	 */
	onToggle?: (event: SyntheticEvent, selected: boolean, properties: Properties) => void;
};
