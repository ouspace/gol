import type { RefAttributes, SyntheticEvent } from 'react';
import type { IconKeys } from './icon.list.lfs';

// TODO: Implement a `custom type` to extend `Name` keys along side `IconKeys`.
type Name = IconKeys;
type RGB = `rgb(${string})`
type RGBA = `rgba(${string})`
type HSL = `hsl(${string})`
type HSLA = `hsla(${string})`
type HEX = `#${string}`
type Color<TValue extends string> = TValue | RGB | RGBA | HEX | HSL | HSLA;
type Size<TValue extends string> = TValue | number;
type Weight<TValue extends string> = TValue | number;
type Rotate<TValue extends string> = TValue | boolean | {
	value?: number,
	unit?: 'deg' | 'rad' | 'turn';
	direction?: 'clockwise' | 'counter-clockwise';
};

/**
 *
 */
export type Properties = RefAttributes<HTMLElement> & {
	/**
	 * defines a material symbols' name
	 * see more information at {@link https://fonts.google.com/icons}
	 *
	 * @example
	 * name="1k"
	 */
	name?: Name;

	/**
	 * defines the icon size
	 *
	 * @example
	 * size="small"
	 * size={24}
	 */
	size?: Size<'smallest' | 'small' | 'smallless' | 'normal' | 'bigless' | 'big' | 'biggest'>;

	/**
	 * defines the icon color, and supports `rgb` | `rgba` | `hsl` | `hsla` | `hex` | `named colors`
	 *
	 * @example
	 * color="red"
	 * color="#f00"
	 * color="rgb(255, 0, 0)"
	 * color="rgba(255, 0, 0, 1)"
	 * color="hsl(0, 100%, 50%)"
	 * color="hsla(0, 100%, 50%, 1)"
	 */
	color?: Color<'orange' | 'yellow' | 'olive' | 'teal' | 'violet' | 'purple' | 'pink' | 'brown' | 'grey' | 'red' | 'green' | 'blue' | 'black'>

	/**
	 * defines the icon weight
	 *
	 * @example
	 * weight="normal"
	 * weight={400}
	 */
	weight?: Weight<'lightest' | 'light' | 'lightless' | 'normal' | 'boldless' | 'bold' | 'boldest'>;

	/**
	 * defines the icon fill mode
	 */
	fill?: boolean;

	/**
	 * defines the icon variant
	 */
	variant?: 'outlined' | 'rounded' | 'sharp';

	/**
	 * defines the icon class name
	 */
	className?: string;

	/**
	 * defines the icon disabled state
	 */
	disabled?: boolean;

	/**
	 * defines the icon bordered state
	 */
	bordered?: boolean;

	/**
	 * defines the icon flipped state
	 */
	flipped?: boolean;

	/**
	 * defines the icon inverted state
	 */
	inverted?: boolean;

	/**
	 * defines the icon rotation. By default is 0deg.
	 *
	 * @example
	 * rotated={true} // 180deg
	 * rotated={90} // 90deg
	 * rotated="north" // 0deg
	 * rotated={{
	 * 		value: 90,
	 * 		unit: 'deg', // 'deg' | 'rad' | 'turn'
	 * 		direction: 'clockwise' // 'clockwise' | 'counter-clockwise'
	 * }} // 90deg clockwise
	 */
	rotated?: Rotate<'north' | 'east' | 'south' | 'west'>;

	/**
	 *
	 */
	// fitted?: boolean;

	/**
	 * defines the icon inverted state
	 */
	circular?: boolean;

	/**
	 *
	 * @param event
	 * @returns
	 */
	onClick?: (event: SyntheticEvent, properties: Properties) => void;
}
