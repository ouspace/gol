import _ from 'lodash';
import clsx from 'clsx';
import { match } from 'ts-pattern';
import { isValidElement } from 'react';
import type { Properties } from './types';

export const generateId = (): string => {
	return `radio-${Math.random().toString(36).slice(2, 9)}`;
};

export function toDefaults(properties?: Properties): Required<Properties> {
	return _.defaults({}, properties, {
		id: generateId(),
		name: '',
		label: null,
		value: '',
		checked: false,
		disabled: false,
		required: false,
		icon: null,
		checkedIcon: null,
		size: 'normal',
		color: 'blue',
		className: '',
		onChange: _.noop,
		children: null,
	}) as Required<Properties>;
}

export function toNativeProperties(properties?: Properties): Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
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

export function toSize(size: Required<Properties>['size']): number {
	return match({ size })
		.with({ size: 'small' }, () => 16)
		.with({ size: 'normal' }, () => 20)
		.with({ size: 'big' }, () => 24)
		.otherwise(() => size as number);
}

export function toLabelPosition(label: Properties['label']): 'top' | 'right' | 'bottom' | 'left' {
	const currentLabel = typeof label === 'function' ? label() : label;
	if (currentLabel && typeof currentLabel === 'object' && !isValidElement(currentLabel) && 'position' in currentLabel) {
		return currentLabel.position ?? 'right';
	}
	return 'right';
}

export function toClasses(properties: Required<Properties>): string {
	const hasCustomIcon = properties.icon !== null || properties.checkedIcon !== null;
	const labelPosition = toLabelPosition(properties.label);
	return clsx('radio', properties.size, `label-${labelPosition}`, properties.className, {
		checked: properties.checked,
		disabled: properties.disabled,
		'has-custom-icon': hasCustomIcon,
	});
}
