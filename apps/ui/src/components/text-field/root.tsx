import { useId, type ChangeEvent } from 'react';
import type { Properties } from './types';
import { Text } from '../text';
import { Icon } from '../icon';
import { toDefaults, toNativeProperties, toInputTypeProperties, toClasses, toElement, toLabelContent } from './helpers';

/**
 * TextField component
 *
 * Single-line or multi-line input with floating label, filled/outlined
 * variants, prefix/suffix text, leading/trailing icons, helper and error
 * messages, and full keyboard navigation. Supports custom properties and
 * native input attributes.
 *
 * @summary floating-label input (filled/outlined) with icons, helper & error text
 *
 * @example
 * <TextField label="Email" type="email" placeholder="name@example.com" color="teal" />
 * <TextField {...properties} />
 * <TextField label="Native props" aria-label="input" data-testid="text-field" onFocus={fn} />
 *
 * @param {Properties} properties - refers to text field properties
 * @returns {React.JSX.Element} element
 */
export default function TextField(properties?: Properties) {
	const defaults = toDefaults(properties);
	const Element = toElement(defaults.type);
	const generatedId = useId();
	const inputId = properties?.id ?? generatedId;
	const descId = `${inputId}-desc`;

	const style = {
		...properties?.style,
		...(defaults.color != null && { '--text-color-inject': defaults.color }),
	} as React.CSSProperties;

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (defaults.disabled) return;
		defaults.onChange(event, { ...properties, value: event.target.value });
	};

	return (
		<div className={toClasses(defaults)} style={style}>
			<div className='container'>
				{(Array.isArray(defaults.icon) ? defaults.icon : defaults.icon ? [defaults.icon] : []).map((icon) => (
					<span key={icon.position ?? 'left'} className={`icon ${icon.position ?? 'left'}`}>
						{Icon.createFrom(icon)}
					</span>
				))}
				{defaults.prefixText && (
					<span className='prefix' aria-hidden='true'>
						{defaults.prefixText}
					</span>
				)}
				<Element
					className='input'
					id={inputId}
					aria-describedby={defaults.supportingText != null || defaults.errorText != null ? descId : undefined}
					aria-invalid={defaults.error ?? undefined}
					ref={defaults.ref as React.Ref<HTMLInputElement & HTMLTextAreaElement>}
					dir={defaults.textDirection}
					{...toNativeProperties(properties)}
					{...toInputTypeProperties(defaults)}
					type={defaults.type === 'textarea' ? undefined : defaults.type}
					placeholder={defaults.label != null && defaults.placeholder == null ? ' ' : defaults.placeholder}
					value={defaults.value}
					defaultValue={defaults.defaultValue}
					readOnly={defaults.readOnly}
					onChange={handleChange}
				/>
				{defaults.label != null && (
					<label className='label' htmlFor={inputId}>
						{Text.createFrom(toLabelContent(defaults.label))}
						{defaults.required && defaults.asterisk && (
							<span className='asterisk' aria-hidden='true'>
								*
							</span>
						)}
					</label>
				)}
				{defaults.suffixText && (
					<span className='suffix' aria-hidden='true'>
						{defaults.suffixText}
					</span>
				)}
			</div>
			{(defaults.supportingText != null || defaults.errorText != null) && (
				<div id={descId} className='supporting-text'>
					{Text.createFrom(
						(defaults.error && defaults.errorText != null
							? defaults.errorText
							: defaults.supportingText) as Parameters<typeof Text.createFrom>[0]
					)}
				</div>
			)}
		</div>
	);
}
