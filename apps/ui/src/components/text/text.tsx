import type { Properties } from './types';
import { toDefaults, toClasses, toSize } from './helpers';
import './styles/index.css';
import { useLayoutEffect, useRef, useMemo } from 'react';

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
		if (defaults.weight) {
			reference.current.style.setProperty('--text-weight-inject', `${defaults.weight}`);
		}
		if (defaults.lineHeight) {
			reference.current.style.setProperty('--text-line-height-inject', `${defaults.lineHeight}`);
		}
		reference.current.style.setProperty('--text-letter-spacing-inject', defaults.letterSpacing);
		reference.current.style.setProperty('--text-color-inject', defaults.color);
		reference.current.style.setProperty('--text-align-inject', defaults.align);
		reference.current.style.setProperty('--text-decoration-inject', defaults.decoration);
		reference.current.style.setProperty('--text-font-style-inject', defaults.italic ? 'italic' : 'normal');
		reference.current.style.setProperty('--text-transform-inject', defaults.transform);
		reference.current.style.setProperty('--text-white-space-inject', defaults.noWrap ? 'nowrap' : 'normal');
		reference.current.style.setProperty('--text-user-select-inject', defaults.unselectable ? 'none' : 'auto');
		reference.current.style.setProperty('--text-opacity-inject', defaults.disabled ? '0.5' : '1');
		reference.current.style.setProperty('--text-cursor-inject', defaults.disabled ? 'not-allowed' : 'inherit');
	}, [reference.current]);

	return (
		<Element
			className={toClasses(defaults)}
			ref={reference}
			onClick={(event: React.MouseEvent<HTMLElement>) => {
				if (defaults.disabled) return;

				defaults.onClick(event, defaults);
			}}>
			{defaults.children ?? defaults.content}
		</Element>
	);
}
