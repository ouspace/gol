import _ from 'lodash';
import clsx from 'clsx';
import { match } from 'ts-pattern';
import { isValidElement } from 'react';
import type { Properties, ElementProperties } from './types';

const BASE_PROPERTY_KEYS = [
	'id',
	'name',
	'label',
	'value',
	'disabled',
	'icon',
	'checkedIcon',
	'size',
	'color',
	'circular',
	'className',
	'style',
	'onChange',
	'children',
	'ref',
	'key',
] as const;

export type DefaultedProperties = Properties &
	Required<Pick<Properties, 'value' | 'disabled' | 'size' | 'color' | 'circular' | 'onChange'>>;

export function toDefaults(properties?: Properties): DefaultedProperties {
	return _.defaults({}, properties, {
		value: false,
		disabled: false,
		size: 'normal',
		color: 'blue',
		circular: false,
		onChange: _.noop,
	}) as DefaultedProperties;
}

export function toSize(properties: DefaultedProperties): number {
	return match({ size: properties.size })
		.with({ size: 'small' }, () => 14)
		.with({ size: 'normal' }, () => 18)
		.with({ size: 'big' }, () => 22)
		.otherwise(() => properties.size as number);
}

export function toSupportedProperties(properties?: Properties): ElementProperties {
	if (!properties) return {};
	return _.omit(properties, BASE_PROPERTY_KEYS);
}

export function toLabelPosition(label: Properties['label']): 'top' | 'right' | 'bottom' | 'left' {
	const currentLabel = typeof label === 'function' ? label() : label;
	if (currentLabel && typeof currentLabel === 'object' && !isValidElement(currentLabel) && 'position' in currentLabel) {
		return currentLabel.position ?? 'right';
	}
	return 'right';
}

export function toClasses(properties: DefaultedProperties): string {
	const isIconified = properties.icon != null || properties.checkedIcon != null;
	const labelPosition = toLabelPosition(properties.label);
	return clsx(
		'checkbox',
		{
			disabled: properties.disabled,
			circular: properties.circular,
			iconified: isIconified,
			[labelPosition]: true,
		},
		properties.size,
		properties.className
	);
}
