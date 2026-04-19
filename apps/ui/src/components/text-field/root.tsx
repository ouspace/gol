import { useId, useLayoutEffect, useRef, type ChangeEvent } from 'react';
import type { Properties } from './types';

import { Text } from '../text';
import {
	toDefaults,
	toNativeProperties,
	toInputTypeProperties,
	toClasses,
	toElement,
	toIcon,
	toLabelContent,
} from './helpers';

export default function TextField(properties?: Properties) {
	const defaults = toDefaults(properties);
	const Element = toElement(defaults.type);
	const generatedId = useId();
	const inputId = properties?.id ?? generatedId;
	const descId = `${inputId}-desc`;
	const hasDescription = defaults.supportingText != null || defaults.errorText != null;
	const description = defaults.error && defaults.errorText != null ? defaults.errorText : defaults.supportingText;
	const reference = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const element = reference.current;
		if (element == null) return;
		if (defaults.color != null && defaults.color !== '#6750a4') {
			element.style.setProperty('--text-field-inject', defaults.color);
		}
	}, [defaults.color]);

	return (
		<div ref={reference} className={toClasses(defaults)}>
			<div className='text-field__container'>
				{defaults.leadingIcon && <span className='text-field__leading-icon'>{toIcon(defaults.leadingIcon)}</span>}
				{defaults.prefixText && (
					<span className='text-field__prefix' aria-hidden='true'>
						{defaults.prefixText}
					</span>
				)}
				<Element
					className='text-field__input'
					id={inputId}
					aria-describedby={hasDescription ? descId : undefined}
					aria-invalid={defaults.error ?? undefined}
					ref={defaults.ref}
					dir={defaults.textDirection}
					{...toNativeProperties(properties)}
					{...toInputTypeProperties(defaults)}
					type={defaults.type === 'textarea' ? undefined : defaults.type}
					placeholder={defaults.label != null && defaults.placeholder == null ? ' ' : defaults.placeholder}
					value={defaults.value}
					defaultValue={defaults.defaultValue}
					readOnly={defaults.readOnly}
					onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
						defaults.onChange(event, properties ?? {});
					}}
				/>
				{defaults.label != null && (
					<label className='text-field__label' htmlFor={inputId}>
						{Text.createFrom(toLabelContent(defaults.label))}
						{defaults.required && defaults.asterisk && (
							<span className='text-field__asterisk' aria-hidden='true'>
								*
							</span>
						)}
					</label>
				)}
				{defaults.suffixText && (
					<span className='text-field__suffix' aria-hidden='true'>
						{defaults.suffixText}
					</span>
				)}
				{defaults.trailingIcon && <span className='text-field__trailing-icon'>{toIcon(defaults.trailingIcon)}</span>}
			</div>
			{hasDescription && (
				<div id={descId} className='text-field__supporting-text'>
					{Text.createFrom(description as Parameters<typeof Text.createFrom>[0])}
				</div>
			)}
		</div>
	);
}
