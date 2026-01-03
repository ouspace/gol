import { useRef, useLayoutEffect, useMemo, isValidElement } from 'react';

import type { Properties } from './types';
import { toDefaults, toNativeProperties, toClasses, toSize, toLabelProperties } from './helpers';
import './styles/index.css';

/**
 * Radio component
 *
 * @param {Properties} properties - refers to radio properties
 *
 * @description
 * Supports custom properties and native input attributes.
 *
 * @example
 * <Radio label="label-text" value="radio-value" color="red" size="normal" />
 * <Radio {...properties} />
 * <Radio label="native props" aria-label="option" data-testid="radio" onFocus={fn} />
 *
 * @returns {React.JSX.Element} element
 */
export default function Radio(properties?: Properties) {
	const defaults = toDefaults(properties);
	const nativeProperties = toNativeProperties(properties);

	const reference = useRef<HTMLLabelElement>(null);

	const size = useMemo(() => toSize(defaults.size), [defaults.size]);
	const label = useMemo(() => toLabelProperties(defaults.label), [defaults.label]);

	useLayoutEffect(() => {
		if (!reference.current) return;

		reference.current.style.setProperty('--radio-size-inject', `${size}px`);
		reference.current.style.setProperty('--radio-color-inject', defaults.color);

		if (label?.color) {
			reference.current.style.setProperty('--radio-label-color-inject', label.color);
		}

		if (defaults.disabled) {
			reference.current.setAttribute('aria-disabled', 'true');
		}
	}, [defaults.color, size, defaults.disabled, label?.color]);

	return (
		<label ref={reference} className={toClasses(defaults, label)}>
			<input
				type='radio'
				id={defaults.id}
				name={defaults.name}
				value={defaults.value}
				checked={defaults.checked}
				disabled={defaults.disabled}
				required={defaults.required}
				onChange={(event) => {
					if (defaults.disabled) return;
					defaults.onChange(event, {
						...properties,
						checked: event.target.checked,
					});
				}}
				{...nativeProperties}
				className='radio__input'
			/>

			<span className='radio__box'>{defaults.checked ? defaults.checkedIcon : defaults.icon}</span>

			{defaults.children ? (
				<span className='radio__label'>{defaults.children}</span>
			) : label ? (
				<span className={`radio__label ${label.className ?? ''}`.trim()} style={{ color: label.color }}>
					{label.value}
				</span>
			) : defaults.label && isValidElement(defaults.label) ? (
				<span className='radio__label'>{defaults.label}</span>
			) : null}
		</label>
	);
}
