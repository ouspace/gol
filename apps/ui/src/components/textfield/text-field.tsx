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
 *   max={40}
 * />
 */
import { forwardRef, useState, useId, useEffect, useCallback, useMemo } from 'react';
import type { FocusEvent, ChangeEvent } from 'react';
import clsx from 'clsx';
import {
	generateTextFieldClassNames,
	generateTextFieldIds,
	getTextFieldAriaProperties,
	validateTextFieldProperties,
	safeStringValue,
	isFieldPopulated,
	getRecommendedInputMode
} from './helpers';
import type { TextFieldProperties, TextFieldIds } from './types';

// Import styles following Material Design 3 specifications
import './styles/core.css';
import './styles/variables.css';
import './styles/variants.css';
import './styles/states.css';

export const TextField = forwardRef<HTMLInputElement, TextFieldProperties>((
	{
		id,
		value: controlledValue,
		defaultValue,
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
		max,
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
	const isControlled = controlledValue !== undefined;
	const [internalValue, setInternalValue] = useState(defaultValue ?? '');

	const value = isControlled ? controlledValue : internalValue;

	const [focused, setFocused] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [touched, setTouched] = useState(false);

	const baseId = useId();
	const safeId = id ?? baseId;

	// Generate consistent IDs for all elements
	const ids = useMemo((): TextFieldIds => generateTextFieldIds(safeId), [safeId]);

	// Validate properties in development
	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			try {
				validateTextFieldProperties({ value, max, required, pattern, type });
			} catch (validationError) {
				console.warn('TextField validation warning:', validationError instanceof Error ? validationError.message : 'Unknown error');
			}
		}
	}, [value, max, required, pattern, type]);

	// Additional length validation warning
	useEffect(() => {
		if (process.env.NODE_ENV === 'development' && max && String(value).length > max) {
			console.warn(`TextField: Value length (${String(value).length}) exceeds max (${max})`);
		}
	}, [value, max]);

	// Focus event handler
	const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
		setFocused(true);
		setTouched(true);
		onFocus?.(event);
	}, [onFocus]);

	// Blur event handler
	const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
		setFocused(false);
		onBlur?.(event);
	}, [onBlur]);

	// Mouse handlers
	const handleMouseEnter = useCallback(() => {
		if (!disabled && !readOnly) setHovered(true);
	}, [disabled, readOnly]);

	const handleMouseLeave = useCallback(() => setHovered(false), []);

	// Change event handler
	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		if (!isControlled) {
			setInternalValue(newValue);
		}
		onChange?.(newValue);
	}, [isControlled, onChange]);

	const stringValue = safeStringValue(value);
	const isPopulated = isFieldPopulated(value);

	const classes = useMemo(() => {
		const baseClasses = generateTextFieldClassNames({
			variant,
			error,
			disabled,
			focused,
			hovered,
			className
		});

		return clsx(baseClasses, { 'populated': isPopulated });
	}, [variant, error, disabled, focused, hovered, isPopulated, className]);

	// Generate ARIA properties for accessibility
	const ariaProperties = useMemo(() => {
		return getTextFieldAriaProperties({
			label,
			required,
			error,
			disabled,
			supportingText,
			errorText,
			max,
			value: stringValue
		});
	}, [label, required, error, disabled, supportingText, errorText, max, stringValue]);

	// Determine component state
	const showCharacterCount = showCounter && typeof max === 'number' && max > 0;
	const currentLength = stringValue.length;
	const isOverLimit = max ? currentLength > max : false;

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

	// Determine final attributes
	const finalAriaLabel = ariaLabel ?? (ariaProperties['aria-label'] as string | undefined);
	const finalAriaInvalid = error || undefined;
	const finalInputMode = (inputMode ?? getRecommendedInputMode(type)) as React.HTMLAttributes<HTMLInputElement>['inputMode'];

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
					<span className="icon icon--leading" aria-hidden="true">
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
					maxLength={max}
					autoComplete={autoComplete}
					autoFocus={autoFocus}
					name={name}
					pattern={pattern}
					inputMode={finalInputMode}
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
						className="icon icon--trailing"
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
						aria-label={`Character count: ${currentLength} of ${max}`}
						aria-live="polite"
					>
						{currentLength}/{max}
					</span>
				)}
			</div>
		</div>
	);
});

TextField.displayName = 'TextField';

export default TextField;