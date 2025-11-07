import { useRef, useLayoutEffect, useMemo } from 'react';

import type { Properties } from './types';
import './styles/index.css';
import { toDefaults, toClasses, toSize } from './helpers';
import { Icon } from '../icon/index';

/**
 * @param properties
 * @returns
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
				type="checkbox"
				className="checkbox__input"
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
			<span className="checkbox__box">
				{defaults.iconName && (
					<Icon
						name={defaults.value === null ? 'indeterminate_check_box' : defaults.iconName}
						size={size}
						fill={defaults.value === true}
						color={defaults.value === true ? defaults.color : 'grey'}
						variant="outlined"
					/>
				)}
			</span>

			{defaults.label && (
				<span className="checkbox__label">{defaults.label}</span>
			)}
		</label>
	);
}
