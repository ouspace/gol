import type { Properties } from './types';
import { toDefaults, toClasses, toSize } from './helpers';
import './styles/index.css';
import { useLayoutEffect, useRef, useMemo } from 'react';
import _ from 'lodash';

/**
 * Text component
 *
 * @param {Properties} properties - refers to text properties
 *
 * @example
 * <Text variant="h1" color="blue" weight="bold">Hello World</Text>
 *
 * @returns {React.JSX.Element} element
 */
export default function Text(properties?: Properties) {
	const defaults = toDefaults(properties);
	const Element = defaults.as;
	const reference = useRef<HTMLElement>(null);
	const size = useMemo(() => toSize(defaults), [defaults.size]);

	useLayoutEffect(() => {
		if (!reference.current) return;

		if (size) {
			reference.current.style.setProperty('--text-size-inject', size);
		}
		if (defaults.weight !== null) {
			reference.current.style.setProperty('--text-weight-inject', `${defaults.weight}`);
		}
		if (defaults.lineHeight !== null) {
			reference.current.style.setProperty('--text-line-height-inject', `${defaults.lineHeight}`);
		}
		if (defaults.letterSpacing !== null) {
			reference.current.style.setProperty('--text-letter-spacing-inject', defaults.letterSpacing);
		}
		if (defaults.color !== 'black') {
			reference.current.style.setProperty('--text-color-inject', defaults.color);
		}
		if (defaults.align !== 'left') {
			reference.current.style.setProperty('--text-align-inject', defaults.align);
		}
		if (defaults.decoration !== 'none') {
			reference.current.style.setProperty('--text-decoration-inject', defaults.decoration);
		}
	}, [defaults]);

	return (
		<Element
			className={toClasses(defaults)}
			ref={reference}
			onClick={(event: React.MouseEvent<HTMLElement>) => {
				if (defaults.disabled) return;
				defaults.onClick(event, _.omit(defaults, ['onClick']));
			}}>
			{defaults.children ?? defaults.content}
		</Element>
	);
}
