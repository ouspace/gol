import _ from 'lodash';
import clsx from 'clsx';
import { match} from 'ts-pattern';
import type { Properties } from './types';

/**
 * @param properties
 * @returns
 */
export function toDefaults(properties?: Properties): Required<Properties> {
	return _.defaults({}, properties, {
		id: generateId(),
		name: '',
		label: '',
		labelPosition: 'right',
		value: false,
		disabled: false,
		iconName: null,
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
export function toClasses(properties: Required<Properties>): string {
	const hasCustomIcons = properties.iconName !== null;
	return clsx(
		{
			disabled: properties.disabled,
			circular: properties.circular,
			'has-custom-icons': hasCustomIcons,
		},
		'checkbox',
		properties.size,
		`label-${properties.labelPosition}`,
		properties.className
	);
}

export function toSize(properties: Required<Properties>): number {
	return match({ size: properties.size })
		.with({ size: 'small' }, () => 14)
		.with({ size: 'normal' }, () => 18)
		.with({ size: 'big' }, () => 22)
		.otherwise(() => properties.size as number);
}

/**
 *
 * @returns
 */
export const generateId = (): string => {
	return `checkbox-${Math.random().toString(36).slice(2, 9)}`;
};