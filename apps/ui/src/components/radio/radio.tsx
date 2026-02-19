import { useRef, useLayoutEffect, useMemo, isValidElement } from 'react';
import _ from 'lodash';
import clsx from 'clsx';

import type { Properties } from './types';
import { toDefaults, toNativeProperties, toClasses, toSize } from './helpers';
import './styles/index.css';
import { Text, type TextProperties } from '../text';

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

	useLayoutEffect(() => {
		if (!reference.current) return;

		reference.current.style.setProperty('--radio-size-inject', `${size}px`);
		reference.current.style.setProperty('--radio-color-inject', defaults.color);

		if (defaults.disabled) {
			reference.current.setAttribute('aria-disabled', 'true');
		}
	}, [defaults.color, size, defaults.disabled]);

	return (
		<label ref={reference} className={toClasses(defaults)}>
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

			{!_.isEmpty(defaults.children) && defaults.children}
			{_.isEmpty(defaults.children) && isValidElement(defaults.label) && defaults.label}
			{_.isEmpty(defaults.children) &&
				!isValidElement(defaults.label) &&
				defaults.label !== null &&
				Text.createFrom(
					typeof defaults.label === 'function'
						? defaults.label
						: typeof defaults.label === 'string'
							? { content: defaults.label, className: 'radio__label' }
							: _.defaults(
									{ className: clsx('radio__label', (defaults.label as TextProperties).className) },
									defaults.label
								)
				)}
		</label>
	);
}
