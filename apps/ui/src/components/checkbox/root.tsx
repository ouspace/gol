import { useRef, useLayoutEffect, useId, isValidElement } from 'react';
import _ from 'lodash';
import clsx from 'clsx';

import type { Properties } from './types';
import './styles/index.css';
import { toDefaults, toSupportedProperties, toClasses, toSize } from './helpers';
import { Text, type TextProperties } from '../text';
import { Icon } from '../icon';

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
	const nativeProperties = toSupportedProperties(properties);
	const generatedId = useId();
	const id = properties?.id ?? generatedId;
	const reference = properties?.ref ?? useRef<HTMLLabelElement>(null);
	const inputReference = useRef<HTMLInputElement>(null);
	const size = toSize(defaults);

	const style = {
		'--checkbox-size-inject': `${size}px`,
		'--checkbox-color-inject': defaults.color,
		...properties?.style,
	} as React.CSSProperties;

	useLayoutEffect(() => {
		if (inputReference.current) {
			inputReference.current.indeterminate = defaults.value === null;
		}
	}, [defaults.value]);

	return (
		<label ref={reference} className={toClasses(defaults)} style={style}>
			<input
				{...nativeProperties}
				ref={inputReference}
				type='checkbox'
				className='input'
				checked={defaults.value === true}
				disabled={defaults.disabled}
				id={id}
				name={properties?.name}
				onChange={(event) => {
					if (defaults.disabled) return;
					defaults.onChange(event, { ...properties, value: event.target.checked });
				}}
				aria-checked={defaults.value ?? 'mixed'}
				aria-label={properties?.label ? undefined : 'Checkbox'}
			/>
			<span className='box'>
				{defaults.value === true && properties?.checkedIcon
					? Icon.createFrom(properties.checkedIcon)
					: properties?.icon
						? Icon.createFrom(properties.icon)
						: null}
			</span>

			{!_.isEmpty(properties?.children) && properties?.children}
			{_.isEmpty(properties?.children) && isValidElement(properties?.label) && properties?.label}
			{_.isEmpty(properties?.children) &&
				!isValidElement(properties?.label) &&
				properties?.label != null &&
				Text.createFrom(
					typeof properties.label === 'function'
						? properties.label
						: typeof properties.label === 'string'
							? { content: properties.label, className: 'label' }
							: _.defaults(
									{ className: clsx('label', (properties.label as TextProperties).className) },
									properties.label
								)
				)}
		</label>
	);
}
