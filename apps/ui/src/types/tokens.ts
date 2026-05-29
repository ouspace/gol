export type RGB = `rgb(${string})`;
export type RGBA = `rgba(${string})`;
export type HEX = `#${string}`;
export type HSL = `hsl(${string})`;
export type HSLA = `hsla(${string})`;

export type EM = `${number}em`;
export type REM = `${number}rem`;
export type PX = `${number}px`;
export type PERCENT = `${number}%`;
export type VW = `${number}vw`;
export type VH = `${number}vh`;

export type CssUnit = EM | REM | PX | PERCENT | VW | VH;

export type ColorName =
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

export type CssColor = ColorName | RGB | RGBA | HEX | HSL | HSLA;

export type Color<T extends string = never> = [T] extends [never] ? CssColor : T | CssColor;
export type Size<T extends string = never> = [T] extends [never] ? number | CssUnit : T | number | CssUnit;
export type LineHeight<T extends string = never> = T | number | CssUnit;
export type LetterSpacing<T extends string = never> = T | CssUnit;
