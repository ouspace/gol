import type { RefAttributes, SyntheticEvent } from 'react';

type Size<TValue extends string> = TValue | number;
type Color<TValue extends string> = TValue | `rgb(${string})` | `rgba(${string})` | `hsl(${string})` | `hsla(${string})` | `#${string}`;
/**
 * 
 */
type AllowedIcons =
  	| 'favorite'
  	| 'star'
  	| 'bookmark'
	| 'thumb_up'
	| 'thumb_down'
  	| null;

export type Properties = RefAttributes<HTMLElement> & {
	/**
	 * 
	 */
	id?: string;

	/**
	 * 
	 */
	name?: string;

	/**
	 * 
	 */
	label?: string;

	/**
	 * 
	 */
	labelPosition?: 'top' | 'right' | 'bottom' | 'left';

	/**
	 * 
	 */
	value?: boolean | null;

	/**
	 * 
	 */
	disabled?: boolean;

	/**
	 * 
	 */
	iconName?: AllowedIcons;

	/**
	 * 
	 */
	size?: Size<'normal' | 'small' | 'big'>;

	/**
	 * 
	 */
	color?: Color<'orange' | 'yellow' | 'olive' | 'teal' | 'violet' | 'purple' | 'pink' | 'brown' | 'grey' | 'red' | 'green' | 'blue' | 'black'>

	/**
	 * 
	 */
	circular?: boolean;

	/**
	 * 
	 */
	className?: string;

	/**
	 * 
	 */
	onChange?: (event: SyntheticEvent, properties: Properties) => void;
}
