import React, { useRef, useCallback, useEffect } from 'react';
import { Properties } from './types';
import './styles/index.css';
import { toDefaults, getContainerClass, getLabelClass } from './helpers';

/**
 * 
 * @param properties 
 * @returns
 */
export default function Checkbox(properties?: Properties) {
	const defaults = toDefaults(properties);

	const inputReference = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputReference.current) {
			inputReference.current.indeterminate = defaults.indeterminate;
		}
	}, [defaults.indeterminate]);

	const onChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (!defaults.disabled) {
			defaults.onChange(event.target.checked);
		}
	}, [defaults]);

	const onContainerClickHandler = useCallback(() => {
		if (inputReference.current && !defaults.disabled) {
			inputReference.current.click();
		}
	}, [defaults.disabled]);

	const onLabelClickHandler = useCallback((event: React.MouseEvent) => {
		if (defaults.disabled) {
			event.preventDefault();
		}
	}, [defaults.disabled]);

	return (
		<div className={getContainerClass(defaults.variant, defaults.disabled)}>
			<div 
				className="container"
				onClick={onContainerClickHandler}
				role="presentation"
			>
				<input
					ref={inputReference}
					type="checkbox"
					className="input"
					checked={defaults.checked}
					onChange={onChangeHandler}
					id={defaults.id}
					disabled={defaults.disabled}
					aria-checked={defaults.indeterminate ? 'mixed' : defaults.checked}
				/>
			</div>
			{defaults.label && (
				<label 
					className={getLabelClass(defaults.disabled)}
					htmlFor={defaults.id}
					onClick={onLabelClickHandler}
				>
					{defaults.label}
				</label>
			)}
		</div>
	);
}