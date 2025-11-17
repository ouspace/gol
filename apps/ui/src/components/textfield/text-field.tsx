/**
 * TextField Component - A robust, accessible, and highly customizable text input.
 *
 * Features:
 * - Fully typed with TypeScript
 * - Supports variants: filled, outlined (Material Design 3)
 * - Built-in validation & dev warnings
 * - Accessible (ARIA-compliant, keyboard-friendly)
 * - Supports prefix/suffix, icons, counters
 * - Focus, hover, and disabled state handling
 * - Error handling and recovery
 *
 * @example
 * <TextField
 *   label="Username"
 *   value={username}
 *   onChange={setUsername}
 *   required
 *   leadingIcon={<UserIcon />}
 *   showCounter
 *   maxLength={40}
 * />
 */
import { forwardRef, useState, useId, useEffect, useCallback, useMemo } from 'react';
import type { FocusEvent, ChangeEvent } from 'react';
import { 
	generateTextFieldClassNames, 
	generateTextFieldIds, 
	getTextFieldAriaProperties, 
	validateTextFieldProperties,
	safeStringValue,
	isFieldPopulated,
	getRecommendedInputMode,
	isValidIds,
	isValidAriaProperties
} from './helpers';
import type { TextFieldProperties, TextFieldIds, TextFieldAriaProperties } from './types';

// Import styles following Material Design 3 specifications
import './styles/core.css';
import './styles/animations.css';
import './styles/variables.css';
import './styles/variants/filled.css';
import './styles/variants/outlined.css';
import './styles/variants/error.css';
import './styles/variants/disabled.css';
import './styles/variants/focused.css';
import './styles/variants/hovered.css';

export const TextField = forwardRef<HTMLInputElement, TextFieldProperties>((
	{
		id,
		value,
		onChange,
		label,
		placeholder,
		required = false,
		disabled = false,
		readOnly = false,
		variant = 'filled',
		error = false,
		errorText,
		supportingText,
		leadingIcon,
		trailingIcon,
		trailingIconLabel,
		prefix,
		prefixLabel,
		suffix,
		suffixLabel,
		maxLength,
		showCounter = false,
		className,
		type = 'text',
		autoComplete,
		autoFocus = false,
		name,
		pattern,
		inputMode,
		'aria-label': ariaLabel,
		'aria-describedby': ariaDescribedBy,
		onFocus,
		onBlur,
		...rest
	},
	reference
) => {
	const [focused, setFocused] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [touched, setTouched] = useState(false);

	const baseId = useId();
	const safeId = id ?? baseId;
	
	// Convert value to safe string representation
	const stringValue = safeStringValue(value);

	// Generate consistent IDs for all elements with proper error handling
	const ids = useMemo((): TextFieldIds => {
		try {
			const generatedIds = generateTextFieldIds(safeId);
			
			// Type guard to ensure we have valid IDs
			if (isValidIds(generatedIds)) {
				return generatedIds;
			}
			
			// Fallback if generated IDs are invalid
			throw new Error('Invalid IDs generated');
		} catch (catchError: unknown) {
			const errorMessage = catchError instanceof Error ? catchError.message : 'Unknown error';
			console.error('TextField ID generation error:', errorMessage);
			// Return safe fallback IDs
			return {
				input: `${safeId}-input`,
				label: `${safeId}-label`,
				supporting: `${safeId}-supporting`,
				error: `${safeId}-error`,
				counter: `${safeId}-counter`,
				prefix: `${safeId}-prefix`,
				suffix: `${safeId}-suffix`,
			};
		}
	}, [safeId]);

	// Validate properties in development
	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			try {
				validateTextFieldProperties({
					value,
					maxLength,
					required,
					pattern,
					type
				});
			} catch (validationError) {
				const errorMessage = validationError instanceof Error ? validationError.message : 'Unknown validation error';
				console.warn('TextField validation warning:', errorMessage);
			}
		}
	}, [value, maxLength, required, pattern, type]);

	// Additional length validation warning
	useEffect(() => {
		if (process.env.NODE_ENV === 'development' && maxLength && stringValue.length > maxLength) {
			console.warn(`TextField: Value length (${stringValue.length}) exceeds maxLength (${maxLength})`);
		}
	}, [stringValue, maxLength]);

	// Focus event handler with error handling
	const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
		try {
			setFocused(true);
			setTouched(true);
			onFocus?.(event);
		} catch (focusError) {
			const errorMessage = focusError instanceof Error ? focusError.message : 'Unknown focus error';
			console.error('TextField focus handler error:', errorMessage);
		}
	}, [onFocus]);

	// Blur event handler with error handling
	const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
		try {
			setFocused(false);
			onBlur?.(event);
		} catch (blurError) {
			const errorMessage = blurError instanceof Error ? blurError.message : 'Unknown blur error';
			console.error('TextField blur handler error:', errorMessage);
		}
	}, [onBlur]);

	// Mouse enter handler
	const handleMouseEnter = useCallback(() => {
		if (!disabled && !readOnly) {
			setHovered(true);
		}
	}, [disabled, readOnly]);

	// Mouse leave handler
	const handleMouseLeave = useCallback(() => {
		setHovered(false);
	}, []);

	// Change event handler with error handling
	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		try {
			const newValue = event.target.value;
			onChange?.(newValue);
		} catch (changeError) {
			const errorMessage = changeError instanceof Error ? changeError.message : 'Unknown change error';
			console.error('TextField change handler error:', errorMessage);
		}
	}, [onChange]);

	
	const isPopulated = isFieldPopulated(stringValue);

	const classes = useMemo(() => {
		try {
			let baseClasses = generateTextFieldClassNames({
				variant,
				error,
				disabled,
				focused,
				hovered,
				className
			});

			if (isPopulated) {
				baseClasses += ' textfield--populated';
			}

			return baseClasses;
		} catch (classError) {
			const errorMessage = classError instanceof Error ? classError.message : 'Unknown class error';
			console.error('TextField class generation error:', errorMessage);
			return `textfield textfield--${variant} ${isPopulated ? 'textfield--populated' : ''} ${className ?? ''}`;
		}
	}, [variant, error, disabled, focused, hovered, isPopulated, className]);

	// Generate ARIA properties for accessibility with proper type handling
	const ariaProperties = useMemo(() => {
		try {
			const generatedAriaProperties = getTextFieldAriaProperties({
				label,
				required,
				error,
				disabled,
				supportingText,
				errorText,
				maxLength,
				value: stringValue
			});
			
			// Type guard to ensure we have valid ARIA properties
			if (isValidAriaProperties(generatedAriaProperties)) {
				return generatedAriaProperties;
			}
			
			throw new Error('Invalid ARIA properties generated');
		} catch (ariaError) {
			const errorMessage = ariaError instanceof Error ? ariaError.message : 'Unknown ARIA error';
			console.error('TextField ARIA properties error:', errorMessage);
			return {
				'aria-label': 'Text input',
				'aria-required': required,
				'aria-invalid': error,
				'aria-disabled': disabled
			};
		}
	}, [label, required, error, disabled, supportingText, errorText, maxLength, stringValue]);

	// Determine component state
	const showCharacterCount = showCounter && typeof maxLength === 'number' && maxLength > 0;
	const currentLength = stringValue.length;
	const isOverLimit = maxLength ? currentLength > maxLength : false;

	// Build aria-describedby attribute
	const ariaDescribedByIds = [
		ariaDescribedBy,
		supportingText ? ids.supporting : null,
		errorText ? ids.error : null,
		showCharacterCount ? ids.counter : null
	].filter(Boolean);

	const ariaDescribedByValue = ariaDescribedByIds.length > 0 
		? ariaDescribedByIds.join(' ') 
		: undefined;

	// Determine final ARIA attributes
	const finalAriaLabel = ariaLabel ?? (typeof ariaProperties['aria-label'] === 'string' ? ariaProperties['aria-label'] : undefined);
	const finalAriaInvalid = error || undefined;
	
	// Get recommended inputMode if not provided - with proper type assertion
	const finalInputMode = inputMode ?? getRecommendedInputMode(type);
	
	// Type assertion for inputMode to satisfy React's InputHTMLAttributes
	const safeInputMode = finalInputMode as 'text' | 'email' | 'tel' | 'url' | 'search' | 'decimal' | 'numeric' | 'none' | undefined;

	// Safe prefix and suffix extraction
	const safePrefix = typeof prefix === 'string' || typeof prefix === 'number' ? prefix : null;
	const safeSuffix = typeof suffix === 'string' || typeof suffix === 'number' ? suffix : null;

	return (
		<div 
			className={classes}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			data-populated={isPopulated}
			data-touched={touched}
			data-variant={variant}
			data-error={error}
			data-disabled={disabled}
			data-readonly={readOnly}
		>
			<div className="textfield__input-wrapper">
				{leadingIcon && (
					<span className="textfield__icon textfield__icon--leading" aria-hidden="true">
						{leadingIcon}
					</span>
				)}
				
				{safePrefix && (
					<span id={ids.prefix} className="textfield__prefix" aria-label={prefixLabel}>
						{safePrefix}
					</span>
				)}
				
				{label && (
					<label htmlFor={ids.input} className="textfield__label">
						{label}
						{required && (
							<span className="textfield__required" aria-hidden="true">
								*
							</span>
						)}
					</label>
				)}
				
				<input
					{...rest}
					ref={reference}
					id={ids.input}
					type={type}
					value={stringValue}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholder={placeholder}
					disabled={disabled}
					readOnly={readOnly}
					required={required}
					maxLength={maxLength}
					autoComplete={autoComplete}
					autoFocus={autoFocus}
					name={name}
					pattern={pattern}
					inputMode={safeInputMode}
					aria-invalid={finalAriaInvalid}
					aria-label={finalAriaLabel}
					aria-describedby={ariaDescribedByValue}
					className="textfield__input"
					data-testid="textfield-input"
				/>
				
				{safeSuffix && (
					<span id={ids.suffix} className="textfield__suffix" aria-label={suffixLabel}>
						{safeSuffix}
					</span>
				)}
				
				{trailingIcon && (
					<span 
						className="textfield__icon textfield__icon--trailing"
						aria-label={trailingIconLabel}
						{...(trailingIconLabel && { role: 'img', tabIndex: 0 })}
					>
						{trailingIcon}
					</span>
				)}
			</div>
			
			<div className="textfield__auxiliary">
				{(supportingText ?? errorText) && (
					<div className="textfield__text-support">
						{supportingText && !errorText && (
							<span id={ids.supporting} className="textfield__supporting-text">
								{supportingText}
							</span>
						)}
						{errorText && (
							<span id={ids.error} className="textfield__error-text" role="alert" aria-live="polite">
								{errorText}
							</span>
						)}
					</div>
				)}
				
				{showCharacterCount && (
					<span 
						id={ids.counter}
						className={`textfield__counter ${isOverLimit ? 'textfield__counter--error' : ''}`}
						aria-label={`Character count: ${currentLength} of ${maxLength}`}
						aria-live="polite"
					>
						{currentLength}/{maxLength}
					</span>
				)}
			</div>
		</div>
	);
});

TextField.displayName = 'TextField';

export default TextField;