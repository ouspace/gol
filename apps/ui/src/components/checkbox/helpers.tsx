import _ from 'lodash';
import clsx from 'clsx';
import { match } from 'ts-pattern';
import { isValidElement } from 'react';
import type { Properties } from './types';

/**
 *
 * @param properties
 * @returns
 */
export function toDefaults(properties?: Properties): Required<Properties> {
	return _.defaults({}, properties, {
		children: null,
		id: generateId(),
		name: '',
		label: null,
		labelPosition: 'right',
		value: false,
		disabled: false,
		icon: null,
		checkedIcon: null,
		size: 'normal',
		color: 'blue',
		circular: false,
		className: '',
		onChange: _.noop,
	}) as Required<Properties>;
}

/**
 *
 * @returns
 */
export const generateId = (): string => {
	return `checkbox-${Math.random().toString(36).slice(2, 9)}`;
};

/**
 *
 * @param properties
 * @returns
 */
export function toSize(properties: Required<Properties>): number {
	return match({ size: properties.size })
		.with({ size: 'small' }, () => 14)
		.with({ size: 'normal' }, () => 18)
		.with({ size: 'big' }, () => 22)
		.otherwise(() => properties.size as number);
}

export function toLabelPosition(label: Properties['label']): 'top' | 'right' | 'bottom' | 'left' {
	const currentLabel = typeof label === 'function' ? label() : label;
	if (currentLabel && typeof currentLabel === 'object' && !isValidElement(currentLabel) && 'position' in currentLabel) {
		return currentLabel.position ?? 'right';
	}
	return 'right';
}

/**
 *
 * @param properties
 * @returns
 */
export function toClasses(properties: Required<Properties>): string {
	const hasCustomIcon = properties.icon !== null || properties.checkedIcon !== null;
	const labelPosition = toLabelPosition(properties.label);
	return clsx(
		{
			disabled: properties.disabled,
			circular: properties.circular,
			'has-custom-icon': hasCustomIcon,
		},
		'checkbox',
		properties.size,
		`label-${labelPosition}`,
		properties.className
	);
}
