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
	return typeof ids === 'object' && 
         ids !== null && 
         'input' in ids && 
         'supporting' in ids && 
         'error' in ids && 
         'counter' in ids && 
         'prefix' in ids && 
         'suffix' in ids;
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
	const { value, maxLength, required, pattern, type } = properties;

	if (maxLength !== undefined && (!Number.isInteger(maxLength) || maxLength < 0)) {
		throw new Error('maxLength must be a non-negative integer');
	}

	if (typeof required !== 'boolean') {
		throw new TypeError('required must be a boolean');
	}

	if (pattern !== undefined && typeof pattern !== 'string') {
		throw new Error('pattern must be a string');
	}

	if (type !== undefined && !['text', 'password', 'email', 'tel', 'url', 'search', 'number'].includes(type)) {
		throw new Error('type must be a valid input type');
	}

	// Validate value length against maxLength
	if (value !== null && value !== undefined && maxLength !== undefined) {
		const stringValue = String(value);
		if (stringValue.length > maxLength) {
			throw new Error(`Value length (${stringValue.length}) exceeds maxLength (${maxLength})`);
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
 * @param properties - Class name generation properties
 * @returns Combined class names string
 */
export function generateTextFieldClassNames(properties: TextFieldClassNameProperties): string {
	const { variant, error, disabled, focused, hovered, className } = properties;

	if (!variant || !['filled', 'outlined'].includes(variant)) {
		throw new Error('variant must be either "filled" or "outlined"');
	}

	const classes = [
		'textfield',
		`textfield--${variant}`,
	];

	// State classes
	if (error) classes.push('textfield--error');
	if (disabled) classes.push('textfield--disabled');
	if (focused) classes.push('textfield--focused');
	if (hovered && !disabled) classes.push('textfield--hovered');

	// Custom classes
	if (className) {
		classes.push(className);
	}

	return classes.join(' ');
}

/**
 * Generates ARIA properties for accessibility
 * @param properties - ARIA properties configuration
 * @returns ARIA attributes object
 */
export function getTextFieldAriaProperties(properties: TextFieldAriaProperties): Record<string, string | boolean> {
	const { 
		label, 
		required, 
		error, 
		disabled, 
		maxLength, 
		value 
	} = properties;

	const ariaProperties: Record<string, string | boolean> = {};

	// Set aria-label if no visible label
	if (!label) {
		ariaProperties['aria-label'] = 'Text input';
	}

	// Required state
	if (required) {
		ariaProperties['aria-required'] = true;
	}

	// Error state
	if (error) {
		ariaProperties['aria-invalid'] = true;
	}

	// Disabled state
	if (disabled) {
		ariaProperties['aria-disabled'] = true;
	}

	// Character count information
	 
	if (maxLength) {
		const currentLength = value.length;
		// Disable spell checker for ARIA attribute name which is a valid web standard
		// eslint-disable-next-line @cspell/spellchecker -- aria-valuetext is a valid ARIA attribute
		ariaProperties['aria-valuetext'] = `${currentLength} of ${maxLength} characters`;
    
		if (currentLength > maxLength) {
			ariaProperties['aria-invalid'] = true;
		}
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
 * Creates a debounced version of a function
 * @param function_ - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...arguments_: unknown[]) => unknown>(
	function_: T,
	wait: number
): (...arguments_: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return (...arguments_: Parameters<T>) => {
		if (timeout) {
			clearTimeout(timeout);
		}
    
		timeout = setTimeout(() => {
			function_(...arguments_);
		}, wait);
	};
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