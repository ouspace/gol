import { useId } from 'react';
import type { Properties } from './types';
import { toDefaults, toSupportedProperties, toClass, toSize, toLabelContent } from './helpers';
import { Text } from '../text';
import { Icon } from '../icon';
import './styles/index.css';

/**
 * Radio component
 *
 * Single-choice control that selects one option from a set (group radios by
 * `name`). Supports custom sizes, colors, icons, label positioning, and native
 * input attributes.
 *
 * @summary single-choice control for selecting one option from a set
 *
 * @example
 * <Radio label="label-text" value="radio-value" color="red" size="normal" />
 * <Radio {...properties} />
 * <Radio label="native props" aria-label="option" data-testid="radio" onFocus={fn} />
 *
 * @param {Properties} properties - refers to radio properties
 * @returns {React.JSX.Element} element
 */
export default function Radio(properties?: Properties) {
	const defaults = toDefaults(properties);
	const nativeProperties = toSupportedProperties(properties);
	const generatedId = useId();
	const inputId = properties?.id ?? `radio-${generatedId}`;

	const size = toSize(defaults.size);
	const style = {
		...properties?.style,
		...(size !== null && size !== undefined && { '--radio-size-inject': size }),
		...(defaults.color !== null && defaults.color !== undefined && { '--radio-color-inject': defaults.color }),
	} as React.CSSProperties;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (defaults.disabled) return;
		defaults.onChange(event, {
			...properties,
			checked: event.target.checked,
		});
	};

	return (
		<label style={style} className={toClass(defaults)} aria-disabled={defaults.disabled || undefined}>
			<input
				type='radio'
				id={inputId}
				name={properties?.name}
				value={properties?.value}
				checked={defaults.checked}
				disabled={defaults.disabled}
				required={defaults.required}
				onChange={handleChange}
				{...nativeProperties}
				className='input'
			/>

			<span className='box'>
				{defaults.checked ? Icon.createFrom(defaults.checkedIcon) : Icon.createFrom(defaults.icon)}
			</span>

			{defaults.children ?? (defaults.label ? Text.createFrom(toLabelContent(defaults.label)) : null)}
		</label>
	);
}
