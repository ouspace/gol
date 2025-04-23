import React, { useState, useEffect } from 'react';
import type { CheckboxProperties } from './types';
import './styles/checkbox.css';
import { generateId } from './helpers';

export const Checkbox: React.FC<CheckboxProperties> = ({ 
	id,
	label,
	checked = false,
	disabled = false,
	onChange,
}) => {
	const [isChecked, setIsChecked] = useState(checked);
	const checkboxId = id ?? generateId();

	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (disabled) return;
		const newState = event.target.checked;
		setIsChecked(newState);
		onChange(newState);
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<div className="checkbox-container">
				<input
					type="checkbox"
					className="checkbox-input"
					checked={isChecked}
					onChange={handleChange}
					id={checkboxId}
					disabled={disabled}
				/>
			</div>
			{label && (
				<label className="checkbox-label" htmlFor={checkboxId}>
					{label}
				</label>
			)}
		</div>
	);
};


