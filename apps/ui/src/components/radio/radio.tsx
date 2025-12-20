import { useRef, useLayoutEffect, useMemo, isValidElement } from 'react';

import type { Properties } from './types';
import { toDefaults, toClasses, toSize, toLabelProperties } from './helpers';
import './styles/index.css';

export default function Radio(properties?: Properties) {
	const defaults = toDefaults(properties);
	const reference = useRef<HTMLLabelElement>(null);
	const size = useMemo(() => toSize(defaults), [defaults.size]);
	const labelProperties = useMemo(() => toLabelProperties(defaults.label), [defaults.label]);

	useLayoutEffect(() => {
		if (!reference.current) return;
		reference.current.style.setProperty('--radio-size-inject', `${size}px`);
		reference.current.style.setProperty('--radio-color-inject', defaults.color);
		if (labelProperties?.color)
			reference.current.style.setProperty('--radio-label-color-inject', labelProperties.color);
		if (defaults.disabled) reference.current.setAttribute('aria-disabled', 'true');
	}, [defaults.color, size, defaults.disabled, labelProperties?.color]);

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
					defaults.onChange(event, { ...defaults, checked: event.target.checked });
				}}
				className='radio__input'
			/>
			<span className='radio__box'>{defaults.checked ? defaults.checkedIcon : defaults.icon}</span>

			{labelProperties ? (
				<span
					className={`radio__label ${labelProperties.className ?? ''}`.trim()}
					style={{ color: labelProperties.color }}>
					{labelProperties.value}
				</span>
			) : defaults.label && isValidElement(defaults.label) ? (
				<span className='radio__label'>{defaults.label}</span>
			) : null}
		</label>
	);
}
