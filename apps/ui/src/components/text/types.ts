import { ReactNode, ElementType, RefAttributes, SyntheticEvent } from 'react';

type RGB = `rgb(${string})`;
type RGBA = `rgba(${string})`;
type HEX = `#${string}`;
type HSL = `hsl(${string})`;
type HSLA = `hsla(${string})`;

type EM = `${number}em`;
type REM = `${number}rem`;
type PX = `${number}px`;
type PERCENT = `${number}%`;
type VW = `${number}vw`;
type VH = `${number}vh`;

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
type NameVariant =
	| 'body1'
	| 'body2'
	| 'button'
	| 'caption'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'inherit'
	| 'overline'
	| 'subtitle1'
	| 'subtitle2';

type Color<TValue extends string> = TValue | RGB | RGBA | HEX | HSL | HSLA;
type As<TValue extends string> = TValue | ElementType;
type Size<TValue extends string> = TValue | number | EM | REM | PX | PERCENT | VW | VH;
type LineHeight<TValue extends string> = TValue | number | EM | REM | PX | PERCENT | VW | VH;
type LetterSpacing<TValue extends string> = TValue | EM | REM | PX | PERCENT | VW | VH;

/**
 * Text component properties
 */
export type Properties = RefAttributes<HTMLElement> & {
	/**
	 * Defines the content of the text component.
	 * Takes precedence over the `content` prop.
	 *
	 * @example
	 * <Text>Hello World</Text>
	 */
	children?: ReactNode;

	/**
	 * Defines the text content as a string.
	 * Use `children` for ReactNode content.
	 *
	 * @example
	 * content="Hello World"
	 */
	content?: string;

	/**
	 * Defines the HTML element to render.
	 *
	 * @default "span"
	 * @example
	 * as="p"
	 * as="h1"
	 */
	as?: As<'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label'>;

	/**
	 * Defines the typography variant.
	 * Each variant applies predefined font-size, weight, and line-height.
	 *
	 * @example
	 * variant="h1"
	 * variant="body1"
	 * variant="caption"
	 */
	variant?: NameVariant;

	/**
	 * Defines the font size of the text.
	 * Supports named sizes, numbers (px), `em`, `rem`, `px`, `%`, `vw`, and `vh`.
	 *
	 * @default "normal"
	 * @example
	 * size="small"
	 * size="big"
	 * size={16}
	 * size="1.5rem"
	 */
	size?: Size<'normal' | 'small' | 'big'>;

	/**
	 * Defines the font weight of the text.
	 *
	 * @example
	 * weight="bold"
	 * weight={600}
	 */
	weight?: number | 'normal' | 'bold' | 'lighter' | 'bolder' | 'inherit' | 'initial' | 'revert';

	/**
	 * Defines the text color.
	 * Supports named colors, `rgb`, `rgba`, `hsl`, `hsla`, and `hex`.
	 *
	 * @default "black"
	 * @example
	 * color="red"
	 * color="#ff0000"
	 * color="rgb(255, 0, 0)"
	 */
	color?: Color<NameColor>;

	/**
	 * Defines the line height of the text.
	 * Supports named values, numbers, `em`, `rem`, `px`, `%`, `vw`, and `vh`.
	 *
	 * @example
	 * lineHeight="normal"
	 * lineHeight={1.5}
	 * lineHeight="2rem"
	 */
	lineHeight?: LineHeight<'normal' | 'inherit'>;

	/**
	 * Defines the text alignment.
	 *
	 * @default "left"
	 * @example
	 * align="center"
	 * align="justify"
	 */
	align?: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end' | 'inherit';

	/**
	 * Defines the letter spacing of the text.
	 * Supports `em`, `rem`, `px`, `%`, `vw`, and `vh`.
	 *
	 * @example
	 * letterSpacing="normal"
	 * letterSpacing="0.1em"
	 */
	letterSpacing?: LetterSpacing<'normal'>;

	/**
	 * Defines the text decoration.
	 *
	 * @default "none"
	 * @example
	 * decoration="underline"
	 * decoration="line-through"
	 */
	decoration?: 'none' | 'underline' | 'overline' | 'line-through' | (string & {});

	/**
	 * If `true`, applies italic font style.
	 *
	 * @default false
	 * @example
	 * italic={true}
	 */
	italic?: boolean;

	/**
	 * Defines the text transform.
	 *
	 * @default "none"
	 * @example
	 * transform="uppercase"
	 * transform="capitalize"
	 */
	transform?: 'uppercase' | 'capitalize' | 'lowercase' | 'math-auto' | 'none';

	/**
	 * If `true`, prevents text from wrapping to the next line.
	 *
	 * @default false
	 * @example
	 * noWrap={true}
	 */
	noWrap?: boolean;

	/**
	 * If `true`, prevents text selection.
	 *
	 * @default false
	 * @example
	 * unselectable={true}
	 */
	unselectable?: boolean;

	/**
	 * If `true`, applies disabled styling (reduced opacity and not-allowed cursor).
	 *
	 * @default false
	 * @example
	 * disabled={true}
	 */
	disabled?: boolean;

	/**
	 * Callback fired when the text is clicked.
	 *
	 * @param event - The click event
	 * @param properties - The component properties
	 *
	 * @example
	 * onClick={(event, props) => console.log('clicked')}
	 */
	onClick?: (event: SyntheticEvent, properties: Properties) => void;

	/**
	 * Defines the CSS class name for the text component.
	 *
	 * @example
	 * className="custom-text"
	 */
	className?: string;
};
