import { useId, useLayoutEffect, useRef, type ChangeEvent } from 'react';
import type { Properties } from './types';

import { Text } from '../text';
import { Icon } from '../icon';
import { toDefaults, toNativeProperties, toInputTypeProperties, toClasses, toElement, toLabelContent } from './helpers';

export default function TextField(properties?: Properties) {
	const defaults = toDefaults(properties);
	const Element = toElement(defaults.type);
	const generatedId = useId();
	const inputId = properties?.id ?? generatedId;
	const descId = `${inputId}-desc`;
	const hasDescription = defaults.supportingText != null || defaults.errorText != null;
	const description = defaults.error && defaults.errorText != null ? defaults.errorText : defaults.supportingText;
	const reference = useRef<HTMLDivElement>(null);

	const icons = Array.isArray(defaults.icon) ? defaults.icon : defaults.icon ? [defaults.icon] : [];

	useLayoutEffect(() => {
		if (reference.current == null || defaults.color == null) return;
		reference.current.style.setProperty('--text-color-inject', defaults.color);
	}, [defaults.color]);

	return (
		<div ref={reference} className={toClasses(defaults)}>
			<div className='container'>
				{icons.map((icon) => (
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
					aria-describedby={hasDescription ? descId : undefined}
					aria-invalid={defaults.error ?? undefined}
					ref={defaults.ref as React.Ref<HTMLInputElement & HTMLTextAreaElement>}
					dir={defaults.textDirection}
					{...toNativeProperties(properties) as React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>}
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
			{hasDescription && (
				<div id={descId} className='supporting-text'>
					{Text.createFrom(description as Parameters<typeof Text.createFrom>[0])}
				</div>
			)}
		</div>
	);
}
