import { type ClassValue } from 'clsx';
import * as clsxLib from 'clsx';
import type { TextFieldProperties } from '../types';

/**
 * Generates the className string for the TextField container
 */
export function generateTextFieldClassNames({
	variant = 'filled',
	error,
	disabled,
	focused,
	hovered,
	className
}: {
	variant?: 'filled' | 'outlined';
	error?: boolean;
	disabled?: boolean;
	focused?: boolean;
	hovered?: boolean;
	className?: ClassValue;
}): string {
	return clsxLib.default(
		'textfield',
		`textfield--${variant}`,
		{
			'textfield--error': error,
			'textfield--disabled': disabled,
			'textfield--focused': focused,
			'textfield--hovered': hovered
		},
		className
	);
}

/**
 * Generates ARIA attributes for the TextField
 */
export function getTextFieldAriaProperties({
	label,
	required,
	error,
	disabled,
	supportingText,
	errorText,
	maxLength,
	value
}: Pick<TextFieldProperties, 'label' | 'required' | 'error' | 'disabled' | 'supportingText' | 'errorText' | 'maxLength' | 'value'>): Record<string, string | undefined> {
	const ariaLabel = [
		label && `${label}${required ? '*' : ''}`,
		supportingText,
		errorText,
		maxLength && `Character count, ${String(value).length}/${maxLength}`
	]
		.filter(Boolean)
		.join('. ');

	return {
		'aria-label': ariaLabel || undefined,
		'aria-invalid': error ? 'true' : undefined,
		'aria-disabled': disabled ? 'true' : undefined,
		'aria-required': required ? 'true' : undefined
	};
}

/**
 * Generates unique IDs for TextField elements
 */
export function generateTextFieldIds(baseId: string): Record<string, string> {
	return {
		input: `textfield-${baseId}`,
		label: `textfield-${baseId}-label`,
		supporting: `textfield-${baseId}-supporting`,
		error: `textfield-${baseId}-error`,
		counter: `textfield-${baseId}-counter`,
		prefix: `textfield-${baseId}-prefix`,
		suffix: `textfield-${baseId}-suffix`
	};
}

/**
 * Validates TextField properties and shows warnings in development
 */
export function validateTextFieldProperties({
	value,
	maxLength,
	required,
	pattern,
	type
}: Pick<TextFieldProperties, 'value' | 'maxLength' | 'required' | 'pattern' | 'type'>): void {
	if (process.env.NODE_ENV !== 'development') {
		return;
	}

	// Validate maxLength
	if (maxLength !== undefined && maxLength <= 0) {
		console.warn('[TextField]: maxLength must be greater than 0');
	}

	// Validate value length against maxLength
	if (maxLength !== undefined && value && String(value).length > maxLength) {
		console.warn('[TextField]: Value exceeds maxLength');
	}

	// Validate required fields
	if (required && !value) {
		console.warn('[TextField]: Required field has no value');
	}

	// Validate pattern
	if (pattern && value && !new RegExp(String(pattern)).test(String(value))) {
		console.warn('[TextField]: Value does not match specified pattern');
	}

	// Validate type-specific formats
	if (type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) {
		console.warn('[TextField]: Invalid email format');
	}
}

/**
 * Formats input value based on type
 */
export function formatTextFieldValue(value: string, type?: string): string {
	switch (type) {
		case 'tel': {
			// Format phone numbers: (XXX) XXX-XXXX
			return value.replaceAll(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
		}
		case 'number': {
			// Remove non-numeric characters
			return value.replaceAll(/[^\d.-]/g, '');
		}
		default: {
			return value;
		}
	}
}