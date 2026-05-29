import type { ReactNode, ElementType, RefAttributes, SyntheticEvent, CSSProperties } from 'react';
import type { CssColor, LineHeight, LetterSpacing, Size } from '../../types/tokens';

type ScaleName =
	| 'display-large'
	| 'display-medium'
	| 'display-small'
	| 'headline-large'
	| 'headline-medium'
	| 'headline-small'
	| 'title-large'
	| 'title-medium'
	| 'title-small'
	| 'label-large'
	| 'label-medium'
	| 'label-small'
	| 'body-large'
	| 'body-medium'
	| 'body-small';

type As<TValue extends string> = TValue | ElementType;

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
	 * Defines the text content.
	 * Alternative to `children` properties.
	 *
	 * @example
	 * content="Hello World"
	 * content={<strong>Bold</strong>}
	 */
	content?: ReactNode;

	/**
	 * Defines a preset type scale configuration.
	 * Sets `size`, `weight`, and `line-height`.
	 *
	 * @example
	 * scale="title-medium"
	 * scale="body-large"
	 */
	scale?: ScaleName;

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
	weight?: number | 'normal' | 'bold' | 'lighter' | 'bolder' | 'inherit' | 'initial' | 'revert' | null;

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
	color?: CssColor;

	/**
	 * Defines the line height of the text.
	 * Supports named values, numbers, `em`, `rem`, `px`, `%`, `vw`, and `vh`.
	 *
	 * @example
	 * lineHeight="normal"
	 * lineHeight={1.5}
	 * lineHeight="2rem"
	 */
	lineHeight?: LineHeight<'normal' | 'inherit'> | null;

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
	letterSpacing?: LetterSpacing<'normal'> | null;

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
	 * If `true`, allows text to wrap to the next line.
	 *
	 * @default true
	 * @example
	 * noWrap={false}
	 */
	wrap?: boolean;

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

	/**
	 * Inline style applied to the text element. Spread into the rendered element
	 * before text-specific CSS custom properties are injected.
	 */
	style?: CSSProperties;
};
