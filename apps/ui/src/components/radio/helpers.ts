import _ from 'lodash';
import clsx from 'clsx';
import { match, P } from 'ts-pattern';
import { isValidElement } from 'react';
import type { Properties, NativeProperties } from './types';
import type { TextProperties } from '../text';

export type DefaultedProperties = Properties &
	Required<Pick<Properties, 'checked' | 'disabled' | 'required' | 'onChange'>>;

export function toDefaults(properties?: Properties): DefaultedProperties {
	return _.defaults({}, properties, {
		checked: false,
		disabled: false,
		required: false,
		onChange: _.noop,
	}) as DefaultedProperties;
}

export function toSupportedProperties(properties?: Properties): NativeProperties {
	if (!properties) return {};

	const keysToOmit = [
		'id',
		'name',
		'label',
		'value',
		'checked',
		'disabled',
		'required',
		'icon',
		'checkedIcon',
		'size',
		'color',
		'className',
		'onChange',
		'children',
		'ref',
		'key',
	] as const;

	return _.omit(properties, keysToOmit);
}

export function toSize(size: Properties['size']): string | undefined {
	if (size === null || size === undefined) return undefined;
	return match(size)
		.with(P.number, (value) => `${value}px`)
		.otherwise((value) => value as string);
}

export function toLabelPosition(label: Properties['label']): 'top' | 'right' | 'bottom' | 'left' {
	const currentLabel = typeof label === 'function' ? label() : label;
	if (currentLabel && typeof currentLabel === 'object' && !isValidElement(currentLabel) && 'position' in currentLabel) {
		return currentLabel.position ?? 'right';
	}
	return 'right';
}

export function toClass(properties: DefaultedProperties): string {
	const isIconified = (properties.icon !== null && properties.icon !== undefined) || (properties.checkedIcon !== null && properties.checkedIcon !== undefined);
	const labelPosition = toLabelPosition(properties.label);
	return clsx(
		'radio',
		properties.size === 'normal' ? undefined : properties.size,
		labelPosition,
		properties.className,
		{
			checked: properties.checked,
			disabled: properties.disabled,
			iconified: isIconified,
		}
	);
}

export function toLabelContent(label: NonNullable<Properties['label']>) {
	if (typeof label === 'function' || typeof label === 'string' || isValidElement(label)) {
		return label;
	}
	return _.defaults({ className: clsx('label', (label as TextProperties).className) }, label);
}
