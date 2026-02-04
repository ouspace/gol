import { useRef, useLayoutEffect, useMemo } from 'react';

import type { Properties } from './types';
import './styles/index.css';
import { toDefaults, toClasses, toSize } from './helpers';
import { Text } from '../text/index';

/**
 * Checkbox component
 *
 * @param {Properties} properties - refers to checkbox properties
 *
 * @example
 * <Checkbox label="Label text" value={true} color="blue" size="normal" />
 *
 * @returns {React.JSX.Element} element
 */
export default function Checkbox(properties?: Properties) {
	const defaults = toDefaults(properties);
	const reference = useRef<HTMLLabelElement>(null);
	const inputReference = useRef<HTMLInputElement>(null);
	const size = useMemo(() => toSize(defaults), [defaults.size]);

	useLayoutEffect(() => {
		if (!reference.current) return;
		reference.current.style.setProperty('--checkbox-size-inject', `${size}px`);
		reference.current.style.setProperty('--checkbox-color-inject', defaults.color);
	}, [defaults.color, size, defaults.value]);

	useLayoutEffect(() => {
		if (inputReference.current) {
			inputReference.current.indeterminate = defaults.value === null;
		}
	}, [defaults.value]);

	return (
		<label ref={reference} className={toClasses(defaults)}>
			<input
				ref={inputReference}
				type='checkbox'
				className='checkbox__input'
				checked={defaults.value === true}
				disabled={defaults.disabled}
				id={defaults.id}
				name={defaults.name}
				onChange={(event) => {
					if (defaults.disabled) return;
					defaults.onChange(event, { ...defaults, value: event.target.checked });
				}}
				aria-checked={defaults.value ?? 'mixed'}
			/>
			<span className='checkbox__box'>{defaults.value === true ? defaults.checkedIcon : defaults.icon}</span>

			{(defaults.children ?? defaults.label) && (
				<span className='checkbox__label'>
					{defaults.children ??
						(typeof defaults.label === 'string' ? <Text>{defaults.label}</Text> : <Text {...defaults.label} />)}
				</span>
			)}
		</label>
	);
}
