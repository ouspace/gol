import _ from 'lodash';
import type { Properties } from './types';
import { toDefaults, toClass, toSize } from './helpers';
import './styles/index.css';

/**
 * Text component
 *
 * Typography primitive mapping to Material 3 type scales (display, headline,
 * title, label, body) with polymorphic element rendering. Use to keep text
 * styling consistent across the app instead of raw heading/paragraph tags.
 *
 * @summary Material 3 typography primitive with polymorphic element rendering
 *
 * @example
 * <Text variant="h1" color="blue" weight="bold">Hello World</Text>
 *
 * @param {Properties} properties - refers to text properties
 * @returns {React.JSX.Element} element
 */
export default function Text(properties?: Properties) {
	const defaults = toDefaults(properties);
	const Element = defaults.as;

	const size = toSize(defaults.size);
	const style = {
		...properties?.style,
		...(size != null && { '--text-size-inject': size }),
		...(defaults.weight != null && { '--text-weight-inject': `${defaults.weight}` }),
		...(defaults.lineHeight != null && { '--text-line-height-inject': `${defaults.lineHeight}` }),
		...(defaults.letterSpacing != null && { '--text-letter-spacing-inject': defaults.letterSpacing }),
		...(defaults.color !== 'black' && { '--text-color-inject': defaults.color }),
		...(defaults.align !== 'left' && { '--text-align-inject': defaults.align }),
		...(defaults.decoration !== 'none' && { '--text-decoration-inject': defaults.decoration }),
	} as React.CSSProperties;

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		if (defaults.disabled) return;
		defaults.onClick(event, _.omit(defaults, ['onClick']));
	};

	return (
		<Element className={toClass(defaults)} style={style} onClick={handleClick}>
			{defaults.children ?? defaults.content}
		</Element>
	);
}
