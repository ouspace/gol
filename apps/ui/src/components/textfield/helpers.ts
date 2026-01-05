import clsx from 'clsx';
import type {
	TextFieldValidationProperties,
	TextFieldClassNameProperties,
	TextFieldAriaProperties,
	TextFieldIds
} from './types';

/**
 * Type guard to validate TextFieldIds structure
 * @param ids - Object to validate
 * @returns Whether the object has valid TextFieldIds structure
 */
export const isValidIds = (ids: unknown): ids is TextFieldIds => {
	return typeof ids === 'object' && ids !== null;
};

/**
 * Type guard to validate TextFieldAriaProperties structure
 * @param properties - Object to validate
 * @returns Whether the object has valid ARIA properties structure
 */
export const isValidAriaProperties = (properties: unknown): properties is TextFieldAriaProperties => {
	return typeof properties === 'object' && properties !== null;
};

/**
 * Validates TextField properties during development
 * @param properties - Validation properties
 * @throws Error if validation fails
 */
export function validateTextFieldProperties(properties: TextFieldValidationProperties): void {
	const { value, max, required, pattern, type } = properties;

	if (max !== undefined && (!Number.isInteger(max) || max < 0)) {
		throw new Error('max must be a non-negative integer');
	}

	if (required !== undefined && typeof required !== 'boolean') {
		throw new TypeError('required must be a boolean');
	}

	if (pattern !== undefined && typeof pattern !== 'string') {
		throw new Error('pattern must be a string');
	}

	if (type !== undefined && !['text', 'password', 'email', 'tel', 'url', 'search', 'number'].includes(type)) {
		throw new Error('type must be a valid input type');
	}

	// Validate value length against max
	if (value !== null && value !== undefined && max !== undefined) {
		const stringValue = String(value);
		if (stringValue.length > max) {
			throw new Error(`Value length (${stringValue.length}) exceeds max (${max})`);
		}
	}
}

/**
 * Generates consistent IDs for TextField elements
 * @param baseId - Base identifier
 * @returns Object with all necessary IDs
 */
export function generateTextFieldIds(baseId: string): TextFieldIds {
	if (!baseId || typeof baseId !== 'string') {
		throw new Error('baseId must be a non-empty string');
	}

	return {
		input: `${baseId}-input`,
		label: `${baseId}-label`,
		supporting: `${baseId}-supporting`,
		error: `${baseId}-error`,
		counter: `${baseId}-counter`,
		prefix: `${baseId}-prefix`,
		suffix: `${baseId}-suffix`,
	};
}

/**
 * Generates CSS class names based on TextField state
 */
export function generateTextFieldClassNames(properties: TextFieldClassNameProperties): string {
	const { variant = 'filled', error, disabled, focused, hovered, className } = properties;

	return clsx(
		'field text',
		variant,
		{
			'error': error,
			'disabled': disabled,
			'focused': focused,
			'hovered': hovered && !disabled
		},
		className
	);
}

/**
 * Generates ARIA properties for accessibility
 */
export function getTextFieldAriaProperties(properties: TextFieldAriaProperties): Record<string, string | boolean | undefined> {
	const {
		label,
		required,
		error,
		disabled,
		max,
		value
	} = properties;

	const ariaProperties: Record<string, string | boolean | undefined> = {
		'aria-invalid': error || undefined,
		'aria-disabled': disabled || undefined,
		'aria-required': required || undefined,
	};

	// Set aria-label if no visible label
	if (!label) {
		ariaProperties['aria-label'] = 'Text input';
	}

	// Character count information if applicable
	if (max && value) {
		const currentLength = String(value).length;
		ariaProperties['aria-valuetext'] = `${currentLength} of ${max} characters`;
	}

	return ariaProperties;
}

/**
 * Safely converts value to string, handling null/undefined
 * @param value - Input value
 * @returns String representation
 */
export function safeStringValue(value: string | number | null | undefined): string {
	if (value === null || value === undefined) {
		return '';
	}
	return String(value);
}

/**
 * Checks if a value is considered "populated" (has content)
 * @param value - Input value
 * @returns Whether the field has content
 */
export function isFieldPopulated(value: string | number | null | undefined): boolean {
	const stringValue = safeStringValue(value);
	return stringValue.length > 0;
}

/**
 * Validates if a string matches a given pattern
 * @param value - String to validate
 * @param pattern - Regex pattern
 * @returns Whether the string is valid
 */
export function validatePattern(value: string, pattern?: string): boolean {
	if (!pattern) return true;

	try {
		const regex = new RegExp(pattern);
		return regex.test(value);
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		console.warn('Invalid pattern provided:', pattern, errorMessage);
		return true;
	}
}

/**
 * Gets appropriate inputMode based on input type
 * @param type - Input type
 * @returns Recommended inputMode
 */
export function getRecommendedInputMode(type?: string): string | undefined {
	switch (type) {
		case 'email': {
			return 'email';
		}
		case 'tel': {
			return 'tel';
		}
		case 'url': {
			return 'url';
		}
		case 'number': {
			return 'numeric';
		}
		case 'search': {
			return 'search';
		}
		default: {
			return undefined;
		}
	}
}

/**
 * Formats input value based on type
 */
export function formatTextFieldValue(value: string, type?: string): string {
	switch (type) {
		case 'tel': {
			// Format phone numbers: (XXX) XXX-XXXX
			return value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
		}
		case 'number': {
			// Remove non-numeric characters except for decimal and sign
			return value.replace(/[^\d.-]/g, '');
		}
		default: {
			return value;
		}
	}
}